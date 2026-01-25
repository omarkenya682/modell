import React from 'react'; 
import PropertyCard from '../components/PropertyCard'; 
import { Property } from '../types';

interface ProjectsProps { 
  properties: Property[];
}

const Projects: React.FC<ProjectsProps> = ({ properties }) => {
  return ( 
    <div className="py-16 bg-gray-50 animate-fade-in"> 
      <div className="container mx-auto px-4">
        <div className="text-center mb-16"> 
  <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects Portfolio</h1>
          <p className="text-gray-600 max-w-2xl mx-auto"> Browse our extensive list of value-added properties across the country. All our projects come with ready title deeds and flexible payment plans. </p> 
        </div>
        {/* Filters (Visual only for demo) */} 
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-center">
          <span className="font-semibold text-gray-700">Filter By:</span>
          <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm">All</button> 
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm">Naserian</button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm">Kisaju</button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm">KCA</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          {properties.map(prop => (
      <PropertyCard key={prop.id} property={prop} /> 
    ))}
          {properties.length === 0 && ( 
      <div className="col-span-3 text-center py-12"> 
        <p className="text-gray-500 text-lg">No projects found 
          in the portfolio.</p>
        <p className="text-sm text-gray-400">Use the Admin
          Dashboard to add new projects.</p>
      </div> 
    )}
          </div> </div> </div> ); };
export default Projects;
