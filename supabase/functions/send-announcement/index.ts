// Supabase Edge Function — send-announcement
// Deploy with:  supabase functions deploy send-announcement --no-verify-jwt
// Auth is enforced inside this function via x-admin-token header + getUser().
//
// Secrets required (Supabase dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY
//   SUPABASE_URL              (auto-injected)
//   SUPABASE_SERVICE_ROLE_KEY (auto-injected)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

/* ─── CORS — x-admin-token must be listed here ─── */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })

/* ─── Branded email template ─── */
function buildHtml(subject: string, body: string): string {
  const escaped = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')

  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#191919;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:30px;font-weight:900;color:#ffffff;letter-spacing:2px;">قرد</div>
      <div style="font-size:12px;color:#E1F096;margin-top:4px;">منصة البادل الأولى في السعودية</div>
    </div>

    <div style="background:#1e1e1e;border-radius:20px;padding:36px;border:1px solid rgba(255,255,255,0.07);">
      <h2 style="color:#ffffff;font-size:22px;margin:0 0 18px 0;line-height:1.4;">${subject}</h2>
      <div style="color:#e0e0e0;font-size:15px;line-height:1.85;">${escaped}</div>

      <div style="margin-top:28px;">
        <a href="https://gird.sa"
           style="display:inline-block;background:#FE5D02;color:#ffffff;text-decoration:none;
                  padding:14px 32px;border-radius:50px;font-weight:700;font-size:14px;">
          افتح التطبيق 🎾
        </a>
      </div>
    </div>
  </div>
</body>
</html>`
}

const BATCH_SIZE = 100

/* ─── Handler ─── */
serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    /* ── 1. Auth: read token from x-admin-token header ── */
    const token = req.headers.get('x-admin-token')?.trim()
    if (!token) {
      return json({ error: 'Missing x-admin-token header' }, 401)
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Verify the JWT using Supabase Auth — this is a real server-side check
    const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(token)
    if (authErr || !user) {
      return json({ error: 'Invalid or expired token' }, 401)
    }

    /* ── 2. Validate body ── */
    const { subject, body, target } = await req.json()
    if (!subject?.trim() || !body?.trim()) {
      return json({ error: '`subject` and `body` are required' }, 400)
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) return json({ error: 'RESEND_API_KEY secret not configured' }, 500)

    /* ── 3. Fetch waitlist emails (with optional targeting) ── */
    let query = supabaseAdmin.from('waitlist').select('email')
    if (target?.type && target.type !== 'all') {
      query = query.eq('user_type', target.type)
    }
    if (target?.city) {
      query = query.eq('city', target.city)
    }

    const { data: waitlist, error: fetchErr } = await query

    if (fetchErr) throw fetchErr
    if (!waitlist?.length) return json({ error: 'No subscribers found matching target' }, 400)

    const emails   = waitlist.map((r: { email: string }) => r.email)
    const htmlBody = buildHtml(subject.trim(), body.trim())

    /* ── 4. Send in batches of 100 ── */
    let totalSent   = 0
    let totalFailed = 0

    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const chunk = emails.slice(i, i + BATCH_SIZE)

      const payload = chunk.map((email: string) => ({
        from: 'Gird <onboarding@resend.dev>',
        to: [email],
        subject: subject.trim(),
        html: htmlBody,
      }))

      const res = await fetch('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        totalSent += chunk.length
      } else {
        const errText = await res.text()
        console.error(`[Resend] Batch ${i / BATCH_SIZE + 1} failed:`, errText)
        totalFailed += chunk.length
      }
    }

    /* ── 5. Log to announcements table ── */
    const status =
      totalFailed === 0  ? 'sent'
      : totalSent === 0  ? 'failed'
      : 'partial'

    const { error: logErr } = await supabaseAdmin.from('announcements').insert([{
      subject:         subject.trim(),
      body:            body.trim(),
      recipient_count: emails.length,
      sent_count:      totalSent,
      failed_count:    totalFailed,
      status,
      created_by:      user.id,
    }])
    if (logErr) console.error('[DB] Log error:', logErr)

    /* ── 6. Respond ── */
    return json({ success: true, sent: totalSent, failed: totalFailed, status })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error'
    console.error('[send-announcement] Unhandled error:', message)
    return json({ error: message }, 500)
  }
})
