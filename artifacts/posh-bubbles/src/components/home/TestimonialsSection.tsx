/**
 * TestimonialsSection
 *
 * Social proof section displaying customer reviews. Placeholder only — no styling or logic.
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
    <section aria-labelledby="testimonials-heading">
      {/* Section heading */}
      <header>
        <h2 id="testimonials-heading">Placeholder — What Our Customers Say</h2>
        <p>
          Placeholder — aggregate social proof statement, e.g. "Loved by
          10,000+ customers across 30 countries."
        </p>
      </header>

      {/* Testimonials list */}
      <ol aria-label="Customer testimonials">
        {PLACEHOLDER_TESTIMONIALS.map((t) => (
          <li key={t.id}>
            <article aria-label={`Testimonial from ${t.customerName}`}>
              {/* Star rating — screen-reader accessible */}
              <p aria-label={`${t.rating} out of 5 stars`}>
                {'★'.repeat(t.rating)}
                {'☆'.repeat(5 - t.rating)}
              </p>

              {/* Quote */}
              <blockquote cite="#">
                <p>{t.quote}</p>
              </blockquote>

              {/* Attribution */}
              <footer>
                <cite>{t.customerName}</cite>
                <span>{t.location}</span>
                <small>Verified purchase — {t.product}</small>
              </footer>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
