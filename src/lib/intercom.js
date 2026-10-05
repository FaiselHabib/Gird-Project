import { Intercom, showNewMessage } from '@intercom/messenger-js-sdk'

const INTERCOM_APP_ID = (import.meta.env.VITE_INTERCOM_APP_ID || 'w3m6vw67').trim()
export const INTERCOM_LAUNCHER_CLASS = 'js-intercom-launcher'

let initialized = false

export function initIntercom() {
  if (initialized || !INTERCOM_APP_ID || typeof window === 'undefined') return

  initialized = true
  Intercom({
    app_id: INTERCOM_APP_ID,
    region: 'us',
    language_override: 'ar',
    alignment: 'left',
    hide_default_launcher: true,
    custom_launcher_selector: `.${INTERCOM_LAUNCHER_CLASS}`,
  })
}

export function openIntercom(message = '') {
  initIntercom()
  showNewMessage(message)
}
