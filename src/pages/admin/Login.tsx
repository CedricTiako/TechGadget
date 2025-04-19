import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, LogIn } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError('Identifiants invalides. Veuillez réessayer.');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Smartphone className="w-10 h-10 text-[#25d366]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">TechGadget Admin</h1>
          <p className="text-gray-600 mt-1">Connectez-vous à votre compte</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />
          
          <Input
            label="Mot de passe"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />
          
          <Button
            type="submit"
            isFullWidth
            disabled={loading}
            className="mt-4"
            icon={loading ? <LoadingSpinner size="sm" color="white" /> : <LogIn size={16} />}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-[#25d366] hover:underline">
            Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}