import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Button from './ui/Button';
import { getImageUrl } from '../lib/supabase';
import { useCart } from '../context/CartContext';

import { useCategories } from '../hooks/useCategories';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageUrl: string | null;
}


export default function ProductCard({ id, name, price, description, category_id, imageUrl }: ProductCardProps) {
  const { categories } = useCategories();
  const categoryName = categories.find(cat => cat.id === category_id)?.name || '(Non catégorisé)';
  const { addToCart } = useCart();
  
  const formattedPrice = `${price.toLocaleString('fr-CM', { minimumFractionDigits: 0 })} FCFA`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg">
      <div className="h-48 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={getImageUrl(imageUrl)}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center aspect-square"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Image non disponible</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full mb-2">
          {categoryName}
        </span>
        <h3 className="text-lg font-semibold mb-1 text-gray-900 line-clamp-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
          <Button
            variant="primary"
            size="sm"
            icon={<ShoppingCart size={16} />}
            onClick={() => addToCart(id)}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}