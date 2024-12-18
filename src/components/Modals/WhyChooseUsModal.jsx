import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhyChooseUsModal = ({ isOpen, onClose, feature }) => {
  if (!isOpen) return null;

  const serviceValues = {
    'Smart Search': {
      importance: "Finding the perfect home shouldn't be a needle in a haystack. Our smart search technology understands your preferences and lifestyle, making your home search efficient and personalized. This saves you countless hours of browsing through irrelevant listings.",
      values: "We believe technology should serve people, not the other way around. Our smart search is designed with empathy, understanding that each home seeker has unique needs and dreams. We're committed to making the search process as intuitive and stress-free as possible."
    },
    'Verified Listings': {
      importance: "In today's fast-paced real estate market, accuracy and trust are paramount. Our verified listings give you confidence in your decisions, protecting you from scams and ensuring every property meets our high standards of authenticity.",
      values: "Integrity is at our core. We understand that a home purchase is one of life's biggest decisions, and we take that responsibility seriously. Every listing undergoes rigorous verification because we believe in absolute transparency and honesty in real estate."
    },
    'Expert Support': {
      importance: "Real estate can be complex, with many moving parts and important decisions. Our expert support team provides guidance through every step, ensuring you have the knowledge and confidence to make informed choices about your future home.",
      values: "We believe that everyone deserves access to professional real estate expertise. Our commitment to exceptional support reflects our dedication to democratizing real estate knowledge and empowering our clients to achieve their housing goals."
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why Choose {feature}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Why It's Important for You
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {serviceValues[feature]?.importance}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Why It Matches Our Values
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {serviceValues[feature]?.values}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WhyChooseUsModal;
