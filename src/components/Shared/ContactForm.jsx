import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader } from 'lucide-react';
import { contactAPI } from '../../services/api';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9-+()]*$/, 'Invalid phone number')
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long'),
  subject: Yup.string()
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .max(1000, 'Message is too long')
    .required('Message is required'),
});

const ContactForm = ({ className = '' }) => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitStatus('submitting');
      await contactAPI.submitContactForm(values);
      setSubmitStatus('success');
      resetForm();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Contact form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <Field
                type="text"
                name="name"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name && touched.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Field
                type="email"
                name="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email && touched.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Field
                type="tel"
                name="phone"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone && touched.phone ? 'border-red-500' : ''
                }`}
              />
              {errors.phone && touched.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <Field
                type="text"
                name="subject"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.subject && touched.subject ? 'border-red-500' : ''
                }`}
              />
              {errors.subject && touched.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.message && touched.message ? 'border-red-500' : ''
                }`}
              />
              {errors.message && touched.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader className="animate-spin mx-auto" size={20} />
              ) : (
                'Send Message'
              )}
            </button>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center p-4 rounded-md ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-700'
                      : submitStatus === 'error'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <Check className="mr-2" size={20} />
                  ) : submitStatus === 'error' ? (
                    <AlertCircle className="mr-2" size={20} />
                  ) : (
                    <Loader className="mr-2 animate-spin" size={20} />
                  )}
                  <span>
                    {submitStatus === 'success'
                      ? 'Message sent successfully!'
                      : submitStatus === 'error'
                      ? 'Failed to send message. Please try again.'
                      : 'Sending message...'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
