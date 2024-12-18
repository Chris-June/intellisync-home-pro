import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { testimonialsAPI } from '../services/api';

const TestimonialImage = React.memo(({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);

  return imageError ? (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center ${className}`}>
      <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
});

const TestimonialCard = React.memo(({ testimonial }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 p-6 rounded-lg shadow-xl"
  >
    <div className="flex items-start space-x-4">
      <TestimonialImage
        src={testimonial.image}
        alt={testimonial.name}
        className="w-12 h-12"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-1">{testimonial.name}</h3>
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}
              fill="currentColor"
            />
          ))}
        </div>
        <p className="text-gray-300">{testimonial.comment}</p>
        <p className="text-gray-400 text-sm mt-2">{testimonial.date}</p>
      </div>
    </div>
  </motion.div>
));

const TestimonialSkeleton = React.memo(() => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-xl animate-pulse">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gray-700 rounded-full" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-1/4" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-700 rounded" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
        </div>
        <div className="h-3 bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  </div>
));

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsAPI.getAllTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const loadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Client Testimonials</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with Intellisync Home Pro.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-8">
            Error loading testimonials: {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, displayCount).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            
            {displayCount < testimonials.length && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md inline-flex items-center space-x-2 transition-colors"
                >
                  <span>Load More</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Add display names for better debugging
TestimonialImage.displayName = 'TestimonialImage';
TestimonialCard.displayName = 'TestimonialCard';
TestimonialSkeleton.displayName = 'TestimonialSkeleton';

export default Testimonials;
