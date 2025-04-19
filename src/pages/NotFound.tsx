import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-[#25d366]">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(-1)}>Retour</Button>
          <Button variant="outline" href="/">
            Aller à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}