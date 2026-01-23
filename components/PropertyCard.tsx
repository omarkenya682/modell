import React, { useState, useEffect } from 'react';
import { MapPin, Maximize, Tag, CreditCard, Calendar } from 'lucide-react';
import { Property } from '../types';
import Button from './Button';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [imgSrc, setImgSrc] = useState(property.image);

  // reliable fallback image (Real Estate themed)
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  useEffect(() => {
    setImgSrc(property.image);
  }, [property.image]);

  const handleError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group flex flex-col h-full">
      <div className="relative h-56 overflow-hidden bg-gray-100 flex-shrink-0">
        <img 
          src={imgSrc || FALLBACK_IMAGE} 
          alt={property.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={handleError}
        />
        
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full ${
            property.status === 'Available' ? 'bg-green-600' : 
            property.status === 'Selling Fast' ? 'bg-orange-500' : 'bg-[#FF2C2C]'
          }`}>
            {property.status}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-500 mb-4 text-sm">
          <MapPin size={16} className="mr-1 text-green-600" />
          {property.location}
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center">
            <Maximize size={14} className="mr-2 text-green-600" />
            {property.size}
          </div>
          <div className="flex items-center">
            <Tag size={14} className="mr-2 text-green-600" />
            Title Ready
          </div>
          {property.deposit && (
            <div className="flex items-center col-span-2 sm:col-span-1">
              <CreditCard size={14} className="mr-2 text-green-600" />
              Dep: {property.deposit}
            </div>
          )}
          {property.paymentPlan && (
            <div className="flex items-center col-span-2 sm:col-span-1">
              <Calendar size={14} className="mr-2 text-green-600" />
              Plan: {property.paymentPlan}
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Cash Price</p>
            <p className="text-xl font-bold text-green-800">{property.price}</p>
          </div>
          <Button size="sm" variant="outline">Details</Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;