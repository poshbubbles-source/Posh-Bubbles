/**
 * BuyNowModal
 *
 * Collects quantity, customer name, phone, and delivery address,
 * then opens a pre-filled WhatsApp chat to place the order.
 *
 * Frontend only — no backend/API calls.
 */

import { useState, useId, useEffect, useRef } from 'react';
import { X, ShoppingBag, Send, MapPin, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_NUMBER = '919422521362';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Parse a display price string like "$24.99" → 24.99 (or null if unparseable).
 */
function parsePrice(display: string): number | null {
  const n = parseFloat(display.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function buildWhatsAppUrl(
  productName: string,
  unitPrice: string,
  quantity: number,
  customerName: string,
  phone: string,
  address: string,
): string {
  const unitNum  = parsePrice(unitPrice);
  const totalStr = unitNum != null
    ? `$${(unitNum * quantity).toFixed(2)}`
    : `${unitPrice} × ${quantity}`;

  const lines = [
    `Hello Posh Bubbles! 🌸`,
    ``,
    `I'd like to place an order:`,
    ``,
    `🛒 *Product:* ${productName}`,
    `📦 *Quantity:* ${quantity}`,
    `💰 *Unit Price:* ${unitPrice}`,
    ...(unitNum != null ? [`💵 *Order Total:* ${totalStr}`] : []),
    ``,
    `👤 *Name:* ${customerName}`,
    ...(phone.trim() ? [`📱 *Phone:* ${phone.trim()}`] : []),
    `📍 *Delivery Address:*`,
    address.trim(),
    ``,
    `Please confirm my order. Thank you! ✨`,
  ];

  const message = lines.join('\n');
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface BuyNowModalProps {
  productName: string;
  /** Display price string, e.g. "$24.99" */
  price: string;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BuyNowModal({ productName, price, onClose }: BuyNowModalProps) {
  const [quantity,     setQuantity]     = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phone,        setPhone]        = useState('');
  const [address,      setAddress]      = useState('');
  const [errors,       setErrors]       = useState<Record<string, string>>({});

  const nameId    = useId();
  const phoneId   = useId();
  const addressId = useId();
  const qtyId     = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus & close on Escape
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!customerName.trim()) e.customerName = 'Name is required.';
    if (!address.trim())      e.address      = 'Delivery address is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const url = buildWhatsAppUrl(productName, price, quantity, customerName.trim(), phone, address.trim());
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  const unitNum   = parsePrice(price);
  const totalDisp = unitNum != null ? `$${(unitNum * quantity).toFixed(2)}` : null;

  return (
    /* Backdrop */
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Scrim */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="buy-now-title"
        tabIndex={-1}
        className={cn(
          'relative z-10 w-full sm:max-w-lg',
          'bg-pb-card',
          'outline-none',
          'max-h-[92dvh] overflow-y-auto',
          'flex flex-col',
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-pb-champagne-gold/18 shrink-0">
          <div className="flex items-center gap-3">
            {/* WhatsApp green dot */}
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366]/15 text-[#25D366] shrink-0"
            >
              <ShoppingBag size={17} />
            </span>
            <div>
              <h2
                id="buy-now-title"
                className="font-serif text-lg font-semibold text-pb-text-primary leading-snug"
              >
                Order via WhatsApp
              </h2>
              <p className="font-sans text-[0.7rem] text-pb-text-secondary/60 mt-0.5 line-clamp-1">
                {productName}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="mt-0.5 w-7 h-7 flex items-center justify-center text-pb-text-secondary/40 hover:text-pb-ruby transition-colors shrink-0"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 px-5 sm:px-6 py-5 sm:py-6">

          {/* Product summary row */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 bg-pb-background border border-pb-champagne-gold/18">
            <div>
              <p className="font-sans text-[0.65rem] tracking-[0.08em] uppercase text-pb-text-secondary/60">Unit price</p>
              <p className="font-serif text-lg font-semibold text-pb-ruby">{price}</p>
            </div>
            {totalDisp && quantity > 1 && (
              <>
                <div aria-hidden="true" className="h-8 w-px bg-pb-champagne-gold/25" />
                <div className="text-right">
                  <p className="font-sans text-[0.65rem] tracking-[0.08em] uppercase text-pb-text-secondary/60">Order total</p>
                  <p className="font-serif text-lg font-semibold text-pb-text-primary">{totalDisp}</p>
                </div>
              </>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor={qtyId}
              className="block font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-pb-text-secondary mb-2"
            >
              Quantity
            </label>
            <div
              className="inline-flex items-center border border-pb-champagne-gold/30 bg-pb-background"
              role="group"
              aria-label="Quantity selector"
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-pb-text-secondary hover:text-pb-ruby hover:bg-pb-background-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span aria-hidden="true" className="text-lg font-light leading-none">−</span>
              </button>
              <input
                id={qtyId}
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!Number.isNaN(v) && v >= 1) setQuantity(v);
                }}
                className="w-12 h-10 text-center font-sans text-sm font-semibold text-pb-text-primary bg-transparent border-x border-pb-champagne-gold/30 focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-pb-text-secondary hover:text-pb-ruby hover:bg-pb-background-secondary transition-colors"
              >
                <span aria-hidden="true" className="text-lg font-light leading-none">+</span>
              </button>
            </div>
          </div>

          {/* Customer name */}
          <div>
            <label
              htmlFor={nameId}
              className="block font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-pb-text-secondary mb-2"
            >
              Your name <span className="text-pb-ruby" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <User size={13} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-pb-champagne-gold/60 pointer-events-none" />
              <input
                id={nameId}
                type="text"
                value={customerName}
                onChange={(e) => { setCustomerName(e.target.value); setErrors((p) => ({ ...p, customerName: '' })); }}
                placeholder="Enter your full name"
                autoComplete="name"
                className={cn(
                  'w-full h-10 pl-8 pr-3',
                  'bg-pb-background border',
                  'font-sans text-sm text-pb-text-primary placeholder:text-pb-text-secondary/35',
                  'focus:outline-none focus:ring-2 focus:ring-pb-ruby/25 focus:border-pb-ruby/50',
                  'transition-all duration-150',
                  errors.customerName ? 'border-red-400/70' : 'border-pb-champagne-gold/30',
                )}
              />
            </div>
            {errors.customerName && (
              <p role="alert" className="mt-1.5 font-sans text-[0.7rem] text-red-500">{errors.customerName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor={phoneId}
              className="block font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-pb-text-secondary mb-2"
            >
              Phone number <span className="font-normal text-pb-text-secondary/40">(optional)</span>
            </label>
            <div className="relative">
              <Phone size={13} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-pb-champagne-gold/60 pointer-events-none" />
              <input
                id={phoneId}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                className={cn(
                  'w-full h-10 pl-8 pr-3',
                  'bg-pb-background border border-pb-champagne-gold/30',
                  'font-sans text-sm text-pb-text-primary placeholder:text-pb-text-secondary/35',
                  'focus:outline-none focus:ring-2 focus:ring-pb-ruby/25 focus:border-pb-ruby/50',
                  'transition-all duration-150',
                )}
              />
            </div>
          </div>

          {/* Delivery address */}
          <div>
            <label
              htmlFor={addressId}
              className="block font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase text-pb-text-secondary mb-2"
            >
              Delivery address <span className="text-pb-ruby" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <MapPin size={13} aria-hidden="true" className="absolute left-3 top-3 text-pb-champagne-gold/60 pointer-events-none" />
              <textarea
                id={addressId}
                value={address}
                onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: '' })); }}
                placeholder="House / flat no., street, area, city, state, PIN code"
                autoComplete="street-address"
                rows={3}
                className={cn(
                  'w-full pl-8 pr-3 pt-2.5 pb-2.5',
                  'bg-pb-background border',
                  'font-sans text-sm text-pb-text-primary placeholder:text-pb-text-secondary/35',
                  'focus:outline-none focus:ring-2 focus:ring-pb-ruby/25 focus:border-pb-ruby/50',
                  'resize-none transition-all duration-150 leading-relaxed',
                  errors.address ? 'border-red-400/70' : 'border-pb-champagne-gold/30',
                )}
              />
            </div>
            {errors.address && (
              <p role="alert" className="mt-1.5 font-sans text-[0.7rem] text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'flex-1 h-11 px-4',
                'border border-pb-champagne-gold/30 text-pb-text-secondary',
                'font-sans text-[0.7rem] font-semibold tracking-[0.09em] uppercase',
                'hover:border-pb-ruby/40 hover:text-pb-ruby transition-colors duration-150',
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn(
                'flex-[2] h-11 px-4 flex items-center justify-center gap-2',
                'bg-[#25D366] text-white',
                'font-sans text-[0.7rem] font-semibold tracking-[0.09em] uppercase',
                'hover:bg-[#1ebe5d] transition-colors duration-150',
                'shadow-[0_2px_12px_rgba(37,211,102,0.35)]',
              )}
            >
              <Send size={14} aria-hidden="true" />
              Send on WhatsApp
            </button>
          </div>

          <p className="text-center font-sans text-[0.65rem] text-pb-text-secondary/45 -mt-1">
            Opens WhatsApp with your order details pre-filled
          </p>
        </form>
      </div>
    </div>
  );
}
