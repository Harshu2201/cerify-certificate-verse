
import { Mail, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">Home</Link></li>
              <li><Link to="/certificates" className="text-gray-600 hover:text-blue-600 text-sm">Certificates</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-blue-600 text-sm">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:ecellmeswcoe@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm">
                <Mail className="h-4 w-4" />
                ecellmeswcoe@gmail.com
              </a>
              <a 
                href="https://chat.whatsapp.com/B9khcm1zUf6DcK8C2GKFur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
              >
                <MessageSquare className="h-4 w-4" />
                Community Link
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/meswcoe_e_cell?igsh=MWg0a2ptaXkzYXNqOA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/meswcoe-e-cell/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-600 text-sm">
          <div>© {new Date().getFullYear()} E-Cell MESWCOE. All rights reserved.</div>
          <div className="mt-2">
            Website developed by{" "}
            <a 
              href="https://www.linkedin.com/in/harshad-pakhale-221hp?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              Harshad Harishchandra Pakhale
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
