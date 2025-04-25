
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertificateSearch } from "@/components/CertificateSearch";
import { motion } from 'framer-motion';

const Certificates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Certificate Verification
              </h1>
              <p className="text-lg text-gray-600">
                Enter your name or unique token to retrieve your certificate
              </p>
            </motion.div>
            
            <CertificateSearch />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Certificates;
