import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Featured from '@/pages/Featured';
import Bundles from '@/pages/Bundles';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

// Strip trailing slash so BrowserRouter basename works correctly with Vite's BASE_URL
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="featured" element={<Featured />} />
              <Route path="bundles" element={<Bundles />} />
              <Route path="about" element={<About />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
