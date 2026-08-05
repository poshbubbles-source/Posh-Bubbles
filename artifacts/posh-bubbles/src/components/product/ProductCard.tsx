/**
 * ProductCard
 *
 * Reusable static UI card for a single product.
 * Displays: image, name, description, price, star rating,
 * wishlist toggle, Add to Cart, and Buy Now actions.
 *
 * Static UI only — no state, JSON, or API connections.
 * All colours are Posh Bubbles design-system tokens.
 */

import { useState } from 'react';
import { Heart, ShoppingCart, Zap, Star } from 'lucide-react';
import BuyNowModal from './BuyNowModal';

export interface ProductCardProps {
  /** Path to the product image (relative to /public) */
  image: string;
  /** Product display name */
  name: string;
  /** Short description shown on the card */
  description: string;
  /** Display price string, e.g. "$24.99" */
  price: string;
  /** Numeric rating 0–5 (decimals supported) */
  rating: number;
  /** Total number of reviews */
  reviewCount: number;
  /** Whether the product is in the wishlist (visual only) */
  isWishlisted?: boolean;
  /** Whether the product is available to purchase */
  isAvailable?: boolean;
  /** Optional badge label, e.g. "New", "Best Seller" */
  badge?: string;
}

/** Renders up to 5 stars filled proportionally to `rating`. */
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${rating} out of 5 stars, ${count} reviews`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < Math.floor(rating);
          const half   = !filled && i < rating;
          return (
            <Star
              key={i}
              size={12}
              className={
                filled || half
                  ? 'fill-pb-champagne-gold text-pb-champagne-gold'
                  : 'fill-transparent text-pb-champagne-gold/30'
              }
            />
          );
        })}
      </span>
      <span className="font-sans text-[0.6875rem] text-pb-text-secondary leading-none">
        {rating.toFixed(1)}
        <span className="text-pb-text-secondary/50 ml-1">({count})</span>
      </span>
    </div>
  );
}

export default function ProductCard({
  image,
  name,
  description,
  price,
  rating,
  reviewCount,
  isWishlisted = false,
  isAvailable  = true,
  badge,
}: ProductCardProps) {
  const [buyNowOpen, setBuyNowOpen] = useState(false);

  return (
    <>
    {buyNowOpen && (
      <BuyNowModal
        productName={name}
        price={price}
        onClose={() => setBuyNowOpen(false)}
      />
    )}
    <article
      aria-label={name}
      className={[
        'group relative flex flex-col',
        'bg-pb-card rounded-xl overflow-hidden',
        'border border-pb-champagne-gold/12',
        'shadow-[0_2px_12px_rgba(0,0,0,0.06)]',
        'hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]',
        'hover:-translate-y-1.5',
        'transition-all duration-300 ease-out',
        'will-change-transform',
      ].join(' ')}
    >

      {/* ── Image area ──────────────────────────────────────────── */}
      <figure className="relative overflow-hidden">
        <div className="aspect-[4/5] bg-pb-background-secondary overflow-hidden">
          <img
            src={image}
            alt={name}
            width={400}
            height={500}
            className={[
              'absolute inset-0 w-full h-full object-cover',
              'group-hover:scale-[1.04] transition-transform duration-500 ease-out',
              !isAvailable ? 'opacity-60 grayscale-[30%]' : '',
            ].join(' ')}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Optional badge — top left */}
        {badge && (
          <span
            aria-label={badge}
            className={[
              'absolute top-3 left-3 z-10',
              'px-2.5 py-1 rounded-full',
              'bg-pb-ruby text-white',
              'font-sans text-[0.625rem] font-bold tracking-widest uppercase',
            ].join(' ')}
          >
            {badge}
          </span>
        )}

        {/* Wishlist button — top right */}
        <button
          type="button"
          aria-label={isWishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={isWishlisted}
          className={[
            'absolute top-3 right-3 z-10',
            'w-8 h-8 rounded-full',
            'flex items-center justify-center',
            'bg-white/80 backdrop-blur-sm',
            'border border-pb-champagne-gold/20',
            'shadow-sm',
            'hover:bg-white hover:scale-110',
            'transition-all duration-200',
          ].join(' ')}
        >
          <Heart
            size={15}
            className={
              isWishlisted
                ? 'fill-pb-ruby text-pb-ruby'
                : 'fill-transparent text-pb-text-secondary group-hover:text-pb-ruby transition-colors duration-200'
            }
          />
        </button>

        {/* Unavailable overlay */}
        {!isAvailable && (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none"
          >
            <span className="px-3 py-1 bg-pb-burgundy/90 text-white text-[0.625rem] font-semibold tracking-widest uppercase rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Bottom gradient fade into card body */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-pb-card/50 to-transparent pointer-events-none"
        />

        <figcaption className="sr-only">{name} product image</figcaption>
      </figure>

      {/* ── Card body ───────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-5 gap-3">

        {/* Rating */}
        <StarRating rating={rating} count={reviewCount} />

        {/* Name + gold rule */}
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-base sm:text-lg font-semibold text-pb-text-primary leading-snug tracking-wide line-clamp-2">
            {name}
          </h3>
          <div
            aria-hidden="true"
            className="w-6 h-px bg-pb-champagne-gold/60 group-hover:w-10 transition-all duration-300 ease-out"
          />
        </div>

        {/* Description */}
        <p className="font-sans text-[0.75rem] text-pb-text-secondary leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Price */}
        <p
          aria-label={`Price: ${price}`}
          className="font-serif text-xl font-semibold text-pb-ruby tracking-wide"
        >
          {price}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-1">

          {/* Add to Cart */}
          <button
            type="button"
            aria-label={`Add ${name} to cart`}
            disabled={!isAvailable}
            className={[
              'w-full inline-flex items-center justify-center gap-2',
              'px-4 py-2.5 rounded-lg',
              'border border-pb-ruby',
              'text-pb-ruby',
              'font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase',
              'hover:bg-pb-ruby hover:text-white',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-pb-ruby',
              'transition-all duration-200',
            ].join(' ')}
          >
            <ShoppingCart size={14} aria-hidden="true" />
            Add to Cart
          </button>

          {/* Buy Now */}
          <button
            type="button"
            aria-label={`Buy ${name} now`}
            disabled={!isAvailable}
            onClick={() => setBuyNowOpen(true)}
            className={[
              'w-full inline-flex items-center justify-center gap-2',
              'px-4 py-2.5 rounded-lg',
              'bg-pb-ruby text-white',
              'font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase',
              'hover:bg-pb-burgundy',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'transition-colors duration-200',
            ].join(' ')}
          >
            <Zap size={14} aria-hidden="true" />
            Buy Now
          </button>

        </div>
      </div>
    </article>
    </>
  );
}
