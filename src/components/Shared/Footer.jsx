import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">RealEstate Pro</h3>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-white">
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-white">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Buy Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Sell Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Property Management
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Real Estate Ave</li>
              <li>City, State 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@realestatepro.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RealEstate Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
