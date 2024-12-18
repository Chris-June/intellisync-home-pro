import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactForm = React.memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 shadow-sm focus:border-primary focus:ring-primary text-white"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 shadow-sm focus:border-primary focus:ring-primary text-white"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 shadow-sm focus:border-primary focus:ring-primary text-white"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 shadow-sm focus:border-primary focus:ring-primary text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-8 w-full flex justify-center items-center px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
      >
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </button>
    </form>
  );
});

const ContactInfo = React.memo(() => (
  <div className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-8">
    <div className="flex items-start">
      <div className="bg-primary/10 p-3 rounded-full">
        <MapPin className="w-6 h-6 text-primary" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-white">Office Location</h3>
        <p className="mt-1 text-gray-300">
          123 Real Estate Ave<br />
          Chatham, NY 12037
        </p>
      </div>
    </div>
    <div className="flex items-start">
      <div className="bg-primary/10 p-3 rounded-full">
        <Phone className="w-6 h-6 text-primary" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-white">Phone</h3>
        <p className="mt-1 text-gray-300">
          (555) 123-4567
        </p>
      </div>
    </div>
    <div className="flex items-start">
      <div className="bg-primary/10 p-3 rounded-full">
        <Mail className="w-6 h-6 text-primary" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-white">Email</h3>
        <p className="mt-1 text-gray-300">
          contact@intellisync.com
        </p>
      </div>
    </div>
  </div>
));

const Contact = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions about a property or need assistance? We're here to help!
            Reach out to us through any of the following methods.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

ContactForm.displayName = 'ContactForm';
ContactInfo.displayName = 'ContactInfo';

export default Contact;
