import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MobileAdminMenu from './MobileAdminMenu';

export default function AdminHeader() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/products') {
      return 'Gestion des Produits';
    } else if (path.includes('/admin/products/new')) {
      return 'Ajouter un Produit';
    } else if (path.includes('/admin/products/')) {
      return 'Modifier un Produit';
    } else if (path === '/admin/settings') {
      return 'Paramètres';
    }
    return 'Dashboard';
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="mr-4 md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex items-center">
          <span className="text-sm text-gray-600 mr-2">
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-700 hover:text-[#25d366]"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <MobileAdminMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}