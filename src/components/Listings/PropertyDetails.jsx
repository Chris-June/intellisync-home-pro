import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Square, MapPin, ChevronLeft, ChevronRight, Home, Check, Phone, Mail } from 'lucide-react';
import { listingsAPI } from '../../services/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await listingsAPI.getPropertyById(id);
        setProperty(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-800 rounded-lg mb-8" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-800 rounded w-1/2" />
              <div className="h-4 bg-gray-800 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-4">
              Error loading property details: {error}
            </div>
            <Link
              to="/listings"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-gray-900 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-300 text-lg mb-4">
              Property not found
            </div>
            <Link
              to="/listings"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[500px] rounded-lg overflow-hidden mb-4">
            <img
              src={property.images[activeImage]}
              alt={`Property view ${activeImage + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setActiveImage(prev => (prev > 0 ? prev - 1 : property.images.length - 1))}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveImage(prev => (prev < property.images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-24 rounded-lg overflow-hidden ${
                  index === activeImage ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Property view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <h1 className="text-3xl font-bold text-white mb-4">{property.title}</h1>
              <p className="text-2xl text-primary font-bold mb-6">
                ${property.price.toLocaleString()}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Bedrooms</div>
                  <div className="text-lg font-semibold text-white">{property.bedrooms}</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Bathrooms</div>
                  <div className="text-lg font-semibold text-white">{property.bathrooms}</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Square className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Square Feet</div>
                  <div className="text-lg font-semibold text-white">{property.squareFeet}</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Home className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Property Type</div>
                  <div className="text-lg font-semibold text-white capitalize">{property.type}</div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
              <p className="text-gray-300 mb-8">{property.description}</p>

              <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
              <ul className="grid grid-cols-2 gap-4 text-gray-300">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">Contact Agent</h2>
              <div className="flex items-center mb-6">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium text-white">{property.agent.name}</h3>
                  <p className="text-gray-300">{property.agent.title}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 text-primary mr-2" />
                  {property.agent.phone}
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 text-primary mr-2" />
                  {property.agent.email}
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border-gray-700 bg-gray-700 shadow-sm focus:border-primary focus:ring-primary text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border-gray-700 bg-gray-700 shadow-sm focus:border-primary focus:ring-primary text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border-gray-700 bg-gray-700 shadow-sm focus:border-primary focus:ring-primary text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 shadow-xl mt-8">
              <h2 className="text-xl font-semibold text-white mb-6">Location</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                {/* Add map component here */}
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                {property.location.address}<br />
                {property.location.city}, {property.location.state} {property.location.zip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
