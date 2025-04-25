
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertificateSearch } from "@/components/CertificateSearch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, Terminal } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1A1F2C] to-[#2A3241]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1F2C]/50 backdrop-blur-sm z-0" />
          <div className="container relative z-10 px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="flex justify-center mb-6">
                <Shield className="w-16 h-16 text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Secure Certificate Distribution Portal
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Access and verify your certificates with enhanced security features.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                  asChild
                >
                  <Link to="/certificates">
                    <Lock className="mr-2 h-4 w-4" />
                    Access Certificate
                  </Link>
                </Button>
                <Button variant="outline" className="border-blue-400/30 text-blue-100 hover:bg-blue-400/10" asChild>
                  <Link to="/support">
                    <Terminal className="mr-2 h-4 w-4" />
                    Technical Support
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            {/* Certificate Search */}
            <CertificateSearch />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-[#1A1F2C]/80 backdrop-blur-sm">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold font-poppins text-center mb-12 text-blue-100">
              Secure Verification Process
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
                  title: "Encrypted Search",
                  icon: <Lock className="h-10 w-10 text-blue-400 mb-4" />,
                  description: "Enter your credentials securely to access your certificate"
                },
                {
                  title: "Verify",
                  icon: <Shield className="h-10 w-10 text-blue-400 mb-4" />,
                  description: "Advanced verification system ensures certificate authenticity"
                },
                {
                  title: "Secure Access",
                  icon: <Terminal className="h-10 w-10 text-blue-400 mb-4" />,
                  description: "Download your certified achievements with encryption"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="text-center p-6 rounded-lg bg-[#2A3241]/50 hover:bg-[#2A3241]/80 backdrop-blur-sm border border-blue-400/10 transition-all duration-300"
                >
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-100">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
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
