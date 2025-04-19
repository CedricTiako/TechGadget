import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminSettings() {
  // Réglages admin
  const [shopName, setShopName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [language, setLanguage] = useState('fr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les réglages au montage
  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      if (error) {
        setError("Impossible de charger les paramètres.");
      } else if (data) {
        setShopName(data.shop_name || '');
        setContactEmail(data.contact_email || '');
        setWhatsapp(data.whatsapp || '');
        setAddress(data.address || '');
        setLanguage(data.language || 'fr');
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  // Sauvegarder les réglages
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    // On suppose qu'il n'y a qu'une seule ligne dans 'settings'.
    const { error } = await supabase
      .from('settings')
      .update({
        shop_name: shopName,
        contact_email: contactEmail,
        whatsapp,
        address,
        language,
      })
      .eq('id', 1); // id=1 pour la ligne unique
    setSaving(false);
    if (error) {
      setError("Erreur lors de la sauvegarde des paramètres.");
    } else {
      alert('Paramètres enregistrés !');
    }
  };


  if (loading) {
    return <div className="text-center py-12">Chargement des paramètres...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Paramètres de la boutique</h2>
      {error && (
        <div className="mb-4 text-red-600 text-sm">{error}</div>
      )}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom de la boutique</label>
          <input
            type="text"
            value={shopName}
            onChange={e => setShopName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email de contact</label>
          <input
            type="email"
            value={contactEmail}
            onChange={e => setContactEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Numéro WhatsApp</label>
          <input
            type="text"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adresse</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Langue principale</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#25d366] text-white px-4 py-2 rounded hover:bg-[#1da851] disabled:opacity-60"
          disabled={saving}
        >
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}
