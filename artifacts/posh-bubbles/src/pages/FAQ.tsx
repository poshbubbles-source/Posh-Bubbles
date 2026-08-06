/**
 * FAQ page
 *
 * Frequently asked questions using the reusable PbAccordion component.
 * Placeholder content only — no data or API integration.
 */

import { PbAccordionGroup, type AccordionSection } from '@/components/common/PbAccordion';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_SECTIONS: AccordionSection[] = [
  {
    heading: 'Orders & Shipping',
    items: [
      {
        id: 'shipping-time',
        question: 'How long does delivery take?',
        answer:
          'Standard delivery typically takes 5–7 business days across India. Expedited shipping (2–3 business days) is available at checkout for an additional fee. Orders placed before 12 PM IST on weekdays are usually dispatched the same day.',
      },
      {
        id: 'free-shipping',
        question: 'Do you offer free shipping?',
        answer:
          'Yes! We offer free standard shipping on all orders above ₹599. For orders below that threshold, a flat shipping fee of ₹49 applies. International shipping rates vary by destination and are calculated at checkout.',
      },
      {
        id: 'order-tracking',
        question: 'How can I track my order?',
        answer:
          'Once your order is dispatched, you will receive a shipping confirmation via WhatsApp and email with a tracking number. You can use this number on our courier partner\'s website to monitor your delivery in real time.',
      },
      {
        id: 'international-shipping',
        question: 'Do you ship internationally?',
        answer:
          'We currently ship to select countries including the UAE, USA, UK, Canada, and Australia. International orders typically arrive within 10–14 business days. Customs duties and import taxes, if applicable, are the responsibility of the recipient.',
      },
      {
        id: 'modify-cancel',
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          'Orders can be modified or cancelled within 2 hours of placement. Please reach out to us immediately via WhatsApp or email. Once an order has been dispatched, it cannot be cancelled, but you may initiate a return upon delivery.',
      },
    ],
  },
  {
    heading: 'Products & Ingredients',
    items: [
      {
        id: 'natural-ingredients',
        question: 'Are Posh Bubbles products made with natural ingredients?',
        answer:
          'Yes. Every Posh Bubbles formulation is crafted with natural, plant-derived ingredients wherever possible. We avoid parabens, sulphates, artificial dyes, and synthetic fragrances. Full ingredient lists are printed on each product and available on the individual product pages.',
      },
      {
        id: 'cruelty-free',
        question: 'Are your products cruelty-free and vegan?',
        answer:
          'All Posh Bubbles products are cruelty-free — we never test on animals. The majority of our range is also vegan; products that contain any animal-derived ingredient (such as honey or beeswax) are clearly labelled. Look for the "Vegan" badge on individual product pages.',
      },
      {
        id: 'shelf-life',
        question: 'What is the shelf life of your products?',
        answer:
          'Most Posh Bubbles products have a shelf life of 12–24 months from the date of manufacture when stored correctly. The "Period After Opening" (PAO) symbol on each label indicates how many months the product remains effective once opened. Store products in a cool, dry place away from direct sunlight.',
      },
      {
        id: 'sensitive-skin',
        question: 'Are your products suitable for sensitive skin?',
        answer:
          'Many of our formulations are developed with sensitive skin in mind and are free from common irritants. However, as skin types vary, we always recommend performing a patch test before first use. If you have a specific skin condition or allergy, please consult a dermatologist before trying a new product.',
      },
      {
        id: 'fragrance',
        question: 'Do your products contain artificial fragrances?',
        answer:
          'We use only natural essential oils and botanical extracts to scent our products. We never add synthetic or artificial fragrances. The delicate aromas you experience are entirely derived from the natural ingredients in each formulation.',
      },
    ],
  },
  {
    heading: 'Returns & Refunds',
    items: [
      {
        id: 'return-policy',
        question: 'What is your return policy?',
        answer:
          'We accept returns within 7 days of delivery for unopened, unused products in their original packaging. To initiate a return, please contact us via WhatsApp with your order number and a photograph of the product. Once we receive and inspect the return, a refund will be processed within 5–7 business days.',
      },
      {
        id: 'damaged-product',
        question: 'What should I do if I receive a damaged or incorrect product?',
        answer:
          'We sincerely apologise if this happens! Please photograph the damaged or incorrect item and share it with us via WhatsApp within 48 hours of delivery. We will arrange a replacement or full refund at no additional cost to you — no need to return the product in these cases.',
      },
      {
        id: 'refund-timeline',
        question: 'How long does a refund take to process?',
        answer:
          'Once we approve your refund, it is processed within 2–3 business days on our end. Depending on your bank or payment provider, the amount may take a further 3–5 business days to reflect in your account. UPI and wallet refunds are typically faster than card refunds.',
      },
    ],
  },
  {
    heading: 'Skin & Hair Care Tips',
    items: [
      {
        id: 'routine-order',
        question: 'In what order should I apply my skincare products?',
        answer:
          'The golden rule is to apply products from thinnest to thickest consistency: cleanser → mist/toner → serum → moisturiser → SPF (morning) or face oil (evening). Allowing 30–60 seconds between each step helps each product absorb properly before the next is applied.',
      },
      {
        id: 'how-often-mask',
        question: 'How often should I use a face mask?',
        answer:
          'For most skin types, using a face mask 1–2 times per week is ideal. If your skin is particularly oily or prone to congestion, you can use a clay-based mask up to 3 times a week. Hydrating and brightening masks can generally be used more frequently without concern.',
      },
      {
        id: 'hair-serum-use',
        question: 'How do I use a hair serum correctly?',
        answer:
          'Apply a few drops of hair serum to towel-dried (damp, not wet) hair, focusing on the mid-lengths and ends where damage is most common. Avoid applying directly to the scalp as this can cause buildup. You can use a serum on dry hair as a finishing step to tame frizz and add shine.',
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQ() {
  return (
    <main className="min-h-screen bg-pb-background">

      {/* ── Banner ────────────────────────────────────────────────── */}
      <section
        aria-label="FAQ hero"
        className="pb-page-banner relative text-center"
      >
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">
            FAQ
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-pb-champagne-gold/60" />
          <p className="mt-4 text-white/70 font-sans text-base sm:text-lg">
            Everything you'd like to know about Posh Bubbles
          </p>
        </div>
      </section>

      {/* ── FAQ body ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

        {/* Intro line */}
        <p className="font-serif text-xl sm:text-2xl text-pb-text-secondary text-center italic mb-14 leading-relaxed">
          Can't find what you're looking for? We're always happy to help — just reach out.
        </p>

        {/* Accordion sections */}
        <PbAccordionGroup sections={FAQ_SECTIONS} />

        {/* ── Still have questions? CTA ──────────────────────────── */}
        <div className="mt-20 text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-pb-champagne-gold/40 to-transparent"
          />
          <p className="font-serif text-2xl font-semibold text-pb-text-primary mb-2">
            Still have questions?
          </p>
          <p className="font-sans text-sm text-pb-text-secondary mb-7 max-w-sm mx-auto leading-relaxed">
            Our team is available Monday – Saturday, 10 AM – 6 PM IST. We typically reply within a few hours.
          </p>
          <Link
            to="/contact"
            className={cn(
              'inline-flex items-center gap-2',
              'px-8 py-3',
              'bg-pb-ruby text-white',
              'font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase',
              'hover:bg-pb-burgundy transition-colors duration-200',
            )}
          >
            <MessageCircle size={14} aria-hidden="true" />
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
