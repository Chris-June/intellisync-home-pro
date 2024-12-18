import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, List, Grid as GridIcon } from 'lucide-react';
import PropertyCard from '../components/Listings/PropertyCard';
import PropertyDetailsModal from '../components/Listings/PropertyDetailsModal';
import SearchBar from '../components/Shared/SearchBar';

// Mock data - replace with API call
const mockProperties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    location: 'Downtown, City',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800',
    yearBuilt: 2020,
    description: 'Luxurious modern apartment in the heart of downtown.',
    features: ['Hardwood Floors', 'Stainless Steel Appliances', 'In-unit Laundry'],
  },
  // Add more mock properties as needed
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc');

  // Get search parameters
  const location = searchParams.get('location') || '';
  const price = searchParams.get('price');
  const type = searchParams.get('type');
  const beds = searchParams.get('beds');
  const baths = searchParams.get('baths');

  // Filter properties based on search parameters
  const filteredProperties = mockProperties.filter((property) => {
    const matchesLocation = !location || 
      property.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesPrice = !price || 
      (price === '0-200000' && property.price < 200000) ||
      (price === '200000-500000' && property.price >= 200000 && property.price < 500000) ||
      (price === '500000-1000000' && property.price >= 500000 && property.price < 1000000) ||
      (price === '1000000+' && property.price >= 1000000);

    const matchesBeds = !beds || property.bedrooms >= parseInt(beds);
    const matchesBaths = !baths || property.bathrooms >= parseInt(baths);

    return matchesLocation && matchesPrice && matchesBeds && matchesBaths;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar className="mb-4" />
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {filteredProperties.length} properties found
            {location && ` in "${location}"`}
          </p>
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 border rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600'
                }`}
              >
                <GridIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {sortedProperties.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <PropertyCard
                property={property}
                onClick={() => {
                  setSelectedProperty(property);
                  setIsModalOpen(true);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No Results Message */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria to find more properties.
          </p>
        </div>
      )}

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SearchResults;
