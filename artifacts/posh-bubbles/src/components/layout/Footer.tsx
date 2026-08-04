import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/shop',     label: 'Shop' },
  { to: '/featured', label: 'Featured' },
  { to: '/bundles',  label: 'Bundles' },
  { to: '/about',    label: 'About' },
  { to: '/faq',      label: 'FAQ' },
  { to: '/contact',  label: 'Contact' },
];

const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Facebook' },
  { href: '#', label: 'TikTok' },
  { href: '#', label: 'Pinterest' },
];

/**
 * Footer
 *
 * Site footer with brand identity, navigation, and social links.
 * Ruby background with champagne gold accents and lotus watermark.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer">

      {/* ── Main footer body ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-pb-ruby pb-lotus-watermark">
        {/* Lotus left decoration */}
        <div
          aria-hidden="true"
          className="absolute left-0 bottom-0 w-48 sm:w-64 opacity-10 pointer-events-none select-none mix-blend-multiply"
        >
          <img src="/images/lotus.png" alt="" className="w-full h-auto scale-x-[-1]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Brand column */}
            <section aria-label="Brand" className="flex flex-col items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-pb-card/10 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Posh Bubbles"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-semibold text-pb-champagne-gold tracking-wide">
                  Posh Bubbles
                </p>
                <p className="mt-1 text-sm text-white/70 leading-relaxed max-w-[200px]">
                  Premium bath and beauty for the everyday ritual.
                </p>
              </div>
              {/* Gold ornamental line */}
              <div className="w-16 h-px bg-gradient-to-r from-pb-champagne-gold/60 to-transparent" />
            </section>

            {/* Navigation column */}
            <nav aria-label="Footer navigation">
              <p className="font-serif text-pb-champagne-gold text-sm tracking-widest uppercase mb-5 font-semibold">
                Navigate
              </p>
              <ul role="list" className="space-y-2.5">
                {NAV_LINKS.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      aria-label={label}
                      className={({ isActive }) =>
                        `text-sm transition-colors duration-200 ${
                          isActive
                            ? 'text-pb-champagne-gold font-medium'
                            : 'text-white/70 hover:text-pb-champagne-gold'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span aria-current={isActive ? 'page' : undefined}>{label}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social column */}
            <section aria-label="Social media">
              <p className="font-serif text-pb-champagne-gold text-sm tracking-widest uppercase mb-5 font-semibold">
                Follow Us
              </p>
              <ul role="list" className="space-y-2.5">
                {SOCIAL_LINKS.map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={`Posh Bubbles on ${label}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-sm text-white/70 hover:text-pb-champagne-gold transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>

      {/* ── Copyright bar ─────────────────────────────────────────── */}
      <div className="bg-pb-burgundy px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <small className="text-xs text-white/50 not-italic">
            <p>
              <span aria-hidden="true">© </span>
              {year} Posh Bubbles. All rights reserved.
            </p>
          </small>
          <small className="text-xs text-white/30 not-italic font-serif italic">
            Handcrafted Organic Luxury for Skin &amp; Hair
          </small>
        </div>
      </div>

    </footer>
  );
}
