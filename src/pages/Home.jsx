import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, Shield } from 'lucide-react';
import { listingsAPI, testimonialsAPI } from '../services/api';
import PropertyCard from '../components/Listings/PropertyCard';
import TestimonialCard from '../components/Testimonials/TestimonialCard';
import WhyChooseUsModal from '../components/Modals/WhyChooseUsModal';
import SEO from '../components/SEO/SEO';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [propertiesData, testimonialsData] = await Promise.all([
          listingsAPI.getFeaturedProperties(),
          testimonialsAPI.getFeaturedTestimonials()
        ]);
        setFeaturedProperties(propertiesData);
        setTestimonials(testimonialsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      title: 'Smart Search',
      description: 'Find your perfect home with our intelligent search technology.',
      icon: Search,
    },
    {
      title: 'Verified Listings',
      description: 'Every property is verified for your peace of mind.',
      icon: Shield,
    },
    {
      title: 'Expert Support',
      description: '24/7 support from our experienced real estate team.',
      icon: Users,
    },
  ];

  return (
    <>
      <SEO
        title="Find Your Dream Home in Chatham"
        description="Discover luxury homes and premium properties in Chatham. Expert real estate agents helping you find the perfect home with virtual tours and personalized service."
        keywords="Chatham real estate, luxury homes, property listings, real estate agents, home buying, virtual tours, premium properties, Chatham housing market"
        ogType="website"
      />
      
      <div className="space-y-0">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000"
              alt="Modern luxury home"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="relative z-10 w-full">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl pl-8"
              >
                <h1 className="text-5xl font-bold mb-6 text-white">
                  Find Your Dream Home Today
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  Discover the perfect property with Intellisync Home Pro. We make finding your dream home simple and enjoyable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/listings"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    <span>Browse Listings</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Properties</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Explore our handpicked selection of premium properties that match your lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loading ? (
                Array(3).fill(null).map((_, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                    <div className="h-48 bg-gray-700 rounded-md mb-4" />
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-1/2" />
                  </div>
                ))
              ) : error ? (
                <div className="col-span-3 text-center text-red-400">
                  Error loading properties: {error}
                </div>
              ) : (
                featuredProperties?.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We're committed to providing you with the best real estate experience possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {feature.description}
                  </p>
                  <button
                    onClick={() => setSelectedFeature(feature.title)}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Read about the experiences of our satisfied clients and their journey to finding their perfect home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/testimonials"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
              >
                <span>View All Testimonials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <WhyChooseUsModal
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
          feature={selectedFeature}
        />
      </div>
    </>
  );
};

export default Home;
