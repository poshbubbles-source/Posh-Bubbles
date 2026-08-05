import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import RootLayout from '@/layouts/RootLayout';
import { CartProvider } from '@/context/CartContext';

// Top-level pages
import Home from '@/pages/Home';
import Cart from '@/pages/Cart';
import Shop from '@/pages/Shop';
import Featured from '@/pages/Featured';
import Bundles from '@/pages/Bundles';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

// Category pages
import SkinCare from '@/pages/shop/SkinCare';
import LipCare from '@/pages/shop/LipCare';
import HairCare from '@/pages/shop/HairCare';
import BodyCare from '@/pages/shop/BodyCare';
import Sunscreen from '@/pages/shop/Sunscreen';
import SoapsBars from '@/pages/shop/SoapsBars';
import FootCare from '@/pages/shop/FootCare';
import EyeCare from '@/pages/shop/EyeCare';
import PetCare from '@/pages/shop/PetCare';

// Skin Care subcategory pages
import FaceWashes from '@/pages/shop/skin-care/FaceWashes';
import Mists from '@/pages/shop/skin-care/Mists';
import Serums from '@/pages/shop/skin-care/Serums';
import Moisturizers from '@/pages/shop/skin-care/Moisturizers';
import Masks from '@/pages/shop/skin-care/Masks';

// Lip Care subcategory pages
import LipBalms from '@/pages/shop/lip-care/LipBalms';

// Hair Care subcategory pages
import HairCareShampoos from '@/pages/shop/hair-care/Shampoos';
import Conditioners from '@/pages/shop/hair-care/Conditioners';
import HairSerums from '@/pages/shop/hair-care/HairSerums';

// Body Care subcategory pages
import BodyWash from '@/pages/shop/body-care/BodyWash';
import BodyLotion from '@/pages/shop/body-care/BodyLotion';
import BodyButter from '@/pages/shop/body-care/BodyButter';
import BodyScrub from '@/pages/shop/body-care/BodyScrub';

// Sunscreen subcategory pages
import FaceBodySunscreen from '@/pages/shop/sunscreen/FaceBodySunscreen';

// Soaps & Bars subcategory pages
import BathBarSoap from '@/pages/shop/soaps-bars/BathBarSoap';
import WhippedSoap from '@/pages/shop/soaps-bars/WhippedSoap';
import LiquidSoap from '@/pages/shop/soaps-bars/LiquidSoap';

// Foot Care subcategory pages
import FootCream from '@/pages/shop/foot-care/FootCream';

// Eye Care subcategory pages
import UnderEyeGel from '@/pages/shop/eye-care/UnderEyeGel';

// Pet Care subcategory pages
import PetCareShampoos from '@/pages/shop/pet-care/Shampoos';

const queryClient = new QueryClient();

// Strip trailing slash so BrowserRouter basename works correctly with Vite's BASE_URL
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
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
              <Route path="cart" element={<Cart />} />

              {/* ── Skin Care ───────────────────────────────────────── */}
              <Route path="shop/skin-care" element={<SkinCare />} />
              <Route path="shop/skin-care/face-washes" element={<FaceWashes />} />
              <Route path="shop/skin-care/mists" element={<Mists />} />
              <Route path="shop/skin-care/serums" element={<Serums />} />
              <Route path="shop/skin-care/moisturizers" element={<Moisturizers />} />
              <Route path="shop/skin-care/masks" element={<Masks />} />

              {/* ── Lip Care ────────────────────────────────────────── */}
              <Route path="shop/lip-care" element={<LipCare />} />
              <Route path="shop/lip-care/lip-balms" element={<LipBalms />} />

              {/* ── Hair Care ───────────────────────────────────────── */}
              <Route path="shop/hair-care" element={<HairCare />} />
              <Route path="shop/hair-care/shampoos" element={<HairCareShampoos />} />
              <Route path="shop/hair-care/conditioners" element={<Conditioners />} />
              <Route path="shop/hair-care/hair-serums" element={<HairSerums />} />

              {/* ── Body Care ───────────────────────────────────────── */}
              <Route path="shop/body-care" element={<BodyCare />} />
              <Route path="shop/body-care/body-wash" element={<BodyWash />} />
              <Route path="shop/body-care/body-lotion" element={<BodyLotion />} />
              <Route path="shop/body-care/body-butter" element={<BodyButter />} />
              <Route path="shop/body-care/body-scrub" element={<BodyScrub />} />

              {/* ── Sunscreen ───────────────────────────────────────── */}
              <Route path="shop/sunscreen" element={<Sunscreen />} />
              <Route path="shop/sunscreen/face-body-sunscreen" element={<FaceBodySunscreen />} />

              {/* ── Soaps & Bars ─────────────────────────────────────── */}
              <Route path="shop/soaps-bars" element={<SoapsBars />} />
              <Route path="shop/soaps-bars/bath-bar-soap" element={<BathBarSoap />} />
              <Route path="shop/soaps-bars/whipped-soap" element={<WhippedSoap />} />
              <Route path="shop/soaps-bars/liquid-soap" element={<LiquidSoap />} />

              {/* ── Foot Care ───────────────────────────────────────── */}
              <Route path="shop/foot-care" element={<FootCare />} />
              <Route path="shop/foot-care/foot-cream" element={<FootCream />} />

              {/* ── Eye Care ────────────────────────────────────────── */}
              <Route path="shop/eye-care" element={<EyeCare />} />
              <Route path="shop/eye-care/under-eye-gel" element={<UnderEyeGel />} />

              {/* ── Pet Care ────────────────────────────────────────── */}
              <Route path="shop/pet-care" element={<PetCare />} />
              <Route path="shop/pet-care/shampoos" element={<PetCareShampoos />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
