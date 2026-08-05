import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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
 * Sticky site header with logo, desktop navigation, and mobile menu.
 * Uses React Router NavLink for aria-current="page" accessibility.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totals } = useCart();
  const cartCount = totals.itemCount;

  return (
    <header className="sticky top-0 z-50 bg-pb-card/95 backdrop-blur-md border-b border-pb-champagne-gold/20 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">

          {/* Logo */}
          <NavLink
            to="/"
            aria-label="Posh Bubbles home"
            className="flex-shrink-0 transition-opacity duration-200 hover:opacity-90"
          >
            <img
              src="/images/logo.png"
              alt="Posh Bubbles"
              className="h-14 sm:h-16 w-auto mix-blend-multiply"
            />
          </NavLink>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul role="list" className="flex items-center gap-1">
              {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    aria-label={label}
                    className={({ isActive }) =>
                      `px-3 py-1.5 text-sm font-medium tracking-widest uppercase transition-all duration-200 border-b-2 ${
                        isActive
                          ? 'text-pb-ruby border-pb-champagne-gold'
                          : 'text-pb-text-secondary border-transparent hover:text-pb-ruby hover:border-pb-champagne-gold/40'
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

          {/* Cart icon */}
          <Link
            to="/cart"
            aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
            className="relative flex items-center justify-center w-10 h-10 text-pb-text-secondary hover:text-pb-ruby transition-colors duration-200"
          >
            <ShoppingBag size={22} aria-hidden="true" />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-0.5 rounded-full bg-pb-ruby text-white font-sans text-[0.5rem] font-bold flex items-center justify-center leading-none"
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md text-pb-text-primary hover:text-pb-ruby transition-colors duration-200"
          >
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 border-t border-pb-champagne-gold/20' : 'max-h-0'
        }`}
      >
        <nav aria-label="Mobile navigation" className="bg-pb-card px-4 py-4">
          <ul role="list" className="space-y-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  aria-label={label}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium tracking-widest uppercase rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-pb-ruby/10 text-pb-ruby border-l-2 border-pb-champagne-gold'
                        : 'text-pb-text-secondary hover:bg-pb-background hover:text-pb-ruby'
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
      </div>
    </header>
  );
}
