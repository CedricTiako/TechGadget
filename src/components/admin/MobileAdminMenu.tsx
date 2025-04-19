import { Package, Settings, LogOut, Home, X, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileAdminMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function MobileAdminMenu({ isOpen, onClose, onLogout }: MobileAdminMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    {
      name: 'Produits',
      icon: <Package size={20} />,
      path: '/admin/products',
    },
    {
      name: 'Paramètres',
      icon: <Settings size={20} />,
      path: '/admin/settings',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 md:hidden">
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8 mt-4">
            <div className="flex items-center">
              <Smartphone className="w-7 h-7 text-[#25d366] mr-2" />
              <h1 className="text-xl font-bold">TechGadget</h1>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                onClick={onClose}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            <Link
              to="/"
              className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
              target="_blank"
              onClick={onClose}
            >
              <span className="mr-3">
                <Home size={20} />
              </span>
              <span>Voir le site</span>
            </Link>

            <button
              onClick={onLogout}
              className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors w-full text-left"
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              <span>Se déconnecter</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}