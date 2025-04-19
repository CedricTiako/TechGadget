import { Mail, Phone, MapPin, User } from 'lucide-react';

export default function DeveloperInfo() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <User className="w-10 h-10 text-[#25d366] mr-4" />
          <h1 className="text-2xl font-bold">Fiche d’identité professionnelle</h1>
        </div>
        <div className="space-y-4 text-gray-800">
          <div className="flex items-center">
            <span className="font-semibold w-32">Nom complet :</span>
            <span>Tiako Tchouameni Cedric Aime</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-[#25d366] mr-2" />
            <span className="font-semibold w-32">Téléphone :</span>
            <span>+267 677 334 686</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-[#25d366] mr-2" />
            <span className="font-semibold w-32">Email :</span>
            <span>tiako1998@gmail.com</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-[#25d366] mr-2" />
            <span className="font-semibold w-32">Lieu :</span>
            <span>Douala, Cameroun</span>
          </div>
        </div>
      </div>
    </div>
  );
}
