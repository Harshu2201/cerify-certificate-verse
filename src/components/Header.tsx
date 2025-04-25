
import { useState, useEffect } from 'react';
import { Menu, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdmin(adminLoggedIn);
  }, []);

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/admin-login');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-lg font-medium hover:text-blue-600">Home</Link>
                <Link to="/support" className="text-lg font-medium hover:text-blue-600">Support</Link>
                {isAdmin && (
                  <Link to="/admin" className="text-lg font-medium hover:text-blue-600">Admin Panel</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl font-poppins bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              E-Cell MESWCOE
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
          <Link to="/support" className="text-sm font-medium hover:text-blue-600">Support</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost"
            onClick={handleAdminClick}
            className="flex items-center gap-2 transition-all hover:bg-blue-50"
          >
            <LogIn className="h-4 w-4" />
            <span>{isAdmin ? 'Admin Panel' : 'Admin Login'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
