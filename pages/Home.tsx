import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Award, Users, ThumbsUp } from 'lucide-react';
import Button from '../components/Button';
import PropertyCard from '../components/PropertyCard';
import { ViewState, Property, SiteSettings } from '../types';

interface HomeProps {
  setView: (view: ViewState) => void;
  properties: Property[];
  settings?: SiteSettings;
}

const Home: React.FC<HomeProps> = ({ setView, properties, settings }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  // Select first 3 properties for the home page from the dynamic list
  const featuredProperties = properties.slice(0, 3);
  const whyUsImage = settings?.whyUsImageUrl || "https://picsum.photos/600/500?random=20";

  // Array of images for the hero slider, using settings or fallback
  const heroImages = settings?.heroImages && settings.heroImages.length > 0
    ? settings.heroImages
    : [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-gray-900 group">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImages.map((img, index) => (
            <img 
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentHeroIndex ? 'opacity-60' : 'opacity-0'
              }`}
              onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Invest in Value Added Plots With <span className="text-[#FF2C2C] font-extrabold drop-shadow-sm">Ready Title Deeds</span>
            </h1>
            <p className="text-xl mb-8 text-green-50 font-light">
              We empower you to own property in prime locations with flexible payment plans and titles ready in 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" onClick={() => setView(ViewState.PROJECTS)}>
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-900" onClick={() => setView(ViewState.CONTACT)}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHeroIndex ? 'bg-[#FF2C2C] scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Search Bar - Floating */}
      <div className="container mx-auto px-4 relative z-20 -mt-10 mb-20">
        <div className="bg-white p-6 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
            <select className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:border-green-500">
              <option>All Locations</option>
              <option>Naserian</option>
              <option>Kisaju</option>
              <option>KCA University</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Budget Range</label>
            <select className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:border-green-500">
              <option>Any Price</option>
              <option>Under 500k</option>
              <option>500k - 1M</option>
              <option>Above 1M</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Property Type</label>
            <select className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:border-green-500">
              <option>Residential</option>
              <option>Commercial</option>
              <option>Speculative</option>
            </select>
          </div>
          <Button variant="primary" fullWidth onClick={() => setView(ViewState.PROJECTS)}>Search Property</Button>
        </div>
      </div>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Explore our hand-picked selection of prime properties designed for immediate development and high ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
            
            {featuredProperties.length === 0 && (
                <div className="col-span-3 text-center text-gray-500 py-8">
                    No properties available. Check back soon!
                </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setView(ViewState.PROJECTS)}>
              View All Projects <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Model Land Investment?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Ready Title Deeds</h4>
                      <p className="text-gray-600">We process titles within 30 days of completion of payment. Your ownership is guaranteed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Flexible Payment Plans</h4>
                      <p className="text-gray-600">We offer friendly installment plans up to 15 months to help you acquire your dream land with ease.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <ThumbsUp size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Customer Centric</h4>
                      <p className="text-gray-600">We are dedicated to understanding and fulfilling our clients’ needs, providing personalized support at every step.</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="w-full md:w-1/2 relative">
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-green-200 rounded-lg -translate-y-4 translate-x-4"></div>
                <img 
                  src={whyUsImage}
                  onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
                  alt="Happy Client" 
                  className="rounded-lg shadow-xl relative z-10 w-full"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF2C2C] mb-2 drop-shadow-sm">2020</div>
              <div className="text-green-100">Year Founded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF2C2C] mb-2 drop-shadow-sm">1k+</div>
              <div className="text-green-100">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF2C2C] mb-2 drop-shadow-sm">50+</div>
              <div className="text-green-100">Major Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF2C2C] mb-2 drop-shadow-sm">100%</div>
              <div className="text-green-100">Title Delivery</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;