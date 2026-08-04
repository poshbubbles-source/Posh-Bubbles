import HeroSection from '@/components/home/HeroSection';
import BrandStorySection from '@/components/home/BrandStorySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

/**
 * Home page
 *
 * Assembles the top-of-funnel sections in information-hierarchy order:
 *   1. Hero          — first impression, brand promise, primary CTA
 *   2. Brand Story   — trust-building narrative and brand differentiation
 *   3. Testimonials  — social proof to reinforce purchase confidence
 */
export default function Home() {
  return (
    <main aria-label="Home page">
      <HeroSection />
      <BrandStorySection />
      <TestimonialsSection />
    </main>
  );
}
