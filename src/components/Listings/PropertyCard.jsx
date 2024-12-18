import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, onClick }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    navigate(`/listings/${property.id}`);
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
      whileHover={{ y: -5 }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.mainImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900 transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <div className="text-2xl font-bold text-white">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-400 mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>
          <p className="text-gray-400 text-sm line-clamp-3">
            {truncateDescription(property.description)}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
          <div className="flex items-center text-gray-400">
            <Bed className="h-4 w-4 mr-2" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Bath className="h-4 w-4 mr-2" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Square className="h-4 w-4 mr-2" />
            <span>{property.squareFeet} ft²</span>
          </div>
        </div>

        {/* Property Features Tags */}
        <div className="flex flex-wrap gap-2">
          {property.features?.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
