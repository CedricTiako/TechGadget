import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Smartphone, ShoppingCart } from 'lucide-react';
import Button from './ui/Button';
import CartDrawer from './CartDrawer';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'fr');

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Smartphone className="w-8 h-8 text-[#25d366]" />
              <span className="text-xl font-bold">{t('navbar.logo', 'TechGadget')}</span>
            </Link>

            {/* Language Selector */}
            <div className="hidden md:block mr-4">
              <select
                value={lang}
                onChange={handleLangChange}
                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#25d366]"
                aria-label={t('navbar.languageSelector', 'Sélecteur de langue')}
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => `text-base font-medium ${isActive ? 'text-[#25d366]' : 'text-gray-800 hover:text-[#25d366]'} transition-colors`}
              >
                {t('navbar.home', 'Accueil')}
              </NavLink>
              <NavLink 
                to="/catalogue" 
                className={({ isActive }) => `text-base font-medium ${isActive ? 'text-[#25d366]' : 'text-gray-800 hover:text-[#25d366]'} transition-colors`}
              >
                {t('navbar.catalog', 'Catalogue')}
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `text-base font-medium ${isActive ? 'text-[#25d366]' : 'text-gray-800 hover:text-[#25d366]'} transition-colors`}
              >
                {t('navbar.contact', 'Contact')}
              </NavLink>
            </nav>

            {/* Cart and WhatsApp Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-800 hover:text-[#25d366] transition-colors"
              >
                <ShoppingCart size={24} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#25d366] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              <Button 
                variant="primary" 
                size="md"
                href="/contact"
              >
                {t('navbar.orderWhatsapp', 'Commander via WhatsApp')}
              </Button>
            </div>

            {/* Language Selector Mobile */}
          <div className="md:hidden flex items-center">
            <select
              value={lang}
              onChange={handleLangChange}
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#25d366] mr-2"
              aria-label="Sélecteur de langue mobile"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-800 hover:text-[#25d366] transition-colors"
              >
                <ShoppingCart size={24} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#25d366] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                className="text-gray-800"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 mt-2 border-t">
              <nav className="flex flex-col space-y-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `text-base font-medium ${isActive ? 'text-[#25d366]' : 'text-gray-800'} hover:text-[#25d366] transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </NavLink>
                <NavLink 
                  to="/catalogue" 
                  className={({ isActive }) => `text-base font-medium ${isActive ? 'text-[#25d366]' : 'text-gray-800'} hover:text-[#25d366] transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Catalogue
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => `text-base font-medium ${isActive ? 'text-[#25d366]' : 'text-gray-800'} hover:text-[#25d366] transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>
                <Button 
                  variant="primary" 
                  size="sm"
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  isFullWidth
                >
                  Commander via WhatsApp
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}