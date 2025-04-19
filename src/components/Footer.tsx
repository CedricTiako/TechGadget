import { Link } from 'react-router-dom';
import { Smartphone, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings, loading } = useSettings();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Smartphone className="w-7 h-7 text-[#25d366] mr-2" />
              <span className="text-xl font-bold">TechGadget</span>
            </div>
            <p className="text-gray-400 mb-4">
              Le meilleur choix pour vos accessoires électroniques de qualité.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#25d366] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#25d366] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#25d366] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#25d366] transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/catalogue" className="text-gray-400 hover:text-[#25d366] transition-colors">Catalogue</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#25d366] transition-colors">Contact</Link>
              </li>
              <li>
                <a href="/developer" className="text-gray-400 hover:text-[#25d366] transition-colors">Développeur du site</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#25d366] transition-colors">Conditions Générales</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#25d366] transition-colors">Politique de Confidentialité</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#25d366] mr-2 mt-0.5" />
                <span className="text-gray-400">
                  {loading ? 'Chargement…' : settings?.address || 'Adresse non configurée'}
                </span>
              </li>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faq" className="text-[#25d366] hover:underline font-semibold">FAQ</Link>
                </li>
              </ul>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#25d366] mr-2" />
                <span className="text-gray-400">
                  {loading ? 'Chargement…' : settings?.whatsapp || 'Téléphone non configuré'}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#25d366] mr-2" />
                <span className="text-gray-400">
                  {loading ? 'Chargement…' : settings?.contact_email || 'Email non configuré'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} TechGadget. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}