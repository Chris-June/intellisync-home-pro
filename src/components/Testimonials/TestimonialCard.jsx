import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import OptimizedImage from '../Shared/OptimizedImage';

const TestimonialCard = ({ testimonial }) => {
  const { name, role, image, content, rating, date } = testimonial;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex items-start mb-4">
        <OptimizedImage
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full"
          width={48}
          height={48}
          objectFit="cover"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Content */}
      <p className="text-gray-700 mb-4 italic">{content}</p>

      {/* Date */}
      {date && <p className="text-gray-500 text-sm">{date}</p>}
    </motion.div>
  );
};

export default TestimonialCard;
