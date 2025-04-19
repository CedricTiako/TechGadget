import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import type { Product } from '../hooks/useProducts';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Home() {
  const { t } = useTranslation();
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      // Get random 4 products for featured section
      const randomProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      
      setFeaturedProducts(randomProducts);
    }
  }, [products]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('home.heroTitle', 'Les meilleurs accessoires électroniques')}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-300">
                {t('home.heroSubtitle', "Découvrez notre collection d'accessoires de haute qualité pour tous vos appareils.")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/catalogue" size="lg">
                  {t('home.viewCatalog', 'Voir le catalogue')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href="/contact"
                  icon={<ShoppingCart size={20} />}
                >
                  {t('home.orderWhatsapp', 'Commander via WhatsApp')}
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Accessoires électroniques"
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('home.featuredProducts', 'Produits en vedette')}</h2>
            <Button
              variant="ghost"
              href="/catalogue"
              icon={<ChevronRight size={16} className="ml-1" />}
              className="text-[#25d366]"
            >
              {t('home.viewAll', 'Voir tout')}
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
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
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Nos Catégories
          </h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((cat) => (
                <div key={cat.id} className="relative rounded-lg overflow-hidden shadow-lg group">
                  <img
                    src={cat.image_url || '/default-category.jpg'}
                    alt={cat.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                      <Button
                        variant="primary"
                        size="sm"
                        href={`/catalogue?category=${cat.id}`}
                        className="mt-2"
                      >
                        Découvrir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Pourquoi nous choisir ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
              <p className="text-gray-600">
                Tous nos produits sont soigneusement sélectionnés pour garantir une qualité exceptionnelle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">
                Nous garantissons une livraison rapide et sécurisée pour tous vos achats.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Réactif</h3>
              <p className="text-gray-600">
                Notre équipe de support est disponible pour répondre à toutes vos questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#25d366]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à découvrir nos produits ?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Explorez notre catalogue complet et trouvez les accessoires parfaits pour vos appareils électroniques.
          </p>
          <Button
            variant="secondary"
            size="lg"
            href="/catalogue"
          >
            Voir notre catalogue
          </Button>
        </div>
      </section>
    </div>
  );
}