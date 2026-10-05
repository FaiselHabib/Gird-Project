import { MessageCircle } from 'lucide-react'
import { ORANGE } from '../lib/constants'
import { INTERCOM_LAUNCHER_CLASS, openIntercom } from '../lib/intercom'

export default function IntercomLauncher() {
  return (
    <button
      type="button"
      aria-label="فتح المحادثة المباشرة"
      onClick={() => openIntercom()}
      className={`${INTERCOM_LAUNCHER_CLASS} fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer`}
      style={{
        background: ORANGE,
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        outlineColor: ORANGE,
      }}
    >
      <MessageCircle size={24} aria-hidden="true" />
    </button>
  )
}
