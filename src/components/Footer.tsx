
import { Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-poppins font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              E-Cell MESWCOE
            </h3>
            <p className="text-gray-600 text-sm">
              Empowering future entrepreneurs through innovation and education.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Home</a></li>
              <li><a href="#certificates" className="text-gray-600 hover:text-blue-600 text-sm">Certificates</a></li>
              <li><a href="#support" className="text-gray-600 hover:text-blue-600 text-sm">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:info@ecell.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm">
                <Mail className="h-4 w-4" />
                info@ecell.com
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} E-Cell MESWCOE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
