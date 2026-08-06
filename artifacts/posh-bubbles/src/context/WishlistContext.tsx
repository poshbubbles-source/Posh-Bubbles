/**
 * WishlistContext
 *
 * Global wishlist state persisted to localStorage under "pb-wishlist".
 * Provides: items, toggle, remove, clear, isWishlisted, and moveToCart.
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
import { useCart } from './CartContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  /** Display price string, e.g. "$24.99" */
  priceDisplay: string;
  /** Price in cents for cart operations — 0 if unknown */
  priceInCents: number;
  category: string;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

type WishlistAction =
  | { type: 'ADD';    item: WishlistItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: WishlistItem[] };

function reducer(state: WishlistItem[], action: WishlistAction): WishlistItem[] {
  switch (action.type) {
    case 'HYDRATE':
      return action.items;
    case 'ADD':
      if (state.some((i) => i.id === action.item.id)) return state;
      return [...state, action.item];
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'CLEAR':
      return [];
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface WishlistContextValue {
  items: WishlistItem[];
  addItem:      (item: WishlistItem) => void;
  removeItem:   (id: string) => void;
  toggleItem:   (item: WishlistItem) => void;
  clearWishlist: () => void;
  isWishlisted: (id: string) => boolean;
  moveToCart:   (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = 'pb-wishlist';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { addItem: cartAdd } = useCart();
  const [items, dispatch] = useReducer(reducer, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistItem[];
        if (Array.isArray(parsed)) dispatch({ type: 'HYDRATE', items: parsed });
      }
    } catch {
      // corrupted data — start fresh
    }
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full — best-effort
    }
  }, [items]);

  const value = useMemo<WishlistContextValue>(() => ({
    items,
    addItem:      (item) => dispatch({ type: 'ADD', item }),
    removeItem:   (id)   => dispatch({ type: 'REMOVE', id }),
    toggleItem:   (item) => dispatch(
      items.some((i) => i.id === item.id)
        ? { type: 'REMOVE', id: item.id }
        : { type: 'ADD', item },
    ),
    clearWishlist: () => dispatch({ type: 'CLEAR' }),
    isWishlisted: (id) => items.some((i) => i.id === id),
    moveToCart: (id) => {
      const found = items.find((i) => i.id === id);
      if (!found) return;
      cartAdd({
        id:       found.id,
        name:     found.name,
        image:    found.image,
        price:    found.priceInCents,
        quantity: 1,
        category: found.category,
      });
      dispatch({ type: 'REMOVE', id });
    },
  }), [items, cartAdd]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>');
  return ctx;
}
