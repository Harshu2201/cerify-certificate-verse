
import { useState } from 'react';
import { Menu, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);

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
                <a href="#" className="text-lg font-medium hover:text-blue-600">Home</a>
                <a href="#certificates" className="text-lg font-medium hover:text-blue-600">Certificates</a>
                <a href="#support" className="text-lg font-medium hover:text-blue-600">Support</a>
              </nav>
            </SheetContent>
          </Sheet>
          <a href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl font-poppins bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              E-Cell MESWCOE
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-blue-600">Home</a>
          <a href="#certificates" className="text-sm font-medium hover:text-blue-600">Certificates</a>
          <a href="#support" className="text-sm font-medium hover:text-blue-600">Support</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost"
            onClick={() => setIsAdmin(!isAdmin)}
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            <span>{isAdmin ? 'Admin Mode' : 'Admin Login'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
