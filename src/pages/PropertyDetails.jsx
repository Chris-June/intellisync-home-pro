import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { propertiesAPI } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import OptimizedImage from '../components/Shared/OptimizedImage';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, loading, error } = useAsync(
    () => propertiesAPI.getPropertyById(Number(id)),
    [id]
  );

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button
            onClick={handleBack}
            className="mt-4 inline-flex items-center text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <button
            onClick={handleBack}
            className="mt-4 inline-flex items-center text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <button
        onClick={handleBack}
        className="mb-6 inline-flex items-center text-primary hover:text-primary-dark"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Listings
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-[400px]">
          <OptimizedImage
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full"
            width={1200}
            height={400}
            priority
          />
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-md text-lg font-semibold">
            ${property.price.toLocaleString()}
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <MapPin size={20} className="mr-2" />
            <span>{property.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <Bed size={24} className="mr-2 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="font-semibold">{property.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Bath size={24} className="mr-2 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="font-semibold">{property.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Square size={24} className="mr-2 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Square Feet</p>
                <p className="font-semibold">{property.squareFeet}</p>
              </div>
            </div>
          </div>

          {property.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>
          )}

          {property.features && property.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;
