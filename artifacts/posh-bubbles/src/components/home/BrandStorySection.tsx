/**
 * BrandStorySection
 *
 * Two-column brand narrative section. Placeholder content only.
 * Structure inspired by premium skincare brand story layouts:
 *   - Editorial-style headline
 *   - Multi-paragraph brand narrative
 *   - Supporting imagery alongside the copy
 *   - Secondary CTA linking to the About page
 */
export default function BrandStorySection() {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className="relative overflow-hidden bg-pb-background-secondary"
    >
      {/* Gold ornamental divider — top */}
      <div className="pb-gold-divider px-8 pt-12 sm:pt-16 max-w-7xl mx-auto" aria-hidden="true">
        <span className="pb-gold-divider-icon text-pb-champagne-gold">✦</span>
      </div>

      <article className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-16 sm:pb-24">

        {/* Section heading */}
        <header className="text-center mb-12 sm:mb-16">
          <h2
            id="brand-story-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-pb-text-primary"
          >
            Placeholder — Our Story
          </h2>
          <p className="mt-4 text-pb-text-secondary text-base sm:text-lg font-sans max-w-xl mx-auto">
            Placeholder sub-heading — a one-line hook that draws the reader into
            the brand narrative.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Narrative copy */}
          <div className="space-y-6 font-sans text-pb-text-secondary leading-relaxed order-2 lg:order-1">
            <p>
              Placeholder paragraph one — introduce the founder's inspiration and
              the problem the brand was created to solve. Keep it personal and
              grounded in real experience.
            </p>
            <p>
              Placeholder paragraph two — describe the brand's commitment to
              ingredients, craftsmanship, or sustainability. Anchor the story in
              something specific and verifiable.
            </p>
            <p>
              Placeholder paragraph three — close with the brand's promise to the
              customer and what makes the ritual different.
            </p>

            {/* Gold accent line */}
            <div className="w-12 h-px bg-pb-champagne-gold/60" />

            {/* Secondary CTA */}
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-pb-ruby text-sm font-semibold tracking-widest uppercase border-b border-pb-champagne-gold/40 pb-0.5 hover:border-pb-champagne-gold transition-all duration-200"
            >
              Learn More About Us
              <span aria-hidden="true" className="text-pb-champagne-gold">→</span>
            </a>
          </div>

          {/* Editorial image */}
          <figure className="order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-pb-background border border-pb-champagne-gold/15 shadow-lifted flex items-center justify-center">
              <img
                src="/placeholders/brand-story.jpg"
                alt="Placeholder — behind-the-scenes brand imagery"
                width={640}
                height={800}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <figcaption className="mt-3 text-xs text-pb-text-secondary/60 font-sans text-center italic">
              Placeholder — editorial or behind-the-scenes brand photograph
            </figcaption>
          </figure>

        </div>
      </article>

      {/* Gold ornamental divider — bottom */}
      <div className="pb-gold-divider px-8 pb-10 max-w-7xl mx-auto" aria-hidden="true">
        <span className="pb-gold-divider-icon text-pb-champagne-gold">✦</span>
      </div>
    </section>
  );
}
