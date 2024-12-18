import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">Intellisync Home Pro</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/listings" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Listings
            </Link>
            <Link to="/testimonials" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Testimonials
            </Link>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/listings"
              className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Listings
            </Link>
            <Link
              to="/testimonials"
              className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <button className="w-full text-left bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
