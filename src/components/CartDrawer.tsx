import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './ui/Button';
import { getImageUrl } from '../lib/supabase';
import { useSettings } from '../hooks/useSettings';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  const { settings } = useSettings();

  const handleCheckout = () => {
    const message = items
      .map(item => `${item.product.name} (x${item.quantity})`)
      .join('\n');
    
    const totalMessage = `\n\nTotal: ${new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF'
    }).format(total)}`;

    const whatsappNumber = settings?.whatsapp || '+237695959595';
    const whatsappMessage = encodeURIComponent(`Bonjour, je souhaite commander :\n${message}${totalMessage}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    onClose();
    clearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 text-gray-800 mr-2" />
              <h2 className="text-lg font-semibold">Votre Panier</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Votre panier est vide
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg border"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      {item.product.image_url ? (
                        <img
                          src={getImageUrl(item.product.image_url)}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <ShoppingCart className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-gray-600">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(item.product.price)}
                      </p>

                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-2 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat('fr-CM', {
                    style: 'currency',
                    currency: 'XAF'
                  }).format(total)}
                </span>
              </div>
              <div className="space-y-2">
                <Button
                  variant="primary"
                  isFullWidth
                  onClick={handleCheckout}
                >
                  Commander via WhatsApp
                </Button>
                <Button
                  variant="outline"
                  isFullWidth
                  onClick={clearCart}
                >
                  Vider le panier
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}