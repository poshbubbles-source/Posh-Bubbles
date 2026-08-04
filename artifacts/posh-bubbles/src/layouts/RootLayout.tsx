import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/**
 * RootLayout
 *
 * Shared layout wrapper for all routes.
 * Renders the Navbar, a content area with the route outlet,
 * and the Footer.
 */
export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-pb-background text-pb-text-primary">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
