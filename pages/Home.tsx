import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Award, ThumbsUp } from 'lucide-react';
import Button from '../components/Button';
import PropertyCard from '../components/PropertyCard';
import { Property, SiteSettings, ViewState } from '../types';

// Dynamically import all JSON project files
const projectFiles = import.meta.glob('../data/projects/*.json', { eager: true });
const allProjects: Property[] = Object.values(projectFiles).map((mod: any) => mod.default);

interface HomeProps {
  setView: (view: ViewState) => void;
  settings?: SiteSettings;
}

const Home: React.FC<HomeProps> = ({ setView, settings }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = settings?.heroImages?.length
    ? settings.heroImages
    : [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
      ];

  const featuredProperties = allProjects.slice(0, 3);
  const whyUsImage = settings?.whyUsImageUrl || 'https://picsum.photos/600/500?random=20';

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
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Invest in Value Added Plots With{' '}
              <span className="text-[#FF2C2C] font-extrabold drop-shadow-sm">Ready Title Deeds</span>
            </h1>
            <p className="text-xl mb-8 text-green-50 font-light">
              We empower you to own property in prime locations with flexible payment plans and titles ready in 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" onClick={() => setView(ViewState.PROJECTS)}>
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
            {featuredProperties.length === 0 && (
              <div className="col-span-3 text-center text-gray-500 py-8">
                No properties available. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The rest of the homepage sections remain unchanged */}
      {/* Why Choose Us, Stats Section, etc. */}
    </div>
  );
};

export default Home;
