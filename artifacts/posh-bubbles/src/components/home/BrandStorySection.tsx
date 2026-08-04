/**
 * BrandStorySection
 *
 * Two-column brand narrative section. Placeholder only — no styling or logic.
 * Structure inspired by premium skincare brand story layouts:
 *   - Editorial-style headline
 *   - Multi-paragraph brand narrative
 *   - Supporting imagery alongside the copy
 *   - Secondary CTA linking to the About page
 */
export default function BrandStorySection() {
  return (
    <section aria-labelledby="brand-story-heading">
      <article>
        {/* Section heading */}
        <header>
          <h2 id="brand-story-heading">Placeholder — Our Story</h2>
          <p>
            Placeholder sub-heading — a one-line hook that draws the reader into
            the brand narrative.
          </p>
        </header>

        {/* Narrative copy */}
        <div>
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

          {/* Secondary CTA */}
          <a href="/about">Learn More About Us</a>
        </div>

        {/* Editorial image */}
        <figure>
          <img
            src="/placeholders/brand-story.jpg"
            alt="Placeholder — behind-the-scenes brand imagery"
            width={640}
            height={800}
          />
          <figcaption>
            Placeholder — editorial or behind-the-scenes brand photograph
          </figcaption>
        </figure>
      </article>
    </section>
  );
}
