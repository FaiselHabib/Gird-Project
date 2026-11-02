const APP_STORE_URL = 'https://apps.apple.com/sa/app/gird/id6758962103'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.Smartech.gird&pli=1'

const AppleMark = () => (
  <svg viewBox="0 0 24 24" width={25} height={25} fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 17.34 3.42 9.4 8.89 9.12c1.33.07 2.26.74 3.04.79 1.16-.24 2.27-.93 3.53-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.98-2.29 4.28ZM12.03 9.05C11.88 6.82 13.69 4.98 15.77 4.8c.29 2.58-2.34 4.5-3.74 4.25Z" />
  </svg>
)

const PlayMark = () => (
  <svg viewBox="0 0 24 24" width={25} height={25} fill="none" aria-hidden="true">
    <path d="M4 3.3v17.4L14.8 12 4 3.3Z" fill="#32BBFF" />
    <path d="m14.8 12 2.9-2.3 3.5 2c1.05.6 1.05 1.2 0 1.8l-3.5 2.1-2.9-3.6Z" fill="#FFCC00" />
    <path d="m4 3.3 13.7 6.4-2.9 2.3L4 3.3Z" fill="#00D95F" />
    <path d="m4 20.7 10.8-8.7 2.9 3.6L4 20.7Z" fill="#FF3A44" />
  </svg>
)

const STORES = [
  { name: 'App Store', href: APP_STORE_URL, Mark: AppleMark },
  { name: 'Google Play', href: GOOGLE_PLAY_URL, Mark: PlayMark },
]

export default function StoreButtons({ className = '' }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center ${className}`}
      aria-label="روابط تحميل تطبيق قرد"
    >
      {STORES.map(store => (
        <a
          key={store.name}
          href={store.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`تحميل تطبيق قرد من ${store.name}`}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/70 px-5 py-3 text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-black sm:w-auto sm:min-w-[180px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <store.Mark />
          <span className="flex flex-col items-start leading-none" dir="ltr">
            <span className="mb-1 text-[10px] font-medium text-gray-400" dir="rtl">حمّل التطبيق من</span>
            <span className="text-base font-bold tracking-tight">{store.name}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
