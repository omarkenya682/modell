import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import PropertyCard from '../components/PropertyCard';
import { Property, SiteSettings, ViewState } from '../types';
import projectsData from '../public/projects.json';

// ✅ SAME SOURCE AS ADMIN & PROJECTS PAGE
const allProjects: Property[] = projectsData.projects || [];

interface HomeProps {
  setView: (view: ViewState) => void;
  settings?: SiteSettings;
}

const Home: React.FC<HomeProps> = ({ setView, settings }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // ⭐ FEATURED = first 3 projects
  const featuredProjects = allProjects.slice(0, 3);

  const heroImages = settings?.heroImages?.length
    ? settings.heroImages
    : [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80'
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative h-[600px] flex items-center bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentHeroIndex ? 'opacity-60' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Invest in Value Added Plots With{' '}
            <span className="text-red-600">Ready Title Deeds</span>
          </h1>

          <Button size="lg" variant="secondary" onClick={() => setView(ViewState.PROJECTS)}>
            View Projects
          </Button>
        </div>
      </section>

      {/* ⭐ FEATURED PROJECTS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <PropertyCard key={project.id} property={project} />
            ))}

            {featuredProjects.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">
                No featured projects yet.
              </p>
            )}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => setView(ViewState.PROJECTS)}>
              View All Projects <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
