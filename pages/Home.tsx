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

  // ✅ FIX: normalize hero images (supports CMS uploads + old links)
  const heroImages: string[] =
    settings?.heroImages?.length
      ? settings.heroImages
          .map((item: any) =>
            typeof item === 'string'
              ? item
              : item.image || item.url
          )
          .filter(Boolean)
      : ;

  useEffect(() => {
    if (!heroImages.length) return;

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
              alt={`Hero ${index + 1}`}
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

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
            Why Choose Model Land Investment
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Genuine Title Deeds
              </h3>
              <p className="text-gray-600">
                All our projects come with verified and ready title deeds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Prime Locations
              </h3>
              <p className="text-gray-600">
                Strategically located land with high growth potential.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Flexible Payments
              </h3>
              <p className="text-gray-600">
                Affordable deposits and flexible installment plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-red-500">2020</p>
              <p className="mt-2 text-green-100">Year Founded</p>
            </div>

            <div>
              <p className="text-4xl font-extrabold text-red-500">1,000+</p>
              <p className="mt-2 text-green-100">Happy Clients</p>
            </div>

            <div>
              <p className="text-4xl font-extrabold text-red-500">60+</p>
              <p className="mt-2 text-green-100">Projects Completed</p>
            </div>

            <div>
              <p className="text-4xl font-extrabold text-red-500">100%</p>
              <p className="mt-2 text-green-100">Title Deed Delivery</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
