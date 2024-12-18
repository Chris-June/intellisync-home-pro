import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, RefreshCcw, Home, Bed, Bath, DollarSign, Filter } from 'lucide-react';
import { listingsAPI } from '../services/api';
import PropertyCard from '../components/Listings/PropertyCard';
import SEO from '../components/SEO/SEO';

const ListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    searchQuery: ''
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await listingsAPI.getProperties(filters);
        setListings(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchListings, 300);
    return () => clearTimeout(debounceTimer);
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const propertyTypes = ['Any', 'House', 'Condo', 'Townhouse', 'Apartment'];
  const bedroomOptions = ['Any', '1+', '2+', '3+', '4+', '5+'];
  const bathroomOptions = ['Any', '1+', '1.5+', '2+', '2.5+', '3+'];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <SEO
        title="Available Properties in Chatham"
        description="Browse our extensive collection of properties in Chatham. Use our advanced filters to find your perfect home. Virtual tours available for all listings."
        keywords="property listings, Chatham real estate, homes for sale, condos for sale, real estate search, property filter, virtual property tour"
        ogType="website"
      />
      
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Available Properties</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse through our selection of premium properties. Use the filters below to find your perfect home.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, features, or keywords..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                />
              </div>
              
              {/* Toggle Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>

            {/* Expandable Filters */}
            <motion.div
              initial={false}
              animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {/* Price Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Price Range</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 2000000])}
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Bedrooms</label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    >
                      {bedroomOptions.map(option => (
                        <option key={option} value={option === 'Any' ? '' : option.replace('+', '')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Bathrooms</label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={filters.bathrooms}
                      onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                    >
                      {bathroomOptions.map(option => (
                        <option key={option} value={option === 'Any' ? '' : option.replace('+', '')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Property Type</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type === 'Any' ? '' : type.toLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <RefreshCcw className="h-5 w-5" />
                  Retry
                </button>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No properties found matching your criteria.
                </div>
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 2000000],
                    bedrooms: '',
                    bathrooms: '',
                    propertyType: '',
                    searchQuery: ''
                  })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <RefreshCcw className="h-5 w-5" />
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map(listing => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PropertyCard
                      property={listing}
                      onClick={() => navigate(`/property/${listing.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
