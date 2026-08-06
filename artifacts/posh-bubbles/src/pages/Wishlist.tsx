/**
 * Wishlist page
 *
 * Displays saved products with per-item Remove and Move to Cart actions.
 * All state is local (WishlistContext → localStorage). No API/DB calls.
 */

import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <span className="flex items-center justify-center w-20 h-20 rounded-full bg-pb-champagne-gold/10 mb-6">
        <Heart size={36} className="text-pb-champagne-gold/60" strokeWidth={1.25} />
      </span>
      <h2 className="font-serif text-2xl font-semibold text-pb-text-primary mb-3">
        Your wishlist is empty
      </h2>
      <p className="font-sans text-sm text-pb-text-secondary max-w-xs leading-relaxed mb-8">
        Save products you love and come back to them anytime.
      </p>
      <Link
        to="/shop"
        className={cn(
          'inline-flex items-center gap-2',
          'px-7 py-3',
          'bg-pb-ruby text-white',
          'font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase',
          'hover:bg-pb-burgundy transition-colors duration-200',
        )}
      >
        <ShoppingBag size={14} aria-hidden="true" />
        Browse Shop
      </Link>
    </div>
  );
}

// ─── Wishlist item card ───────────────────────────────────────────────────────

function WishlistCard({ item }: { item: import('@/context/WishlistContext').WishlistItem }) {
  const { removeItem, moveToCart } = useWishlist();

  return (
    <article
      aria-label={item.name}
      className={cn(
        'group relative flex flex-col sm:flex-row gap-0',
        'bg-pb-card border border-pb-champagne-gold/15',
        'hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)]',
        'transition-shadow duration-200',
      )}
    >
      {/* Thumbnail */}
      <Link
        to="/shop"
        tabIndex={-1}
        aria-hidden="true"
        className="block w-full sm:w-36 shrink-0 overflow-hidden aspect-square sm:aspect-auto"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400 ease-out"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 gap-3 px-5 py-4">
        {/* Category + name */}
        <div>
          {item.category && (
            <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-pb-text-secondary/50 mb-1">
              {item.category}
            </p>
          )}
          <h3 className="font-serif text-base font-semibold text-pb-text-primary leading-snug">
            {item.name}
          </h3>
        </div>

        {/* Price */}
        <p
          aria-label={`Price: ${item.priceDisplay}`}
          className="font-serif text-xl font-semibold text-pb-ruby"
        >
          {item.priceDisplay}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          <button
            type="button"
            onClick={() => moveToCart(item.id)}
            aria-label={`Move ${item.name} to cart`}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-4 py-2',
              'bg-pb-ruby text-white',
              'font-sans text-[0.65rem] font-semibold tracking-[0.09em] uppercase',
              'hover:bg-pb-burgundy transition-colors duration-150',
            )}
          >
            <ShoppingCart size={13} aria-hidden="true" />
            Move to Cart
          </button>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from wishlist`}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-4 py-2',
              'border border-pb-champagne-gold/30 text-pb-text-secondary/70',
              'font-sans text-[0.65rem] font-semibold tracking-[0.09em] uppercase',
              'hover:border-pb-ruby/40 hover:text-pb-ruby transition-all duration-150',
            )}
          >
            <Trash2 size={13} aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>

      {/* Corner remove ×  */}
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name}`}
        className={cn(
          'absolute top-3 right-3',
          'w-7 h-7 flex items-center justify-center',
          'text-pb-text-secondary/30 hover:text-pb-ruby',
          'transition-colors duration-150',
        )}
      >
        <span aria-hidden="true" className="text-base leading-none">×</span>
      </button>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Wishlist() {
  const { items, clearWishlist } = useWishlist();
  const count = items.length;

  return (
    <div className="min-h-screen bg-pb-background">

      {/* ── Banner ────────────────────────────────────────────────── */}
      <section
        aria-label="Wishlist hero"
        className="relative bg-pb-ruby py-14 px-4 text-center overflow-hidden"
      >
        {/* decorative bokeh rings */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full border border-pb-champagne-gold/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-pb-champagne-gold/10" />

        <Heart
          size={28}
          className="mx-auto mb-3 text-pb-champagne-gold/70"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h1 className="font-serif text-4xl font-semibold text-white tracking-wide">
          Your Wishlist
        </h1>
        <div aria-hidden="true" className="mx-auto mt-3 mb-3 h-px w-12 bg-pb-champagne-gold/60" />
        <p className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-white/60">
          {count === 0 ? 'Nothing saved yet' : `${count} saved item${count !== 1 ? 's' : ''}`}
        </p>
      </section>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {count === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 font-sans text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-pb-text-secondary hover:text-pb-ruby transition-colors duration-150"
              >
                <ArrowLeft size={13} aria-hidden="true" />
                Continue Shopping
              </Link>

              <button
                type="button"
                onClick={clearWishlist}
                className="font-sans text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-pb-text-secondary/50 hover:text-pb-ruby transition-colors duration-150"
              >
                Clear all
              </button>
            </div>

            {/* Item list */}
            <ul role="list" className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id}>
                  <WishlistCard item={item} />
                </li>
              ))}
            </ul>

            {/* Bottom CTA */}
            <div className="mt-10 pt-8 border-t border-pb-champagne-gold/15 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/cart"
                className={cn(
                  'w-full sm:w-auto inline-flex items-center justify-center gap-2',
                  'px-8 py-3',
                  'border border-pb-ruby text-pb-ruby',
                  'font-sans text-[0.7rem] font-semibold tracking-[0.09em] uppercase',
                  'hover:bg-pb-ruby hover:text-white transition-colors duration-200',
                )}
              >
                <ShoppingCart size={14} aria-hidden="true" />
                View Cart
              </Link>
              <Link
                to="/shop"
                className={cn(
                  'w-full sm:w-auto inline-flex items-center justify-center gap-2',
                  'px-8 py-3',
                  'bg-pb-ruby text-white',
                  'font-sans text-[0.7rem] font-semibold tracking-[0.09em] uppercase',
                  'hover:bg-pb-burgundy transition-colors duration-200',
                )}
              >
                <ShoppingBag size={14} aria-hidden="true" />
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
