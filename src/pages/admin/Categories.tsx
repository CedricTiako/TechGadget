import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';

export default function CategoriesAdmin() {
  const { categories, loading, error, addCategory, updateCategory, deleteCategory } = useCategories();
  const [newCategory, setNewCategory] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setFormError('Le nom est requis');
      return;
    }
    try {
      await addCategory(newCategory.trim(), newImageUrl.trim());
      setNewCategory('');
      setNewImageUrl('');
      setFormError(null);
    } catch (err: any) {
      setFormError(err.message || 'Erreur lors de l\'ajout');
    }
  };

  const handleEdit = (catId: string, name: string, imageUrl?: string) => {
    setEditId(catId);
    setEditName(name);
    setEditImageUrl(imageUrl || '');
    setFormError(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setFormError('Le nom est requis');
      return;
    }
    try {
      await updateCategory(editId!, editName.trim(), editImageUrl.trim());
      setEditId(null);
      setEditName('');
      setEditImageUrl('');
      setFormError(null);
    } catch (err: any) {
      setFormError(err.message || 'Erreur lors de la modification');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Supprimer cette catégorie ?')) {
      try {
        await deleteCategory(id);
      } catch (err: any) {
        alert(err.message || 'Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des catégories</h1>
      <form className="flex flex-col gap-2 mb-6" onSubmit={handleAdd}>
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="URL de l'image (optionnel)"
          value={newImageUrl}
          onChange={e => setNewImageUrl(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded self-end" type="submit">
          Ajouter
        </button>
      </form>
      {formError && <div className="text-red-500 mb-2">{formError}</div>}
      {loading ? (
        <div>Chargement...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="divide-y">
          {categories.map(cat => (
            <li key={cat.id} className="py-2 flex items-center justify-between">
              {editId === cat.id ? (
                <form className="flex flex-col gap-2 flex-1" onSubmit={handleUpdate}>
                  <input
                    className="border rounded px-2 py-1 flex-1"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                  <input
                    className="border rounded px-2 py-1 flex-1"
                    placeholder="URL de l'image (optionnel)"
                    value={editImageUrl}
                    onChange={e => setEditImageUrl(e.target.value)}
                  />
                  <div className="flex gap-2 mt-1">
                    <button className="bg-green-600 text-white px-3 py-1 rounded" type="submit">
                      Sauver
                    </button>
                    <button className="bg-gray-400 text-white px-3 py-1 rounded" type="button" onClick={() => setEditId(null)}>
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    {cat.image_url && (
                      <img src={cat.image_url} alt={cat.name} className="w-8 h-8 rounded-full object-cover border" />
                    )}
                    <img
                      src={cat.image_url ? cat.image_url : require('../../assets/default-category.png')}
                      alt={cat.name}
                      className="w-10 h-10 rounded-full object-cover object-center aspect-square mr-2 border"
                    />
                    <span>{cat.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEdit(cat.id, cat.name, cat.image_url)}>
                      Modifier
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(cat.id)}>
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
