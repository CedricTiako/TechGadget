import { Link, useLocation } from 'react-router-dom';
import { Package, Settings, LogOut, Home, Smartphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      name: 'Produits',
      icon: <Package size={20} />,
      path: '/admin/products',
    },
    {
      name: 'Catégories',
      icon: <Settings size={20} />, // Tu peux changer l’icône si tu veux
      path: '/admin/categories',
    },
    {
      name: 'Paramètres',
      icon: <Settings size={20} />,
      path: '/admin/settings',
    },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen sticky top-0 hidden md:block">
      <div className="p-4">
        <div className="flex items-center mb-8 mt-4">
          <Smartphone className="w-8 h-8 text-[#25d366] mr-2" />
          <h1 className="text-xl font-bold">TechGadget Admin</h1>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-gray-700 text-[#25d366]'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          <Link
            to="/"
            className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
            target="_blank"
          >
            <span className="mr-3">
              <Home size={20} />
            </span>
            <span>Voir le site</span>
          </Link>

          <button
            onClick={() => signOut()}
            className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors w-full text-left"
          >
            <span className="mr-3">
              <LogOut size={20} />
            </span>
            <span>Se déconnecter</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}