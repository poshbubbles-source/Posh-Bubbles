import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';

/**
 * RootLayout
 *
 * Shared layout wrapper for all routes.
 * Renders the Navbar, a <main> content area with the route outlet,
 * and a placeholder footer.
 */
export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border px-6 py-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Posh Bubbles. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
