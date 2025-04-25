import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { searchCertificateByName, searchCertificateByToken } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export const CertificateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [certificate, setCertificate] = useState<any>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search field is empty",
        description: "Please enter your name or token",
        variant: "destructive",
      });
      return;
    }

    setSearching(true);
    setCertificate(null);
    setShowCertificate(false);
    
    // Simulate network delay
    setTimeout(() => {
      // Try to find by token first (exact match)
      let foundCertificate = searchCertificateByToken(searchQuery);
      
      // If not found, try by name (partial match)
      if (!foundCertificate) {
        foundCertificate = searchCertificateByName(searchQuery);
      }
      
      if (foundCertificate) {
        setCertificate(foundCertificate);
        setTimeout(() => {
          setShowCertificate(true);
          // Show confetti on successful certificate find
          showConfetti();
        }, 300);
        toast({
          title: "Certificate found!",
          description: "Your certificate has been located successfully.",
        });
      } else {
        // Shake animation handled by CSS when certificate is null
        toast({
          title: "Certificate not found",
          description: "We couldn't find a certificate with that name or token. Please check your details and try again.",
          variant: "destructive",
        });
      }
      
      setSearching(false);
    }, 1500);
  };

  const showConfetti = () => {
    // Simple confetti effect
    const colors = ['#2A6BFF', '#FFD700', '#FF5733', '#33FF57', '#FF33F5'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      confetti.style.opacity = (Math.random() * 0.5 + 0.5).toString();
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 5000);
    }
  };
  
  return (
    <Card className="tech-card p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold font-poppins text-center mb-6 text-glow text-blue-100">
        Find Your Certificate
      </h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your name or token"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tech-input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
        </div>
        <Button
          type="submit"
          className="w-full tech-gradient"
          disabled={searching}
        >
          {searching ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              <span>Searching...</span>
            </div>
          ) : (
            'Search Certificate'
          )}
        </Button>
      </form>
      
      {certificate && (
        <motion.div 
          initial={{ rotateY: 90, opacity: 0 }}
          animate={showCertificate ? { rotateY: 0, opacity: 1 } : { rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 perspective-1000"
        >
          <CardContent className="tech-card bg-gradient-to-r from-[#1A1F2C] to-[#2A3241] p-6">
            <h3 className="text-xl font-semibold text-center mb-4 text-blue-100">{certificate.name}</h3>
            <div className="space-y-2 text-sm text-blue-100">
              <div className="flex justify-between">
                <span className="font-medium">Event:</span>
                <span>{certificate.event}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Token:</span>
                <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">{certificate.token}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Issue Date:</span>
                <span>{certificate.issueDate}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-3">
              <Button
                onClick={() => window.open(certificate.certificateUrl, '_blank')}
                className="w-full tech-gradient"
                size="sm"
              >
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </motion.div>
      )}
    </Card>
  );
};
