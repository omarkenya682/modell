import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  // Construct image URL relative to public folder
  // Use the CMS image path directly, fallback if missing
  const imageUrl =
    property.image && property.image.length > 0
      ? property.image.startsWith('/assets/uploads/')
        ? property.image
        : `/assets/uploads/${property.image}`
      : 'https://picsum.photos/400/300?random=1';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative w-full h-64">
        <img
          src={imageUrl}
          alt={property.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://picsum.photos/400/300?random=2';
          }}
        />
      </div>

      <div className="p-4">
        {/* Project Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {property.name}
        </h3>

        {/* Location */}
        <p className="text-green-700 mb-1 font-medium">
          Location: {property.location}
        </p>

        {/* Price */}
        <p className="text-red-600 mb-1 font-semibold">
          Price: KES {property.price.toLocaleString()}
        </p>

        {/* Deposit */}
        <p className="text-red-600 mb-1 font-semibold">
          Deposit: KES {property.deposit.toLocaleString()}
        </p>

        {/* Description */}
        {property.description && (
          <p className="text-green-600 mt-2 text-sm">
            {property.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
