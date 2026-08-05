/**
 * WhatsAppFloatingButton
 *
 * Site-wide fixed button that opens the Posh Bubbles WhatsApp chat.
 * Renders in the bottom-right corner on all pages via RootLayout.
 *
 * Frontend only — no backend/API.
 */

const WA_NUMBER = '919422521362';
const WA_HREF   = `https://wa.me/${WA_NUMBER}`;

/** WhatsApp logo SVG (official brand mark, single colour). */
function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.352.629 4.558 1.726 6.461L2.667 29.333l7.058-1.698A13.27 13.27 0 0 0 16.003 29.333C23.37 29.333 29.333 23.363 29.333 16S23.37 2.667 16.003 2.667zm0 2.4c5.954 0 10.93 4.976 10.93 10.933S21.957 26.933 16.003 26.933a10.9 10.9 0 0 1-5.56-1.521l-.382-.234-4.19 1.008.957-4.09-.255-.4a10.87 10.87 0 0 1-1.5-5.696c0-5.957 4.976-10.933 10.93-10.933zm-3.344 5.6c-.207 0-.54.078-.823.389-.282.311-1.077 1.053-1.077 2.565 0 1.513 1.103 2.975 1.257 3.182.154.207 2.163 3.3 5.236 4.625 2.588 1.102 3.073.883 3.627.828.553-.055 1.787-.73 2.038-1.437.252-.706.252-1.31.177-1.438-.077-.127-.283-.204-.59-.358-.308-.154-1.822-.899-2.104-1.001-.283-.103-.489-.154-.695.155-.206.308-.797.999-1.003 1.206-.206.206-.412.231-.719.077-.308-.154-1.3-.479-2.477-1.53-.915-.817-1.533-1.827-1.713-2.135-.181-.307-.019-.474.136-.627.14-.137.308-.358.462-.537.154-.18.205-.308.308-.515.103-.206.051-.387-.026-.54-.076-.155-.682-1.67-.95-2.285-.254-.594-.512-.506-.694-.506z" />
    </svg>
  );
}

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 overflow-hidden"
    >
      {/* Pill label — slides in on hover */}
      <span
        aria-hidden="true"
        className={[
          'max-w-0 group-hover:max-w-[12rem] opacity-0 group-hover:opacity-100',
          'transition-all duration-300 ease-out whitespace-nowrap overflow-hidden',
          'pl-4 pr-3 py-2 rounded-full',
          'bg-[#25D366] text-white',
          'font-sans text-[0.75rem] font-semibold tracking-wide shadow-lg',
        ].join(' ')}
      >
        Chat with us
      </span>

      {/* Main circle button */}
      <span
        className={[
          'flex items-center justify-center',
          'w-14 h-14 rounded-full shrink-0',
          'bg-[#25D366] text-white',
          'shadow-[0_4px_20px_rgba(37,211,102,0.45)]',
          'group-hover:shadow-[0_6px_28px_rgba(37,211,102,0.60)]',
          'group-hover:scale-110',
          'transition-all duration-200 ease-out',
        ].join(' ')}
      >
        <WhatsAppIcon size={28} />
      </span>
    </a>
  );
}
