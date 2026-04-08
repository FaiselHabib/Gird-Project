import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL     ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

// supabase requires non-empty strings to construct — use placeholders so the
// module always loads; actual requests will fail until real values are set.
export const supabase = createClient(
  supabaseUrl     || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
)

export const supabaseReady =
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder') &&
  supabaseAnonKey.length > 20
