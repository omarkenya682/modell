import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Award, Users, ThumbsUp } from 'lucide-react';
import Button from '../components/Button';
import PropertyCard from '../components/PropertyCard';
import { ViewState, Property, SiteSettings } from '../types';

// You might need a Markdown parser if you want to read .md content
import matter from 'gray-matter';

// Dynamically import all projects from data/projects
function importProjects(): Property[] {
  const context = require.context('../data/projects', false, /\.(json|md)$/);
  const projects: Property[] = [];

  context.keys().forEach((key) => {
    const file = context(key);
    if (key.endsWith('.json')) {
      projects.push(file.default || file);
    } else if (key.endsWith('.md')) {
      // Parse Markdown frontmatter
      const parsed = matter(file.default || file);
      projects.push(parsed.data as Property);
    }
  });

  return projects;
}

interface HomeProps {
  setView: (view: ViewState) => void;
  settings?: SiteSettings;
}

const Home: React.FC<HomeProps> = ({ setView, settings }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [projects, setProjects] = useState<Property[]>([]);

  useEffect(() => {
    setProjects(importProjects());

    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Use first 3 for Featured Projects
  const featuredProperties = projects.slice(0, 3);
  const whyUsImage = settings?.whyUsImageUrl || "https://picsum.photos/600/500?random=20";

  const heroImages = settings?.heroImages && settings.heroImages.length > 0
    ? settings.heroImages
    : [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      ];

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
      </section>

      {/* Featured Projects Section */}
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
            {featuredProperties.length > 0 ? (
              featuredProperties.map((prop) => <PropertyCard key={prop.id} property={prop} />)
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-8">
                No projects available. Check back soon!
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

      {/* Keep all other homepage sections (Why Us, Stats, etc.) exactly as before */}
      {/* ...copy your existing Why Us and Stats JSX here... */}
    </div>
  );
};

export default Home;
