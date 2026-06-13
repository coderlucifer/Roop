import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      toggleCart: (open) => set({ isOpen: open ?? !get().isOpen }),
      
      addItem: (product, size) => set((state) => {
        const existingItem = state.items.find(
          (item) => item.productId === product.productId && item.size === size
        );
        
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.productId === product.productId && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            isOpen: true
          };
        }
        
        return {
          items: [...state.items, { ...product, size, quantity: 1 }],
          isOpen: true
        };
      }),

      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter(
          (item) => !(item.productId === productId && item.size === size)
        ),
      })),

      updateQuantity: (productId, size, quantity) => set((state) => {
        if (quantity < 1) return state;
        return {
          items: state.items.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        };
      }),

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          // Parse price "₹14,999" -> 14999
          const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
          return total + (price * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'roop-cart-storage',
    }
  )
);
