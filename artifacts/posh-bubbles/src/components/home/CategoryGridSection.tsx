/**
 * CategoryGridSection
 *
 * Home-page section displaying the full product category grid. Placeholder
 * only — no styling, animations, or business logic.
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
    <section aria-labelledby="categories-heading">
      {/* Section heading */}
      <header>
        <h2 id="categories-heading">Placeholder — Shop by Category</h2>
        <p>
          Placeholder — a short descriptor inviting the visitor to explore the
          full range of product categories.
        </p>
      </header>

      {/* Category grid */}
      <ol aria-label="Product categories">
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
    </section>
  );
}
