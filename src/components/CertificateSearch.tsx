
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export const CertificateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    // Simulate search
    setTimeout(() => {
      setSearching(false);
    }, 1500);
  };

  return (
    <Card className="p-6 w-full max-w-lg mx-auto backdrop-blur-xl bg-white/50 border border-gray-200">
      <h2 className="text-2xl font-bold font-poppins text-center mb-6">
        Find Your Certificate
      </h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your name or token"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
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
    </Card>
  );
};
