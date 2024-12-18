import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronDown } from 'lucide-react';
import Select from 'react-select';

const SearchBar = ({ className = '' }) => {
  const navigate = useNavigate();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: '',
    priceRange: null,
    propertyType: null,
    bedrooms: null,
    bathrooms: null,
  });

  const priceRanges = [
    { value: '0-200000', label: 'Under $200,000' },
    { value: '200000-500000', label: '$200,000 - $500,000' },
    { value: '500000-1000000', label: '$500,000 - $1,000,000' },
    { value: '1000000+', label: 'Over $1,000,000' },
  ];

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const bedroomOptions = [
    { value: '1', label: '1+ Bed' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' },
  ];

  const bathroomOptions = [
    { value: '1', label: '1+ Bath' },
    { value: '2', label: '2+ Baths' },
    { value: '3', label: '3+ Baths' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Convert search params to URL query string
    const params = new URLSearchParams();
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.priceRange) params.append('price', searchParams.priceRange.value);
    if (searchParams.propertyType) params.append('type', searchParams.propertyType.value);
    if (searchParams.bedrooms) params.append('beds', searchParams.bedrooms.value);
    if (searchParams.bathrooms) params.append('baths', searchParams.bathrooms.value);

    navigate(`/search?${params.toString()}`);
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: 42,
      borderColor: '#e5e7eb',
      '&:hover': {
        borderColor: '#d1d5db',
      },
    }),
  };

  return (
    <form onSubmit={handleSearch} className={`bg-white rounded-lg shadow-md ${className}`}>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter location, neighborhood, or address..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchParams.location}
            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          {searchParams.location && (
            <button
              type="button"
              onClick={() => setSearchParams({ ...searchParams, location: '' })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center text-gray-600 mt-2 text-sm hover:text-primary"
        >
          Advanced Search
          <ChevronDown
            size={16}
            className={`ml-1 transform transition-transform ${
              isAdvancedOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isAdvancedOpen && (
        <div className="px-4 pb-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Select
              styles={customSelectStyles}
              options={priceRanges}
              value={searchParams.priceRange}
              onChange={(option) => setSearchParams({ ...searchParams, priceRange: option })}
              placeholder="Price Range"
              isClearable
            />
            <Select
              styles={customSelectStyles}
              options={propertyTypes}
              value={searchParams.propertyType}
              onChange={(option) => setSearchParams({ ...searchParams, propertyType: option })}
              placeholder="Property Type"
              isClearable
            />
            <Select
              styles={customSelectStyles}
              options={bedroomOptions}
              value={searchParams.bedrooms}
              onChange={(option) => setSearchParams({ ...searchParams, bedrooms: option })}
              placeholder="Bedrooms"
              isClearable
            />
            <Select
              styles={customSelectStyles}
              options={bathroomOptions}
              value={searchParams.bathrooms}
              onChange={(option) => setSearchParams({ ...searchParams, bathrooms: option })}
              placeholder="Bathrooms"
              isClearable
            />
          </div>
        </div>
      )}

      <div className="px-4 pb-4">
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Search Properties
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
