import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

// Load all project JSON files
const projectFiles = import.meta.glob('../data/projects/*.json', {
  eager: true
});

const projects: Property[] = Object.values(projectFiles)
  .map((mod: any) => {
    const data = mod.default ?? mod; // SAFETY FIX

    if (!data || !data.id) return null;

    return {
      id: data.id,
      name: data.name,
      price: Number(data.price),
      deposit: Number(data.deposit),
      location: data.location,
      description: data.description,
      image: data.image?.startsWith('/')
        ? data.image
        : `/${data.image}`
    };
  })
  .filter(Boolean) as Property[];

const Projects: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Projects Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our extensive list of value-added properties across the country.
            All our projects come with ready title deeds and flexible payment plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}

          {projects.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found in the portfolio.
              </p>
              <p className="text-sm text-gray-400">
                Use the Admin Dashboard to add new projects.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
