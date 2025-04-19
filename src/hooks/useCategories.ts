import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Category {
  id: string;
  name: string;
  image_url?: string | null;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    if (error) {
      setError('Erreur lors du chargement des catégories');
      setCategories([]);
    } else {
      setCategories(data || []);
      setError(null);
    }
    setLoading(false);
  };

  // Add a new category
  const addCategory = async (name: string) => {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select()
      .single();
    if (error) throw error;
    await fetchCategories();
    return data as Category;
  };

  // Update a category
  const updateCategory = async (id: string, name: string) => {
    const { error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id);
    if (error) throw error;
    await fetchCategories();
  };

  // Delete a category
  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
