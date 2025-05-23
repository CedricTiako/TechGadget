import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../hooks/useSettings';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const { settings } = useSettings();

  const openWhatsApp = () => {
    const defaultMessage = encodeURIComponent('Bonjour, je suis intéressé(e) par vos produits.');
    const whatsappNumber = settings?.whatsapp || '+237612345678';
    window.open(`https://wa.me/${whatsappNumber}?text=${defaultMessage}`, '_blank');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just log it to the console
    console.log({ name, email, message });
    
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    
    // Show success message
    alert('Votre message a été envoyé avec succès !');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('contact.title', 'Contactez-nous')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('contact.infoTitle', 'Informations de Contact')}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-[#25d366] mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  {t('contact.address', '123 Rue Commerce')}<br />
                  {t('contact.city', '75000 Paris, France')}
                </p>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-[#25d366] mr-3 flex-shrink-0" />
                <p className="text-gray-700">{t('contact.phone', '+33 1 23 45 67 89')}</p>
              </div>
              
              <div className="flex items-center">
                <Mail className="text-[#25d366] mr-3 flex-shrink-0" />
                <p className="text-gray-700">{t('contact.email', 'contact@techgadget.com')}</p>
              </div>
            </div>
          </div>
          
          {/* WhatsApp Contact Box */}
          <div className="bg-[#25d366] text-white rounded-lg shadow-md p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="mr-2" />
                {t('contact.orderWhatsapp', 'Commander via WhatsApp')}
              </h2>
              
              <p className="mb-6">
                {t('contact.whatsappDescription', 'Contactez-nous directement via WhatsApp pour une réponse rapide et un service personnalisé.')}
              </p>
              
              <Button 
                variant="secondary"
                onClick={openWhatsApp}
              >
                {t('contact.startConversation', 'Démarrer une conversation')}
              </Button>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 opacity-10 w-64 h-64">
              <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Envoyez-nous un message</h2>
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Nom"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            
            <TextArea
              label="Message"
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              fullWidth
            />
            
            <Button 
              type="submit" 
              variant="primary"
              icon={<Send size={16} />}
              className="mt-2"
            >
              Envoyer
            </Button>
          </form>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-12 max-w-6xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167998.1089848037!2d2.2069777!3d48.85883780000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}