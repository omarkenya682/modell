import React, { useState } from 'react';
import { Property } from '../types';
import { MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [showDetails, setShowDetails] = useState(false);

  const imageUrl = property.image
    ? `/assets/uploads/${property.image}`
    : 'https://picsum.photos/400/300?random=1'; // fallback image

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative w-full h-64">
        <img
          src={imageUrl}
          alt={property.name}
          className="object-cover w-full h-full"
          onError={(e) => (e.target as HTMLImageElement).src = 'https://picsum.photos/400/300?random=2'}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>

        <p className="text-green-700 mb-1 flex items-center gap-1">
          <MapPin size={16} /> {property.location}
        </p>

        <p className="mb-1">
          <span className="font-bold text-red-600">Price:</span> KES {property.price.toLocaleString()}
        </p>
        <p className="mb-1">
          <span className="font-bold text-red-600">Deposit:</span> KES {property.deposit.toLocaleString()}
        </p>

        {property.description && (
          <>
            {showDetails ? (
              <p className="text-gray-500 mt-2 text-sm">{property.description}</p>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Details
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
