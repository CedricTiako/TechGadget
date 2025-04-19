import { useState, useEffect } from 'react';
import defaultCategoryImg from '../../assets/default-category.png';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image, Loader } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import { useProducts } from '../../hooks/useProducts';
import { uploadProductImage, getImageUrl } from '../../lib/supabase';

import { useCategories } from '../../hooks/useCategories';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, createProduct, updateProduct } = useProducts();
  const { categories, addCategory } = useCategories();

  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!id;

  const fetchProduct = async () => {
    if (id) {
      setLoading(true);
      const productData = await getProduct(id);
      if (productData) {
        setProduct({
          name: productData.name,
          price: productData.price.toString(),
          description: productData.description,
          category_id: productData.category_id || '',
          image_url: productData.image_url || '',
        });
        if (productData.image_url) {
          setImagePreview(getImageUrl(productData.image_url));
        }
        setLoading(false);
      }
    }
  };

  // Optimisation simple : fetchProduct appelé uniquement si l'ID change
  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct();
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!product.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!product.price) {
      newErrors.price = 'Le prix est requis';
    } else if (isNaN(Number(product.price)) || Number(product.price) <= 0) {
      newErrors.price = 'Le prix doit être un nombre positif';
    }
    
    if (!product.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    if (!product.category_id.trim()) {
      newErrors.category_id = 'La catégorie est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      let imageUrl = product.image_url;
      
      // Upload image if a new one is selected
      if (imageFile) {
        const productId = id || Date.now().toString();
        imageUrl = await uploadProductImage(imageFile, productId);
      }
      
      const payload = {
        name: product.name,
        price: parseFloat(product.price),
        description: product.description,
        category_id: product.category_id || null,
        image_url: imageUrl,
      };
      
      if (isEditMode && id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/products')}
          icon={<ArrowLeft size={16} />}
          className="mr-4"
        >
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Modifier le produit' : 'Ajouter un produit'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Nom du produit"
                id="name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                fullWidth
                error={errors.name}
              />
              
              <Input
                label="Prix (FCFA)"
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                fullWidth
                error={errors.price}
              />
              
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                id="category"
                value={product.category_id || ''}
                onChange={(e) => {
                  if (e.target.value === "__new__") {
                    setShowNewCategoryInput(true);
                    setNewCategoryName("");
                  } else {
                    setShowNewCategoryInput(false);
                    setProduct({ ...product, category_id: e.target.value });
                  }
                }}
                className={`w-full border rounded px-3 py-2 mb-2 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Sélectionnez une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
                <option value="__new__">Ajouter une nouvelle catégorie...</option>
              </select>
              {addCategoryError && (
                <div className="text-red-500 text-sm mt-1">{addCategoryError}</div>
              )}
              {showNewCategoryInput && (
                <>
                  <Input
                    label="Nouvelle catégorie"
                    id="new-category"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    fullWidth
                    helperText="Ex: Casques, Chargeurs, Câbles, etc."
                    error={addCategoryError || undefined}
                  />
                  <Button
                    type="button"
                    variant="primary"
                    className="mt-2"
                    disabled={addingCategory || !newCategoryName.trim()}
                    onClick={async () => {
                      setAddingCategory(true);
                      setAddCategoryError(null);
                      try {
                        const cat = await addCategory(newCategoryName.trim());
                        setProduct(prev => ({ ...prev, category_id: cat.id }));
                        setShowNewCategoryInput(false);
                        setNewCategoryName('');
                      } catch (err) {
                        setAddCategoryError('Erreur lors de l’ajout de la catégorie');
                      } finally {
                        setAddingCategory(false);
                      }
                    }}
                  >
                    {addingCategory ? 'Ajout...' : 'Ajouter'}
                  </Button>
                </>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image du produit
                </label>
                
                <div className="mt-1 flex items-center">
                  <div className="w-20 h-20 border border-gray-300 rounded-md overflow-hidden bg-gray-100 mr-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Choisir une image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <TextArea
                label="Description"
                id="description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                rows={8}
                fullWidth
                error={errors.description}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
              className="mr-4"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              icon={loading ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper component for loading state when fetching product
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader className="animate-spin h-8 w-8 text-[#25d366]" />
      <span className="ml-2 text-gray-600">Chargement...</span>
    </div>
  );
}