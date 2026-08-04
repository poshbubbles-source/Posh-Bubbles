/**
 * TestimonialsSection
 *
 * Social proof section displaying customer reviews. Placeholder content only.
 * Structure inspired by premium skincare brand testimonial layouts:
 *   - Section heading + aggregate rating context
 *   - List of individual testimonial cards (quote + attribution + product reference)
 */

interface Testimonial {
  id: number;
  quote: string;
  customerName: string;
  location: string;
  product: string;
  rating: number;
}

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      'Placeholder — a genuine, specific customer quote about how the product improved their daily routine. Should feel personal, not generic.',
    customerName: 'Customer Name',
    location: 'City, Country',
    product: 'Product Name',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Placeholder — second customer quote focusing on a different benefit, such as scent, texture, or long-term skin improvement.',
    customerName: 'Customer Name',
    location: 'City, Country',
    product: 'Product Name',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Placeholder — third quote that speaks to trust, repeat purchase behaviour, or gifting. Adds variety to the social proof narrative.',
    customerName: 'Customer Name',
    location: 'City, Country',
    product: 'Product Name',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-pb-background py-16 sm:py-24 pb-logo-watermark-center"
    >
      {/* Logo watermark — centered background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05] mix-blend-multiply"
      >
        <img src="/images/logo.png" alt="" className="w-64 sm:w-80 h-auto" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Gold ornamental divider */}
        <div className="pb-gold-divider mb-10" aria-hidden="true">
          <span className="pb-gold-divider-icon text-pb-champagne-gold">✦</span>
        </div>

        {/* Section heading */}
        <header className="text-center mb-12 sm:mb-16">
          <h2
            id="testimonials-heading"
            className="font-serif text-4xl sm:text-5xl font-light text-pb-text-primary"
          >
            Placeholder — What Our Customers Say
          </h2>
          <p className="mt-4 text-pb-text-secondary font-sans text-base sm:text-lg max-w-xl mx-auto">
            Placeholder — aggregate social proof statement, e.g. "Loved by
            10,000+ customers across 30 countries."
          </p>
        </header>

        {/* Testimonials list */}
        <ol
          aria-label="Customer testimonials"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {PLACEHOLDER_TESTIMONIALS.map((t) => (
            <li key={t.id}>
              <article
                aria-label={`Testimonial from ${t.customerName}`}
                className="bg-pb-card rounded-2xl p-6 sm:p-8 shadow-card border border-pb-champagne-gold/10 flex flex-col gap-5 h-full hover:shadow-soft transition-shadow duration-300"
              >
                {/* Star rating */}
                <p
                  aria-label={`${t.rating} out of 5 stars`}
                  className="text-pb-champagne-gold text-lg tracking-wide"
                >
                  {'★'.repeat(t.rating)}
                  <span className="text-pb-champagne-gold/20">{'★'.repeat(5 - t.rating)}</span>
                </p>

                {/* Gold accent line */}
                <div className="w-8 h-px bg-pb-champagne-gold/50" />

                {/* Quote */}
                <blockquote cite="#" className="flex-1">
                  <p className="font-sans text-sm sm:text-base text-pb-text-secondary leading-relaxed italic font-light">
                    "{t.quote}"
                  </p>
                </blockquote>

                {/* Attribution */}
                <footer className="pt-4 border-t border-pb-champagne-gold/10">
                  <cite className="not-italic font-serif text-pb-text-primary font-semibold text-base block">
                    {t.customerName}
                  </cite>
                  <span className="text-xs text-pb-text-secondary/60 font-sans">{t.location}</span>
                  <small className="block mt-1 text-xs text-pb-champagne-gold font-sans font-medium">
                    Verified purchase — {t.product}
                  </small>
                </footer>
              </article>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
