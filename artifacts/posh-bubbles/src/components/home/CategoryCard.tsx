/**
 * CategoryCard
 *
 * Reusable card representing a single product category. Placeholder only — no
 * styling, animations, or business logic.
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
    <article aria-label={`${name} category`}>
      {/* Category image */}
      <figure>
        <img
          src={`/placeholders/categories/${slug}.jpg`}
          alt={`Placeholder — ${name} product category image`}
          width={400}
          height={400}
        />
        <figcaption>
          Placeholder — representative image for the {name} category
        </figcaption>
      </figure>

      {/* Category details */}
      <div>
        <h3>{name}</h3>
        <p>{description}</p>

        {/* Shop CTA */}
        <a href={`/shop?category=${slug}`} aria-label={`Shop ${name}`}>
          Shop Now
        </a>
      </div>
    </article>
  );
}
