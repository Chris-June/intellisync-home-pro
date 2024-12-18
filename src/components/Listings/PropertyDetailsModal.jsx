import { X, Bed, Bath, Square, MapPin, Calendar, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../Shared/OptimizedImage';

const PropertyDetailsModal = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="relative">
            <OptimizedImage
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-64"
              width={800}
              height={400}
              priority={true}
              objectFit="cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${property.price.toLocaleString()}
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <DetailItem icon={<Bed />} label="Bedrooms" value={property.bedrooms} />
              <DetailItem icon={<Bath />} label="Bathrooms" value={property.bathrooms} />
              <DetailItem icon={<Square />} label="Square Feet" value={property.squareFeet} />
              <DetailItem icon={<Calendar />} label="Year Built" value={property.yearBuilt} />
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Home size={16} className="mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Button */}
            <button className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors">
              Contact Agent
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
    <div className="text-primary mb-1">{icon}</div>
    <div className="text-sm text-gray-500">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

export default PropertyDetailsModal;
