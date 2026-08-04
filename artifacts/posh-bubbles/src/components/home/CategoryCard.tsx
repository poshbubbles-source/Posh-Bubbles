/**
 * CategoryCard
 *
 * Reusable card representing a single product category. Placeholder content only.
 * Structure inspired by premium skincare brand category navigation layouts:
 *   - Category image
 *   - Category name as a heading
 *   - Short descriptive placeholder text
 *   - "Shop Now" call-to-action link
 */

interface CategoryCardProps {
  /** Display name of the category, e.g. "Skin Care" */
  name: string;
  /** URL-safe slug used to build the shop link, e.g. "skin-care" */
  slug: string;
  /** Short placeholder description of what the category contains */
  description: string;
}

export default function CategoryCard({ name, slug, description }: CategoryCardProps) {
  return (
    <article
      aria-label={`${name} category`}
      className="group bg-pb-card rounded-2xl overflow-hidden shadow-card border border-pb-champagne-gold/10 hover:shadow-lifted hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Category image */}
      <figure className="relative overflow-hidden">
        <div className="aspect-square bg-pb-background-secondary flex items-center justify-center">
          <img
            src={`/placeholders/categories/${slug}.jpg`}
            alt={`Placeholder — ${name} product category image`}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <figcaption className="sr-only">
          Placeholder — representative image for the {name} category
        </figcaption>
      </figure>

      {/* Category details */}
      <div className="flex flex-col flex-1 gap-3 p-5 sm:p-6">
        <h3 className="font-serif text-xl font-semibold text-pb-text-primary tracking-wide">
          {name}
        </h3>

        {/* Gold accent */}
        <div className="w-8 h-px bg-pb-champagne-gold/50" />

        <p className="font-sans text-sm text-pb-text-secondary leading-relaxed flex-1">
          {description}
        </p>

        {/* Shop CTA */}
        <a
          href={`/shop?category=${slug}`}
          aria-label={`Shop ${name}`}
          className="mt-2 inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-pb-ruby text-white text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-pb-burgundy transition-all duration-200 shadow-card hover:shadow-soft"
        >
          Shop Now
          <span aria-hidden="true" className="text-pb-champagne-gold">→</span>
        </a>
      </div>
    </article>
  );
}
