import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';

export default function CategoriesAdmin() {
  const { categories, loading, error, addCategory, updateCategory, deleteCategory } = useCategories();
  const [newCategory, setNewCategory] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setFormError('Le nom est requis');
      return;
    }
    try {
      await addCategory(newCategory.trim());
      setNewCategory('');
      setFormError(null);
    } catch (err: any) {
      setFormError(err.message || 'Erreur lors de l\'ajout');
    }
  };

  const handleEdit = (catId: string, name: string) => {
    setEditId(catId);
    setEditName(name);
    setFormError(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setFormError('Le nom est requis');
      return;
    }
    try {
      await updateCategory(editId!, editName.trim());
      setEditId(null);
      setEditName('');
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
      <form className="flex gap-2 mb-6" onSubmit={handleAdd}>
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
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
                <form className="flex gap-2 flex-1" onSubmit={handleUpdate}>
                  <input
                    className="border rounded px-2 py-1 flex-1"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                  <button className="bg-green-600 text-white px-3 py-1 rounded" type="submit">
                    Sauver
                  </button>
                  <button className="bg-gray-400 text-white px-3 py-1 rounded" type="button" onClick={() => setEditId(null)}>
                    Annuler
                  </button>
                </form>
              ) : (
                <>
                  <span>{cat.name}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEdit(cat.id, cat.name)}>
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
