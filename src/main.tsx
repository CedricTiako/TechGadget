import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
import './i18n';

// SEO
const defaultTitle = 'TechGadget Cameroun - Boutique High-Tech';
document.title = defaultTitle;
const metaDesc = document.createElement('meta');
metaDesc.name = 'description';
metaDesc.content = "TechGadget - Boutique en ligne d'appareils électroniques, smartphones et accessoires au Cameroun. Livraison rapide, paiement sécurisé.";
document.head.appendChild(metaDesc);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  </StrictMode>
);