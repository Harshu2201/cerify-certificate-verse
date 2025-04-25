
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CertificateSearch } from "@/components/CertificateSearch";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
          <div className="container relative z-10 px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Certificate Distribution Portal
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Easily access and verify your certificates from E-Cell MESWCOE events and programs.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                >
                  Find Certificate
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Search",
                  description: "Enter your name or unique token to find your certificate"
                },
                {
                  title: "Verify",
                  description: "Confirm your identity and certificate details"
                },
                {
                  title: "Download",
                  description: "Get instant access to your certified achievements"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
