import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import { ViewState, Property, SiteSettings } from './types';
import { Target, Eye, Shield, Users, Globe, Heart } from 'lucide-react';
import { db } from './services/dataService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [properties, setProperties] = useState<Property[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | undefined>(undefined);

  // Load data from the Data Service (Database Simulation)
  useEffect(() => {
    const loadData = async () => {
      const props = await db.getProperties();
      const settings = await db.getSettings();
      setProperties(props);
      setSiteSettings(settings);
    };

    loadData();

    // Subscribe to DB changes (Real-time updates across components)
    const unsubscribe = db.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case ViewState.ADMIN:
        return (
          <Admin setView={setCurrentView} />
        );
      case ViewState.HOME:
        return <Home setView={setCurrentView} properties={properties} settings={siteSettings} />;
      case ViewState.PROJECTS:
        return <Projects properties={properties} />;
      case ViewState.CONTACT:
        return <Contact />;
      case ViewState.TESTIMONIALS:
        return <Testimonials settings={siteSettings} />;
      case ViewState.BLOG:
        return <Blog />;
      case ViewState.ABOUT:
        return (
          <div className="animate-fade-in bg-gray-50 pb-20">
            {/* About Header */}
            <div className="bg-green-900 text-white py-20 text-center">
               <div className="container mx-auto px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">About Model Land Investment</h1>
                  <p className="text-xl text-green-100 max-w-3xl mx-auto">Launched in 2020 on a mission to enrich the quality of every person’s life that we touch.</p>
               </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
               <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Who We Are</h2>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/2">
                       <p className="text-gray-600 leading-relaxed mb-4">
                         Model Land is a premier real estate company launched in 2020 in Kenya. We connect the latest in technology by developing innovative digital tools to enhance the sales process.
                       </p>
                       <p className="text-gray-600 leading-relaxed">
                         Our reputation within the real estate industry in Kenya is impeccable. We maintain open communication around the clock and a high level of responsiveness to our clients throughout the transaction process and beyond.
                       </p>
                    </div>
                    <div className="md:w-1/2">
                       <img 
                         src={siteSettings?.aboutImageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa"} 
                         onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                         alt="Our Team" 
                         className="rounded-lg shadow-md w-full object-cover h-[300px] md:h-[400px]" 
                       />
                    </div>
                  </div>
               </div>

               {/* Mission & Vision */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-green-600 hover:-translate-y-1 transition-transform duration-300">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                          <Target size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                     </div>
                     <p className="text-gray-600">
                       To provide affordable, secure, and accessible land solutions, empowering Kenyans to achieve their dream of property ownership.
                     </p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#FF2C2C] hover:-translate-y-1 transition-transform duration-300">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#FF2C2C]/10 text-[#FF2C2C] rounded-full flex items-center justify-center">
                          <Eye size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                     </div>
                     <p className="text-gray-600">
                       To build a reputation as Kenya’s most trusted real estate partner, offering transparent and secure land ownership journeys.
                     </p>
                  </div>
               </div>

               {/* Core Values */}
               <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                     <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Shield size={28} />
                     </div>
                     <h4 className="text-xl font-bold text-gray-800 mb-2">Integrity</h4>
                     <p className="text-sm text-gray-600">We prioritize honesty and transparency in all our dealings, ensuring trust and fairness.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                     <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Users size={28} />
                     </div>
                     <h4 className="text-xl font-bold text-gray-800 mb-2">Customer Centric</h4>
                     <p className="text-sm text-gray-600">Dedicated to understanding and fulfilling our clients’ needs with personalized support.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                     <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Globe size={28} />
                     </div>
                     <h4 className="text-xl font-bold text-gray-800 mb-2">Sustainability</h4>
                     <p className="text-sm text-gray-600">Committed to responsible land use and eco-friendly practices for future generations.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                     <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Heart size={28} />
                     </div>
                     <h4 className="text-xl font-bold text-gray-800 mb-2">Empowerment</h4>
                     <p className="text-sm text-gray-600">Contributing to the growth of local communities by facilitating ownership and development.</p>
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return <Home setView={setCurrentView} properties={properties} settings={siteSettings} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {currentView !== ViewState.ADMIN && (
        <Header currentView={currentView} setView={setCurrentView} settings={siteSettings} />
      )}
      <main className="flex-grow">
        {renderView()}
      </main>
      {currentView !== ViewState.ADMIN && (
        <>
          <ChatAssistant properties={properties} settings={siteSettings} />
          <Footer setView={setCurrentView} settings={siteSettings} />
        </>
      )}
    </div>
  );
};

export default App;