import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export type Product = {
  id: string;
  created_at: string;
  name: string;
  price: number;
  description: string;
  category_id: string | null;
  image_url: string | null;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Une erreur est survenue lors du chargement des produits');
      toast.error('Erreur de chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      toast.error('Erreur de chargement du produit');
      return null;
    }
  };

  const createProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Produit ajouté avec succès');
      await fetchProducts();
      return data;
    } catch (err) {
      console.error('Error creating product:', err);
      toast.error('Erreur lors de la création du produit');
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Produit mis à jour avec succès');
      await fetchProducts();
      return data;
    } catch (err) {
      console.error('Error updating product:', err);
      toast.error('Erreur lors de la mise à jour du produit');
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Produit supprimé avec succès');
      await fetchProducts();
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Erreur lors de la suppression du produit');
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}