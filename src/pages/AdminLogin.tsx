
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Lock } from 'lucide-react';
import { verifyAdminPassword } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      if (verifyAdminPassword(password)) {
        toast({
          title: "Login Successful",
          description: "Welcome to the Admin Panel",
        });
        
        // Store admin session in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin');
      } else {
        toast({
          title: "Login Failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-blue-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
              
              <p className="mt-4 text-xs text-center text-gray-500">
                Default password: admin123
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
