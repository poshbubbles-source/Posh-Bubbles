import { Outlet, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/featured', label: 'Featured' },
  { to: '/bundles', label: 'Bundles' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ── Placeholder Header ── */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-semibold tracking-wide text-sm uppercase">
            Posh Bubbles
          </span>
          <nav className="flex gap-5 text-sm text-muted-foreground">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? 'text-foreground font-medium' : 'hover:text-foreground transition-colors'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Page outlet ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Placeholder Footer ── */}
      <footer className="border-t border-border px-6 py-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Posh Bubbles. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
