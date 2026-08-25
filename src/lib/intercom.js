const INTERCOM_APP_ID = (import.meta.env.VITE_INTERCOM_APP_ID || 'w3m6vw67').trim()

let initialized = false

export function initIntercom() {
  if (initialized || !INTERCOM_APP_ID || typeof window === 'undefined') return

  initialized = true
  window.intercomSettings = {
    api_base: 'https://api-iam.intercom.io',
    app_id: INTERCOM_APP_ID,
    language_override: 'ar',
    alignment: 'left',
  }

  if (typeof window.Intercom === 'function') {
    window.Intercom('reattach_activator')
    window.Intercom('update', window.intercomSettings)
    return
  }

  const queue = (...args) => queue.c(args)
  queue.q = []
  queue.c = args => queue.q.push(args)
  window.Intercom = queue

  const script = document.createElement('script')
  script.async = true
  script.src = `https://widget.intercom.io/widget/${INTERCOM_APP_ID}`
  document.head.appendChild(script)
  window.Intercom('boot', window.intercomSettings)
}

export function openIntercom(message = '') {
  initIntercom()
  if (typeof window?.Intercom !== 'function') return

  if (message) {
    window.Intercom('showNewMessage', message)
  } else {
    window.Intercom('show')
  }
}
