import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const NAV_LINKS: NavItem[] = [
  { to: '/',          label: 'Home',     end: true },
  { to: '/shop',      label: 'Shop' },
  { to: '/featured',  label: 'Featured' },
  { to: '/bundles',   label: 'Bundles' },
  { to: '/about',     label: 'About' },
  { to: '/faq',       label: 'FAQ' },
  { to: '/contact',   label: 'Contact' },
];

/**
 * Navbar
 *
 * Semantic, unstyled navigation bar with React Router NavLink.
 * Renders a <nav> landmark containing an ordered list of route links.
 * NavLink automatically applies aria-current="page" via the active class;
 * assistive technologies can use this to identify the current location.
 */
export default function Navbar() {
  return (
    <header>
      <nav aria-label="Main navigation">
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
    </header>
  );
}
