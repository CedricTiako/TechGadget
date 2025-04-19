import { useState } from 'react';
import { Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getImageUrl } from '../../lib/supabase';

export default function AdminProducts() {
  const { products, loading, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalProduct, setDeleteModalProduct] = useState<{ id: string, name: string } | null>(null);

  // Helper: Map des catégories pour accès rapide
  const categoryMap = Object.fromEntries(categories.map(cat => [cat.id, cat.name]));

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category_id && categoryMap[product.category_id]?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteModalProduct) return;
    
    await deleteProduct(deleteModalProduct.id);
    setDeleteModalProduct(null);
  };

  const formatPrice = (price: number) => `${price.toLocaleString('fr-CM', { minimumFractionDigits: 0 })} FCFA`;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
        <Button
          href="/admin/products/new"
          icon={<Plus size={16} />}
        >
          Ajouter un produit
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {product.image_url ? (
                            <img
                              src={getImageUrl(product.image_url)}
                              alt={product.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">N/A</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {product.category_id && categoryMap[product.category_id]
                          ? categoryMap[product.category_id]
                          : <span className="italic text-gray-400">(Non catégorisé)</span>}

                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          href={`/admin/products/${product.id}`}
                          icon={<Edit size={16} />}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900 hover:bg-red-50"
                          onClick={() => setDeleteModalProduct({ id: product.id, name: product.name })}
                          icon={<Trash2 size={16} />}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500">Aucun produit trouvé</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">Confirmer la suppression</h3>
            </div>
            <p className="mb-4 text-gray-700">
              Êtes-vous sûr de vouloir supprimer le produit{' '}
              <span className="font-semibold">{deleteModalProduct.name}</span> ?
              Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="ghost"
                onClick={() => setDeleteModalProduct(null)}
              >
                Annuler
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}