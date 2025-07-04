
import { MapPin, Mail, Phone } from "lucide-react";

const ProfileSection = () => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-600">JD</span>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">John Doe</h1>
          <p className="text-xl text-gray-600 mb-4">Full Stack Developer</p>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York, NY</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>john@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
