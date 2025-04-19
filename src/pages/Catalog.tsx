import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import type { Product } from '../hooks/useProducts';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import SEO from '../components/SEO';

export default function Catalog() {
  const { t } = useTranslation();
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Get category from URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    // Apply filters
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category_id === selectedCategory);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    
    if (category === selectedCategory) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in the useEffect
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSearchParams({});
  };

  return (
    <>
      <SEO
        title={t('catalog.seoTitle', 'Catalogue TechGadget - Produits high-tech au Cameroun')}
        description={t('catalog.seoDescription', 'Découvrez notre catalogue de smartphones, accessoires et gadgets électroniques livrés partout au Cameroun.')}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('catalog.title', 'Catalogue des Produits')}</h1>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-grow"
          >
            <div className="relative">
              <Input
                type="text"
                placeholder={t('catalog.searchPlaceholder', 'Rechercher un produit...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </form>

          {/* Mobile Filter Button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              icon={<Filter size={18} />}
              isFullWidth
            >
              {t('catalog.filters', 'Filtres')}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{t('catalog.categories', 'Catégories')}</h3>
              {(selectedCategory) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#25d366] hover:underline"
                >
                  {t('catalog.reset', 'Réinitialiser')}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`px-4 py-2 rounded-full mr-2 mb-2 border transition-colors duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-[#25d366] text-white border-[#25d366]'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              category_id={product.category_id || ''}
              imageUrl={product.image_url}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">
            {t('catalog.noResults', 'Aucun produit trouvé pour votre recherche.')}
          </p>
          <Button variant="outline" onClick={resetFilters}>
            {t('catalog.resetFilters', 'Réinitialiser les filtres')}
          </Button>
        </div>
      )}
    </div>
    </>
  );
}