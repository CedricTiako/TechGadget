import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Settings {
  shop_name: string;
  contact_email: string;
  whatsapp: string;
  address: string;
  language: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      if (error) {
        setError('Impossible de charger les paramètres.');
      } else if (data) {
        setSettings(data);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  return { settings, loading, error };
}
