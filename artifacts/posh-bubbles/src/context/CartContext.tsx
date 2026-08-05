/**
 * CartContext
 *
 * Global cart state persisted to localStorage under the key "pb-cart".
 * Provides: items, coupon, computed totals, and mutation helpers.
 *
 * No API / database connection — fully local.
 */

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
  type ReactNode,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  /** Unique product id */
  id: string;
  name: string;
  /** Path relative to /public */
  image: string;
  /** Price in cents (e.g. 2499 = $24.99) */
  price: number;
  quantity: number;
  category: string;
}

export type CouponType = 'percent' | 'flat' | 'shipping';

export interface Coupon {
  code: string;
  type: CouponType;
  /** percent: 0-100 | flat: cents | shipping: ignored */
  value: number;
  label: string;
}

// ─── Static coupon registry ───────────────────────────────────────────────────

export const COUPON_REGISTRY: Record<string, Coupon> = {
  WELCOME10: { code: 'WELCOME10', type: 'percent',  value: 10,  label: '10% off your order'  },
  POSH20:    { code: 'POSH20',    type: 'percent',  value: 20,  label: '20% off your order'  },
  SAVE5:     { code: 'SAVE5',     type: 'flat',     value: 500, label: '$5.00 off your order' },
  FREESHIP:  { code: 'FREESHIP',  type: 'shipping', value: 0,   label: 'Free shipping'        },
};

/** Resolve a coupon code (case-insensitive). Returns null if invalid. */
export function resolveCoupon(code: string): Coupon | null {
  return COUPON_REGISTRY[code.trim().toUpperCase()] ?? null;
}

// ─── Shipping & totals ────────────────────────────────────────────────────────

/** Orders at or above this subtotal qualify for free standard shipping */
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000; // $50.00
export const STANDARD_SHIPPING_CENTS       = 599;  // $5.99

export interface CartTotals {
  /** Sum of (price × quantity) across all items, in cents */
  subtotal: number;
  /** Discount applied by coupon, in cents */
  discount: number;
  /** Shipping cost, in cents (0 if free) */
  shipping: number;
  /** subtotal − discount + shipping, in cents */
  total: number;
  /** Total number of individual items in the cart */
  itemCount: number;
}

export function computeTotals(items: CartItem[], coupon: Coupon | null): CartTotals {
  const subtotal  = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  let discount = 0;
  if (coupon) {
    if (coupon.type === 'percent') {
      discount = Math.round(subtotal * (coupon.value / 100));
    } else if (coupon.type === 'flat') {
      discount = Math.min(coupon.value, subtotal);
    }
    // 'shipping' type handled in shipping calc below
  }

  const discountedSubtotal = subtotal - discount;
  const freeShipping =
    discountedSubtotal >= FREE_SHIPPING_THRESHOLD_CENTS ||
    (coupon?.type === 'shipping');

  const shipping = items.length === 0 ? 0 : freeShipping ? 0 : STANDARD_SHIPPING_CENTS;
  const total    = Math.max(0, discountedSubtotal + shipping);

  return { subtotal, discount, shipping, total, itemCount };
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

interface CartState {
  items:  CartItem[];
  coupon: Coupon | null;
}

const INITIAL_STATE: CartState = { items: [], coupon: null };

type CartAction =
  | { type: 'ADD_ITEM';    item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QTY';  id: string; quantity: number }
  | { type: 'SET_COUPON';  coupon: Coupon | null }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE';     state: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i,
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };

    case 'UPDATE_QTY':
      if (action.quantity < 1) return state;
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i,
        ),
      };

    case 'SET_COUPON':
      return { ...state, coupon: action.coupon };

    case 'CLEAR':
      return INITIAL_STATE;

    case 'HYDRATE':
      return action.state;

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items:          CartItem[];
  coupon:         Coupon | null;
  totals:         CartTotals;
  addItem:        (item: CartItem) => void;
  removeItem:     (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon:    (coupon: Coupon) => void;
  removeCoupon:   () => void;
  clearCart:      () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

const LS_KEY = 'pb-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: 'HYDRATE', state: parsed });
      }
    } catch {
      // Corrupted storage — start fresh
      localStorage.removeItem(LS_KEY);
    }
  }, []);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {
      // Storage full or unavailable — silently ignore
    }
  }, [state]);

  const totals = useMemo(
    () => computeTotals(state.items, state.coupon),
    [state.items, state.coupon],
  );

  const value: CartContextValue = useMemo(
    () => ({
      items:          state.items,
      coupon:         state.coupon,
      totals,
      addItem:        (item) => dispatch({ type: 'ADD_ITEM', item }),
      removeItem:     (id)   => dispatch({ type: 'REMOVE_ITEM', id }),
      updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity }),
      applyCoupon:    (coupon) => dispatch({ type: 'SET_COUPON', coupon }),
      removeCoupon:   ()       => dispatch({ type: 'SET_COUPON', coupon: null }),
      clearCart:      ()       => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, state.coupon, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}
