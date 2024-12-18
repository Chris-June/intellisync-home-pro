import Select from 'react-select';
import { Search } from 'lucide-react';

const PropertyFilters = ({ onFilterChange }) => {
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-200000', label: 'Under $200,000' },
    { value: '200000-500000', label: '$200,000 - $500,000' },
    { value: '500000-1000000', label: '$500,000 - $1,000,000' },
    { value: '1000000+', label: 'Over $1,000,000' },
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const bedrooms = [
    { value: 'all', label: 'Any Beds' },
    { value: '1', label: '1+ Beds' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' },
  ];

  const customStyles = {
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search location..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            onChange={(e) => onFilterChange({ type: 'location', value: e.target.value })}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Price Range Filter */}
        <Select
          options={priceRanges}
          defaultValue={priceRanges[0]}
          styles={customStyles}
          onChange={(selected) => onFilterChange({ type: 'price', value: selected.value })}
          placeholder="Price Range"
          className="w-full"
        />

        {/* Property Type Filter */}
        <Select
          options={propertyTypes}
          defaultValue={propertyTypes[0]}
          styles={customStyles}
          onChange={(selected) => onFilterChange({ type: 'propertyType', value: selected.value })}
          placeholder="Property Type"
          className="w-full"
        />

        {/* Bedrooms Filter */}
        <Select
          options={bedrooms}
          defaultValue={bedrooms[0]}
          styles={customStyles}
          onChange={(selected) => onFilterChange({ type: 'bedrooms', value: selected.value })}
          placeholder="Bedrooms"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PropertyFilters;
