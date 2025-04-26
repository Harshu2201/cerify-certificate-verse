
import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addIssue } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newIssue = {
      id: uuidv4(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      resolved: false
    };
    
    // Simulate network delay
    setTimeout(() => {
      addIssue(newIssue);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Enquiry Submitted",
        description: "Thank you for your enquiry. We'll get back to you soon!",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1929] text-blue-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-2 text-blue-200 text-glow">
              Need Help?
            </h1>
            <p className="text-center text-blue-300 mb-10">
              Submit your enquiry and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="bg-[#2A3241]/50 rounded-lg shadow-md p-6 md:p-8 border border-blue-400/20 backdrop-blur-sm">
            {isSubmitted ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-16 text-center"
              >
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-green-300 mb-2">Thank You!</h2>
                <p className="text-blue-200 mb-4">Your enquiry has been submitted successfully.</p>
                <p className="text-blue-300 text-sm">We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base text-blue-200">Your Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 tech-input text-blue-100 placeholder-blue-400" 
                      placeholder="Enter your name"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base text-blue-200">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 tech-input text-blue-100 placeholder-blue-400" 
                      placeholder="Enter your email"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-base text-blue-200">Subject</Label>
                  <Input 
                    id="subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-11 tech-input text-blue-100 placeholder-blue-400" 
                    placeholder="Enter subject"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base text-blue-200">Your Message</Label>
                  <Textarea 
                    id="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6} 
                    className="tech-input text-blue-100 placeholder-blue-400"
                    placeholder="Enter your message"
                    required 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600/80 to-blue-400/80 hover:from-blue-700 hover:to-blue-500 h-11 text-base text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Enquiry'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;

