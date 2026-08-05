/**
 * Cart page
 *
 * Displays cart items with quantity selectors and remove buttons,
 * a coupon code section, and a live order summary.
 *
 * All state is local (CartContext → localStorage). No API/DB calls.
 */

import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  Tag,
  Truck,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { useCart }                          from '@/context/CartContext';
import { resolveCoupon, FREE_SHIPPING_THRESHOLD_CENTS, STANDARD_SHIPPING_CENTS } from '@/context/CartContext';
import { formatPrice }                      from '@/utils';
import { cn }                               from '@/lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cents(n: number) {
  return formatPrice(n, 'USD');
}

// ─── Quantity Selector ────────────────────────────────────────────────────────

function QuantitySelector({
  value,
  onChange,
  itemName,
}: {
  value: number;
  onChange: (n: number) => void;
  itemName: string;
}) {
  return (
    <div
      className="inline-flex items-center border border-pb-champagne-gold/30 bg-pb-card"
      role="group"
      aria-label={`Quantity for ${itemName}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className={cn(
          'w-8 h-8 flex items-center justify-center',
          'text-pb-text-secondary transition-colors duration-150',
          'hover:text-pb-ruby hover:bg-pb-background',
          'disabled:opacity-30 disabled:cursor-not-allowed',
        )}
      >
        <Minus size={12} aria-hidden="true" />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="w-9 text-center font-sans text-sm font-medium text-pb-text-primary select-none tabular-nums"
      >
        {value}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={cn(
          'w-8 h-8 flex items-center justify-center',
          'text-pb-text-secondary transition-colors duration-150',
          'hover:text-pb-ruby hover:bg-pb-background',
        )}
      >
        <Plus size={12} aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────

function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: { id: string; name: string; image: string; price: number; quantity: number; category: string };
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex gap-4 sm:gap-5 py-5 border-b border-pb-champagne-gold/15 last:border-b-0">
      {/* Thumbnail */}
      <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-pb-background-secondary overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-1.5">
        {/* Name + remove */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-serif text-base font-semibold text-pb-text-primary leading-snug line-clamp-2">
              {item.name}
            </p>
            <p className="font-sans text-[0.7rem] tracking-[0.07em] uppercase text-pb-text-secondary/60 mt-0.5">
              {item.category}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${item.name} from cart`}
            onClick={onRemove}
            className="shrink-0 w-7 h-7 flex items-center justify-center text-pb-text-secondary/40 hover:text-pb-ruby transition-colors duration-150"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        {/* Qty + line total */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-1">
          <QuantitySelector
            value={item.quantity}
            onChange={onQuantityChange}
            itemName={item.name}
          />
          <div className="text-right">
            <p className="font-serif text-base font-semibold text-pb-ruby">
              {cents(item.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="font-sans text-[0.65rem] text-pb-text-secondary/50 mt-0.5">
                {cents(item.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

// ─── Coupon Section ───────────────────────────────────────────────────────────

function CouponSection() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [input,  setInput]  = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputId = useId();

  function handleApply(e: React.FormEvent) {
    e.preventDefault();
    const resolved = resolveCoupon(input);
    if (resolved) {
      applyCoupon(resolved);
      setStatus('success');
      setInput('');
      setErrorMsg('');
    } else {
      setStatus('error');
      setErrorMsg(`"${input.trim().toUpperCase()}" is not a valid coupon code.`);
    }
  }

  function handleRemove() {
    removeCoupon();
    setStatus('idle');
    setInput('');
    setErrorMsg('');
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-pb-ruby/6 border border-pb-ruby/20">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-pb-ruby shrink-0" aria-hidden="true" />
          <div>
            <p className="font-sans text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-pb-ruby">
              {coupon.code}
            </p>
            <p className="font-sans text-[0.65rem] text-pb-text-secondary/70 mt-0.5">
              {coupon.label}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove coupon"
          className="text-pb-text-secondary/40 hover:text-pb-ruby transition-colors shrink-0"
        >
          <X size={13} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} noValidate>
      <label
        htmlFor={inputId}
        className="block font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-pb-text-secondary mb-2"
      >
        Coupon code
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag
            size={13}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-pb-champagne-gold/60 pointer-events-none"
          />
          <input
            id={inputId}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setStatus('idle'); }}
            placeholder="e.g. WELCOME10"
            autoComplete="off"
            spellCheck={false}
            className={cn(
              'w-full h-9 pl-8 pr-3',
              'bg-pb-background border',
              'font-sans text-sm text-pb-text-primary placeholder:text-pb-text-secondary/35',
              'focus:outline-none focus:ring-2 focus:ring-pb-ruby/25 focus:border-pb-ruby/50',
              'transition-all duration-150',
              status === 'error'
                ? 'border-red-400/60'
                : 'border-pb-champagne-gold/25',
            )}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className={cn(
            'h-9 px-4 shrink-0',
            'bg-pb-ruby text-white',
            'font-sans text-[0.7rem] font-semibold tracking-[0.09em] uppercase',
            'hover:bg-pb-burgundy transition-colors duration-150',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
        >
          Apply
        </button>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="flex items-center gap-1.5 mt-2 font-sans text-[0.7rem] text-red-500"
        >
          <AlertCircle size={12} aria-hidden="true" className="shrink-0" />
          {errorMsg}
        </p>
      )}

      <p className="mt-2 font-sans text-[0.65rem] text-pb-text-secondary/50">
        Try: WELCOME10 · POSH20 · SAVE5 · FREESHIP
      </p>
    </form>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────

function OrderSummary() {
  const { totals, coupon, items } = useCart();
  const { subtotal, discount, shipping, total } = totals;

  const remainingForFreeShip = FREE_SHIPPING_THRESHOLD_CENTS - subtotal;
  const qualifiesForFreeShip =
    subtotal >= FREE_SHIPPING_THRESHOLD_CENTS || coupon?.type === 'shipping';

  return (
    <div className="bg-pb-card border border-pb-champagne-gold/18 p-5 sm:p-6 flex flex-col gap-5">

      {/* Heading */}
      <h2 className="font-serif text-lg font-semibold text-pb-text-primary tracking-wide">
        Order Summary
      </h2>

      {/* Shipping progress nudge */}
      {items.length > 0 && !qualifiesForFreeShip && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[0.7rem] text-pb-text-secondary/70">
              <span className="text-pb-ruby font-semibold">{cents(remainingForFreeShip)}</span>
              {' '}away from free shipping
            </p>
            <Truck size={13} className="text-pb-champagne-gold" aria-hidden="true" />
          </div>
          <div className="h-1 w-full bg-pb-champagne-gold/15 overflow-hidden">
            <div
              className="h-full bg-pb-champagne-gold transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100)}%` }}
              role="progressbar"
              aria-valuenow={subtotal}
              aria-valuemin={0}
              aria-valuemax={FREE_SHIPPING_THRESHOLD_CENTS}
              aria-label="Progress toward free shipping"
            />
          </div>
        </div>
      )}
      {items.length > 0 && qualifiesForFreeShip && (
        <p className="flex items-center gap-1.5 font-sans text-[0.7rem] text-pb-ruby font-medium">
          <Truck size={13} aria-hidden="true" />
          You've earned free shipping!
        </p>
      )}

      {/* Gold rule */}
      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/18" />

      {/* Line items */}
      <dl className="flex flex-col gap-3">
        <div className="flex justify-between items-baseline">
          <dt className="font-sans text-sm text-pb-text-secondary">Subtotal</dt>
          <dd className="font-sans text-sm font-medium text-pb-text-primary tabular-nums">
            {cents(subtotal)}
          </dd>
        </div>

        {discount > 0 && coupon && (
          <div className="flex justify-between items-baseline">
            <dt className="font-sans text-sm text-pb-ruby flex items-center gap-1.5">
              <Tag size={12} aria-hidden="true" />
              {coupon.code}
            </dt>
            <dd className="font-sans text-sm font-medium text-pb-ruby tabular-nums">
              − {cents(discount)}
            </dd>
          </div>
        )}

        {coupon?.type === 'shipping' && (
          <div className="flex justify-between items-baseline">
            <dt className="font-sans text-sm text-pb-ruby flex items-center gap-1.5">
              <Tag size={12} aria-hidden="true" />
              {coupon.code}
            </dt>
            <dd className="font-sans text-sm font-medium text-pb-ruby">Free shipping</dd>
          </div>
        )}

        <div className="flex justify-between items-baseline">
          <dt className="font-sans text-sm text-pb-text-secondary">Shipping</dt>
          <dd className="font-sans text-sm font-medium text-pb-text-primary tabular-nums">
            {items.length === 0
              ? '—'
              : shipping === 0
              ? <span className="text-pb-ruby">Free</span>
              : cents(STANDARD_SHIPPING_CENTS)}
          </dd>
        </div>
      </dl>

      {/* Gold rule */}
      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/18" />

      {/* Total */}
      <div className="flex justify-between items-baseline">
        <span className="font-serif text-base font-semibold text-pb-text-primary">Total</span>
        <span className="font-serif text-xl font-semibold text-pb-ruby tabular-nums">
          {cents(total)}
        </span>
      </div>

      {/* Coupon */}
      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/18" />
      <CouponSection />

      {/* CTA */}
      <button
        type="button"
        disabled={items.length === 0}
        className={cn(
          'w-full flex items-center justify-center gap-2',
          'h-11 px-6',
          'bg-pb-ruby text-white',
          'font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase',
          'hover:bg-pb-burgundy transition-colors duration-200',
          'disabled:opacity-40 disabled:cursor-not-allowed',
        )}
      >
        Proceed to Checkout
        <ChevronRight size={14} aria-hidden="true" />
      </button>

      <p className="text-center font-sans text-[0.65rem] text-pb-text-secondary/50">
        Taxes calculated at checkout
      </p>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <ShoppingBag
        size={52}
        strokeWidth={1}
        className="text-pb-champagne-gold/50 mb-5"
        aria-hidden="true"
      />
      <h2 className="font-serif text-2xl font-semibold text-pb-text-primary mb-2">
        Your cart is empty
      </h2>
      <p className="font-sans text-sm text-pb-text-secondary/70 max-w-xs mb-8">
        Looks like you haven't added anything yet. Browse our collection and treat yourself.
      </p>
      <Link
        to="/shop"
        className={cn(
          'inline-flex items-center gap-2 h-10 px-6',
          'bg-pb-ruby text-white',
          'font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase',
          'hover:bg-pb-burgundy transition-colors duration-200',
        )}
      >
        <ShoppingBag size={14} aria-hidden="true" />
        Shop now
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Cart() {
  const { items, removeItem, updateQuantity, totals } = useCart();

  return (
    <div className="min-h-screen bg-pb-background">

      {/* ── Banner ──────────────────────────────────────────────────────── */}
      <div className="pb-page-banner">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide">
            Your Cart
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-pb-champagne-gold/60" />
          {items.length > 0 && (
            <p className="mt-3 text-white/70 font-sans text-sm">
              {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">

            {/* ── Item list ─────────────────────────────────────────────── */}
            <section aria-label="Cart items">

              {/* Back link */}
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 font-sans text-[0.7rem] tracking-[0.08em] uppercase text-pb-text-secondary/60 hover:text-pb-ruby transition-colors duration-150 mb-6"
              >
                <ArrowLeft size={12} aria-hidden="true" />
                Continue shopping
              </Link>

              <div className="bg-pb-card border border-pb-champagne-gold/18 px-4 sm:px-6">
                <ul aria-label="Cart items list" role="list">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </ul>
              </div>
            </section>

            {/* ── Order summary (sticky on desktop) ─────────────────────── */}
            <aside className="lg:sticky lg:top-24" aria-label="Order summary">
              <OrderSummary />
            </aside>

          </div>
        )}
      </div>
    </div>
  );
}
