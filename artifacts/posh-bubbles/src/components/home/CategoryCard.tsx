/**
 * CategoryCard
 *
 * Responsive category card with a tall portrait image, serif title,
 * short description, and animated Shop button.
 *
 * Visual direction inspired by Native (nativecos.com):
 *   — image-first with a 4:5 portrait crop
 *   — clean white card body with minimal typography
 *   — image scales on hover; card lifts with a soft shadow
 *
 * All colours are Posh Bubbles design-system tokens.
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
      className={[
        'group flex flex-col',
        'bg-pb-card rounded-xl overflow-hidden',
        'border border-pb-champagne-gold/12',
        'shadow-[0_2px_12px_rgba(0,0,0,0.06)]',
        'hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]',
        'hover:-translate-y-1.5',
        'transition-all duration-350 ease-out',
        'will-change-transform',
      ].join(' ')}
    >
      {/* ── Image area ──────────────────────────────────────────── */}
      <figure className="relative overflow-hidden">
        {/*
          4:5 portrait aspect ratio — identical to Native's product tiles.
          The placeholder background uses the brand ivory so empty state
          still reads as intentional design.
        */}
        <div className="aspect-[4/5] bg-pb-background-secondary relative overflow-hidden">
          <img
            src={`/images/${slug}/${slug}-category.jpg`}
            alt={`${name} product category`}
            width={400}
            height={500}
            className={[
              'absolute inset-0 w-full h-full object-cover',
              'group-hover:scale-[1.04] transition-transform duration-500 ease-out',
            ].join(' ')}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />

          {/* Gradient overlay — fades bottom of image into card body */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-pb-card/60 to-transparent pointer-events-none"
          />
        </div>
        <figcaption className="sr-only">
          Representative image for the {name} category
        </figcaption>
      </figure>

      {/* ── Card body ───────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-5 pt-5 pb-6 gap-3">

        {/* Category name */}
        <h3 className="font-serif text-lg sm:text-xl font-semibold text-pb-text-primary tracking-wide leading-snug">
          {name}
        </h3>

        {/* Gold rule */}
        <div
          aria-hidden="true"
          className="w-7 h-px bg-pb-champagne-gold/60 group-hover:w-12 transition-all duration-300 ease-out"
        />

        {/* Description */}
        <p className="font-sans text-[0.8125rem] text-pb-text-secondary leading-relaxed flex-1">
          {description}
        </p>

        {/* Shop CTA */}
        <a
          href={`/shop/${slug}`}
          aria-label={`Shop ${name}`}
          className={[
            'mt-1 inline-flex items-center justify-between',
            'px-5 py-2.5 rounded-lg',
            'bg-pb-ruby text-white',
            'text-[0.6875rem] font-semibold tracking-[0.12em] uppercase',
            'group/btn',
            'hover:bg-pb-burgundy',
            'transition-colors duration-200',
          ].join(' ')}
        >
          <span>Shop {name}</span>
          {/* Arrow slides right on hover */}
          <span
            aria-hidden="true"
            className="text-pb-champagne-gold ml-2 translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200"
          >
            →
          </span>
        </a>

      </div>
    </article>
  );
}
