import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  // Construct image URL relative to public folder
  const imageUrl = property.image
    ? `/assets/uploads/${property.image}`
    : 'https://picsum.photos/400/300?random=1'; // fallback image if none

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative w-full h-64">
        <img
          src={imageUrl}
          alt={property.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            // fallback if image not found
            (e.target as HTMLImageElement).src =
              'https://picsum.photos/400/300?random=2';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-bold">Location:</span> {property.location}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-bold">Price:</span> KES {property.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-bold">Deposit:</span> KES {property.deposit.toLocaleString()}
        </p>
        {property.description && (
          <p className="text-gray-500 mt-2 text-sm">{property.description}</p>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
