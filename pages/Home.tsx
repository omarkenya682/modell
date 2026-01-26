import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const context = require.context('../data/projects', false, /\.json$/);
        const files = context.keys();
        const data: Property[] = files.map((file: string) => context(file));
        setProjects(data);
      } catch (err) {
        console.error('Error loading projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <PropertyCard key={project.id} property={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
