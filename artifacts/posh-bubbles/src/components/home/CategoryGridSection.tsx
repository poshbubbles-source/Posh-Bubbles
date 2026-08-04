/**
 * CategoryGridSection
 *
 * Home-page section displaying the full product category grid. Placeholder content only.
 * Structure inspired by premium skincare brand category-browse layouts:
 *   - Section heading + supporting descriptor
 *   - Grid of CategoryCard components, one per product category
 */

import CategoryCard from './CategoryCard';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const PLACEHOLDER_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Skin Care',
    slug: 'skin-care',
    description:
      'Placeholder — a short description of the skin care range: cleansers, serums, moisturisers, and treatments.',
  },
  {
    id: 2,
    name: 'Lip Care',
    slug: 'lip-care',
    description:
      'Placeholder — a short description of the lip care range: balms, scrubs, and treatments for soft, nourished lips.',
  },
  {
    id: 3,
    name: 'Hair Care',
    slug: 'hair-care',
    description:
      'Placeholder — a short description of the hair care range: shampoos, conditioners, masks, and styling products.',
  },
  {
    id: 4,
    name: 'Body Care',
    slug: 'body-care',
    description:
      'Placeholder — a short description of the body care range: lotions, oils, scrubs, and washes.',
  },
  {
    id: 5,
    name: 'Sunscreen',
    slug: 'sunscreen',
    description:
      'Placeholder — a short description of the sunscreen range: daily SPF, mineral, and tinted sun protection.',
  },
  {
    id: 6,
    name: 'Hand Soap',
    slug: 'hand-soap',
    description:
      'Placeholder — a short description of the hand soap range: liquid, bar, and foaming formulas.',
  },
  {
    id: 7,
    name: 'Pet Care',
    slug: 'pet-care',
    description:
      'Placeholder — a short description of the pet care range: gentle shampoos and grooming products for pets.',
  },
];

export default function CategoryGridSection() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-pb-background py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Gold ornamental divider */}
        <div className="pb-gold-divider mb-10" aria-hidden="true">
          <span className="pb-gold-divider-icon text-pb-champagne-gold">✦</span>
        </div>

        {/* Section heading */}
        <header className="text-center mb-12 sm:mb-16">
          <h2
            id="categories-heading"
            className="font-serif text-4xl sm:text-5xl font-light text-pb-text-primary"
          >
            Placeholder — Shop by Category
          </h2>
          <p className="mt-4 font-sans text-pb-text-secondary text-base sm:text-lg max-w-xl mx-auto">
            Placeholder — a short descriptor inviting the visitor to explore the
            full range of product categories.
          </p>
        </header>

        {/* Category grid */}
        <ol
          aria-label="Product categories"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {PLACEHOLDER_CATEGORIES.map((category) => (
            <li key={category.id}>
              <CategoryCard
                name={category.name}
                slug={category.slug}
                description={category.description}
              />
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
