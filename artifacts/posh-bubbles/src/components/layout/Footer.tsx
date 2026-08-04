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
 * Semantic, unstyled site footer containing the brand name,
 * navigation links, social media placeholders, and copyright notice.
 * Renders as a <footer> landmark with distinct <section> regions.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer">
      {/* Brand */}
      <section aria-label="Brand">
        <p>Posh Bubbles</p>
        <p>Premium bath and beauty for the everyday ritual.</p>
      </section>

      {/* Navigation */}
      <nav aria-label="Footer navigation">
        <ul role="list">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                aria-label={label}
              >
                {({ isActive }) => (
                  <span aria-current={isActive ? 'page' : undefined}>
                    {label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social media */}
      <section aria-label="Social media">
        <ul role="list">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={`Posh Bubbles on ${label}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Copyright */}
      <small>
        <p>
          <span aria-hidden="true">© </span>
          {year} Posh Bubbles. All rights reserved.
        </p>
      </small>
    </footer>
  );
}
