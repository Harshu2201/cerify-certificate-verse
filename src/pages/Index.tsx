
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertificateSearch } from "@/components/CertificateSearch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Upload, MessageSquare } from "lucide-react";

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
          <div className="container relative z-10 px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Certificate Distribution Portal
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Easily access and verify your certificates from E-Cell MESWCOE events and programs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                  asChild
                >
                  <Link to="/certificates">
                    <Search className="mr-2 h-4 w-4" />
                    Find Certificate
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/support">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Support
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            {/* Certificate Search */}
            <CertificateSearch />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold font-poppins text-center mb-12">
              How It Works
            </h2>
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Search",
                  icon: <Search className="h-10 w-10 text-blue-500 mb-4" />,
                  description: "Enter your name or unique token to find your certificate"
                },
                {
                  title: "Verify",
                  icon: <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>,
                  description: "Confirm your identity and certificate details"
                },
                {
                  title: "Download",
                  icon: <Upload className="h-10 w-10 text-blue-500 mb-4 transform rotate-180" />,
                  description: "Get instant access to your certified achievements"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow hover:bg-blue-50"
                >
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
