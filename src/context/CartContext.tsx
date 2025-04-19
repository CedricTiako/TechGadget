import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { getAnonymousId } from '../lib/anonymous-user';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string | null;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const anonymousId = getAnonymousId();

  const getUserId = () => user?.id || anonymousId;

  const fetchCart = async () => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          product:products (
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', getUserId());

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Erreur lors du chargement du panier');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: string) => {
    try {
      const existingItem = items.find(item => item.product_id === productId);

      if (existingItem) {
        await updateQuantity(productId, existingItem.quantity + 1);
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: getUserId(),
            product_id: productId,
            quantity: 1
          });

        if (error) throw error;
        toast.success('Produit ajouté au panier');
        await fetchCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Erreur lors de l\'ajout au panier');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', getUserId())
        .eq('product_id', productId);

      if (error) throw error;
      toast.success('Produit retiré du panier');
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: getUserId(),
          product_id: productId,
          quantity
        });

      if (error) throw error;
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const clearCart = async () => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', getUserId());

      if (error) throw error;
      toast.success('Panier vidé');
      await fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Erreur lors de la suppression du panier');
    }
  };

  const total = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}