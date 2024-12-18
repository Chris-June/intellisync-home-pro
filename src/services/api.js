// Base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.realestatepro.com/v1';

// Helper function for API calls
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Mock data for development
export const mockProperties = [
  {
    id: 1,
    title: 'Charming Heritage Home',
    location: '25 Victoria Ave, Chatham, ON N7M 1Z7',
    price: 549000,
    bedrooms: 4,
    bathrooms: 2,
    squareFeet: 2200,
    type: 'house',
    mainImage: '/assets/properties/1/main.jpg',
    images: ['/assets/properties/1/1.jpg', '/assets/properties/1/2.jpg', '/assets/properties/1/3.jpg', '/assets/properties/1/4.jpg'],
    description: 'Step into timeless elegance with this meticulously preserved heritage home. Featuring exquisite original woodwork and thoughtfully integrated modern updates, this residence perfectly balances historic charm with contemporary comfort. An opportunity to own a piece of Chatham\'s architectural history while enjoying the conveniences of modern living.',
    features: [
      'Hand-crafted Original Hardwood Floors & Trim',
      'Gourmet Kitchen with Granite Countertops',
      'Wraparound Victorian-era Covered Porch',
      'Professionally Landscaped Perennial Garden'
    ],
  },
  {
    id: 2,
    title: 'Modern Riverside Condo',
    location: '100 Thames St, Chatham, ON N7M 5N4',
    price: 389900,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    type: 'condo',
    mainImage: '/assets/properties/2/main.jpg',
    images: ['/assets/properties/2/1.jpg', '/assets/properties/2/2.jpg', '/assets/properties/2/3.jpg', '/assets/properties/2/4.jpg'],
    description: 'Experience luxury living at its finest in this stunning riverside condominium. Floor-to-ceiling windows frame breathtaking water views, while premium finishes and an open-concept design create an atmosphere of sophisticated urban living. Located in the heart of downtown, this residence offers the perfect blend of convenience and tranquility.',
    features: [
      'Floor-to-Ceiling Windows with River Views',
      'Custom Italian Kitchen Cabinetry',
      'Private Balcony with Glass Railings',
      'Secured Underground Parking with Storage'
    ],
  },
  {
    id: 3,
    title: 'Family Home in Chatham South',
    location: '45 Park Ave W, Chatham, ON N7M 1X1',
    price: 479000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1800,
    type: 'house',
    mainImage: '/assets/properties/3/main.jpg',
    images: ['/assets/properties/3/1.jpg', '/assets/properties/3/2.jpg', '/assets/properties/3/3.jpg', '/assets/properties/3/4.jpg'],
    description: 'Welcome to this beautifully updated family home in desirable Chatham South. Recently renovated with modern amenities while maintaining its warm, inviting character. The spacious open-concept main floor flows seamlessly to a private backyard oasis, perfect for both entertaining and everyday family living.',
    features: [
      'Newly Renovated Chef\'s Kitchen with Island',
      'Custom Built-in Entertainment Center',
      'Primary Suite with Luxury Ensuite',
      'Professional Outdoor Kitchen & Patio'
    ],
  },
  {
    id: 4,
    title: 'Downtown Apartment',
    location: '180 King St W, Chatham, ON N7M 1E4',
    price: 289000,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 950,
    type: 'apartment',
    mainImage: '/assets/properties/4/main.jpg',
    images: ['/assets/properties/4/1.jpg', '/assets/properties/4/2.jpg', '/assets/properties/4/3.jpg', '/assets/properties/4/4.jpg'],
    description: 'Discover urban living at its best in this thoughtfully renovated downtown apartment. High ceilings and large windows create an abundance of natural light, while modern updates provide all the conveniences of contemporary living. Steps away from boutique shopping, cafes, and cultural attractions.',
    features: [
      'Exposed Brick Accent Walls',
      'Smart Home Technology Throughout',
      'Custom Built-in Storage Solutions',
      'Rooftop Access with City Views'
    ],
  },
  {
    id: 5,
    title: 'Historic District Home',
    location: '75 Wellington St E, Chatham, ON N7M 1W1',
    price: 625000,
    bedrooms: 5,
    bathrooms: 3,
    squareFeet: 2800,
    type: 'house',
    mainImage: '/assets/properties/5/main.jpg',
    images: ['/assets/properties/5/1.jpg', '/assets/properties/5/2.jpg', '/assets/properties/5/3.jpg', '/assets/properties/5/4.jpg'],
    description: 'An architectural masterpiece in Chatham\'s prestigious Historic District. This magnificent residence showcases period details meticulously maintained throughout the decades. With its grand entertaining spaces and intimate family areas, this home represents the perfect marriage of historic grandeur and modern luxury.',
    features: [
      'Original Stained Glass Windows & Millwork',
      'Chef\'s Kitchen with Butler\'s Pantry',
      'Library with Custom Built-in Shelving',
      'Climate-Controlled Wine Cellar'
    ],
  },
  {
    id: 6,
    title: 'Maple City Townhouse',
    location: '220 Grand Ave W, Chatham, ON N7L 1C1',
    price: 359900,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1500,
    type: 'house',
    mainImage: '/assets/properties/6/main.jpg',
    images: ['/assets/properties/6/1.jpg', '/assets/properties/6/2.jpg', '/assets/properties/6/3.jpg', '/assets/properties/6/4.jpg'],
    description: 'Embrace modern living in this sophisticated end-unit townhome in the coveted Maple City district. Thoughtfully designed with an emphasis on both style and functionality, this residence offers soaring 9-foot ceilings, premium finishes, and a private courtyard. Perfect for those seeking a low-maintenance lifestyle without compromising on luxury.',
    features: [
      'Premium Vinyl Plank Flooring Throughout',
      'Quartz Waterfall Kitchen Island',
      'Private Courtyard with Built-in BBQ',
      'Attached Garage with EV Charging'
    ],
  },
  {
    id: 7,
    title: 'Riverside Bungalow',
    location: '350 River View Dr, Chatham, ON N7M 5J4',
    price: 495000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    type: 'house',
    mainImage: '/assets/properties/7/main.jpg',
    images: ['/assets/properties/7/1.jpg', '/assets/properties/7/2.jpg', '/assets/properties/7/3.jpg', '/assets/properties/7/4.jpg'],
    description: 'Nestled along the tranquil Thames River, this stunning bungalow offers an exceptional blend of natural beauty and refined living. The open-concept interior is bathed in natural light, while the expansive windows frame picturesque river views. A rare opportunity to own a piece of Chatham\'s coveted waterfront property.',
    features: [
      'Panoramic River Views from Principal Rooms',
      'Four-Season Sunroom with Radiant Heating',
      'Gourmet Kitchen with High-End Appliances',
      'Multi-Level Composite Deck System'
    ],
  },
  {
    id: 8,
    title: 'Luxury Downtown Condo',
    location: '88 Wellington St W, Chatham, ON N7M 1J3',
    price: 429900,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    type: 'condo',
    mainImage: '/assets/properties/8/main.jpg',
    images: ['/assets/properties/8/1.jpg', '/assets/properties/8/2.jpg', '/assets/properties/8/3.jpg', '/assets/properties/8/4.jpg'],
    description: 'Experience the pinnacle of urban sophistication in this meticulously designed luxury condominium. Located in Chatham\'s premier full-service building, this residence combines contemporary elegance with unparalleled amenities. Floor-to-ceiling windows showcase spectacular city views, while the thoughtful layout creates an atmosphere of spacious refinement.',
    features: [
      '24/7 Concierge & Security Service',
      'State-of-the-art Fitness Center & Spa',
      'Temperature-Controlled Wine Storage',
      'Private Terrace with Outdoor Kitchen'
    ],
  },
  {
    id: 9,
    title: 'Executive Estate',
    location: '475 St. Clair St, Chatham, ON N7L 3K2',
    price: 899000,
    bedrooms: 5,
    bathrooms: 3.5,
    squareFeet: 2600,
    type: 'house',
    mainImage: '/assets/properties/9/main.jpg',
    images: ['/assets/properties/9/1.jpg', '/assets/properties/9/2.jpg', '/assets/properties/9/3.jpg', '/assets/properties/9/4.jpg'],
    description: 'Welcome to this extraordinary executive estate in prestigious St. Clair Estates. This architectural masterpiece seamlessly blends luxury living with family functionality. From the grand two-story foyer to the resort-style backyard oasis, every detail has been carefully curated for those who appreciate the finest things in life.',
    features: [
      'Professional-Grade Kitchen with Butler\'s Pantry',
      'Home Theater with THX Sound System',
      'Resort-Style Pool with Waterfall Feature',
      'Climate-Controlled 3-Car Garage'
    ],
  },
  {
    id: 10,
    title: 'Garden Cottage',
    location: '123 Rose Ave, Chatham, ON N7L 4R5',
    price: 329000,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 1000,
    type: 'house',
    mainImage: '/assets/properties/10/main.jpg',
    images: ['/assets/properties/10/1.jpg', '/assets/properties/10/2.jpg', '/assets/properties/10/3.jpg', '/assets/properties/10/4.jpg'],
    description: 'Discover the charm of cottage living in this enchanting garden home. Lovingly maintained and thoughtfully updated, this residence offers a perfect blend of character and modern comfort. The award-winning gardens create a private paradise, while the detached workshop provides endless possibilities for hobbyists or home-based entrepreneurs.',
    features: [
      'Award-winning Perennial Gardens',
      'Custom Craftsman-Style Built-ins',
      'Newly Installed Metal Roof',
      'Heated Workshop with 220V Power'
    ],
  },
  {
    id: 11,
    title: 'Smart Home Sanctuary',
    location: '155 Park Ave E, Chatham, ON N7M 3P1',
    price: 649000,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2000,
    type: 'house',
    mainImage: '/assets/properties/11/main.jpg',
    images: ['/assets/properties/11/1.jpg', '/assets/properties/11/2.jpg', '/assets/properties/11/3.jpg', '/assets/properties/11/4.jpg'],
    description: 'Welcome to the future of home living in this cutting-edge smart residence. Seamlessly integrating technology with sophisticated design, this home offers automated climate control, lighting, and security systems. The chef-inspired kitchen and dedicated home office create the perfect balance of functionality and luxury for modern living.',
    features: [
      'Integrated Smart Home Automation System',
      'Custom Chef\'s Kitchen with Smart Appliances',
      'Dedicated Home Office with Built-in Technology Hub',
      'Professional Landscaping with Smart Irrigation'
    ],
  },
  {
    id: 12,
    title: 'Park View Haven',
    location: '280 Tecumseh Park Dr, Chatham, ON N7M 2E1',
    price: 339900,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 900,
    type: 'apartment',
    mainImage: '/assets/properties/12/main.jpg',
    images: ['/assets/properties/12/1.jpg', '/assets/properties/12/2.jpg', '/assets/properties/12/3.jpg', '/assets/properties/12/4.jpg'],
    description: 'Embrace serene park living in this beautifully appointed apartment overlooking historic Tecumseh Park. Recently renovated with designer touches throughout, this urban retreat offers the perfect blend of location and lifestyle. Wake up to stunning park views and enjoy the convenience of downtown living at your doorstep.',
    features: [
      'Panoramic Park Views from Every Room',
      'Designer Bathroom with Heated Floors',
      'Custom California Closet Systems',
      'Secured Underground Parking with Storage'
    ],
  },
  {
    id: 13,
    title: 'Riverside Heritage Manor',
    location: '400 Thames River Rd, Chatham, ON N7L 0A1',
    price: 799000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    type: 'house',
    mainImage: '/assets/properties/13/main.jpg',
    images: ['/assets/properties/13/1.jpg', '/assets/properties/13/2.jpg', '/assets/properties/13/3.jpg', '/assets/properties/13/4.jpg'],
    description: 'Experience the grandeur of riverside living in this meticulously restored heritage home. Combining period architecture with modern luxury, this residence showcases original millwork, stained glass windows, and contemporary updates. The chef\'s kitchen and climate-controlled wine cellar make this an entertainer\'s dream.',
    features: [
      'Original Restored Hardwood and Millwork',
      'Professional-Grade Kitchen with Copper Hood',
      'Temperature-Controlled 500-Bottle Wine Cellar',
      'Private River-View Master Suite with Balcony'
    ],
  },
  {
    id: 14,
    title: 'Historic District Loft',
    location: '175 King St E, Chatham, ON N7M 1E2',
    price: 389900,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    type: 'condo',
    mainImage: '/assets/properties/14/main.jpg',
    images: ['/assets/properties/14/1.jpg', '/assets/properties/14/2.jpg', '/assets/properties/14/3.jpg', '/assets/properties/14/4.jpg'],
    description: 'Discover urban sophistication in this stunning converted loft space. Soaring 14-foot ceilings and original exposed brick walls create an atmosphere of industrial chic, while modern amenities provide all the comforts of contemporary living. Custom lighting throughout highlights the perfect marriage of historic character and modern design.',
    features: [
      '14-Foot Ceilings with Original Beam Work',
      'Custom Architectural Lighting Package',
      'Chef-Inspired Kitchen with Waterfall Island',
      'Private Rooftop Access with City Views'
    ],
  },
  {
    id: 15,
    title: 'Woodland Estate',
    location: '500 Forest Lane, Chatham, ON N7M 5R2',
    price: 1299000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 3200,
    type: 'house',
    mainImage: '/assets/properties/15/main.jpg',
    images: ['/assets/properties/15/1.jpg', '/assets/properties/15/2.jpg', '/assets/properties/15/3.jpg', '/assets/properties/15/4.jpg'],
    description: 'Nestled on a private wooded estate, this magnificent residence offers the ultimate in luxury living. The resort-style grounds feature a stunning pool complex, professional tennis court, and extensive gardens. Inside, the home showcases exceptional craftsmanship with a state-of-the-art home theater and separate guest quarters.',
    features: [
      'Resort-Style Pool with Cabana and Hot Tub',
      'Professional-Grade Tennis Court',
      'THX-Certified Home Theater',
      'Separate Guest House with Full Kitchen'
    ],
  },
  {
    id: 16,
    title: 'Riverfront Townhouse',
    location: '250 River Walk Way, Chatham, ON N7M 5N1',
    price: 529000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1700,
    type: 'house',
    mainImage: '/assets/properties/16/main.jpg',
    images: ['/assets/properties/16/1.jpg', '/assets/properties/16/2.jpg', '/assets/properties/16/3.jpg', '/assets/properties/16/4.jpg'],
    description: 'Embrace waterfront living in this contemporary townhouse with private dock access. The open-concept design maximizes river views from every level, while the rooftop patio provides an exceptional outdoor entertainment space. Modern updates throughout create a perfect blend of style and functionality.',
    features: [
      'Private Dock with Deep Water Access',
      'Rooftop Entertainment Deck with River Views',
      'Custom Kitchen with Wine Fridge',
      'Integrated Indoor-Outdoor Sound System'
    ],
  },
  {
    id: 17,
    title: 'Victorian Grandeur',
    location: '325 Victoria Ave, Chatham, ON N7M 1Z8',
    price: 749000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2300,
    type: 'house',
    mainImage: '/assets/properties/17/main.jpg',
    images: ['/assets/properties/17/1.jpg', '/assets/properties/17/2.jpg', '/assets/properties/17/3.jpg', '/assets/properties/17/4.jpg'],
    description: 'Step back in time with this magnificent Victorian masterpiece. The wraparound porch and ornate architectural details showcase the home\'s historic character, while thoughtful updates provide modern comfort. The restored carriage house offers additional space for a home office or studio.',
    features: [
      'Restored Original Victorian Details',
      'Wraparound Porch with Period Railings',
      'English-Style Perennial Gardens',
      'Converted Carriage House with Studio Space'
    ],
  },
  {
    id: 18,
    title: 'Park Place Residence',
    location: '450 Park Place Circle, Chatham, ON N7M 0B2',
    price: 399900,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1050,
    type: 'condo',
    mainImage: '/assets/properties/18/main.jpg',
    images: ['/assets/properties/18/1.jpg', '/assets/properties/18/2.jpg', '/assets/properties/18/3.jpg', '/assets/properties/18/4.jpg'],
    description: 'Experience refined living in this luxury Park Place condominium. Floor-to-ceiling windows frame stunning park views, while premium amenities cater to an active lifestyle. The thoughtfully designed interior features high-end finishes and an optimal layout for both relaxation and entertaining.',
    features: [
      'Unobstructed Park and City Views',
      'State-of-the-art Fitness Center',
      'Private Event Space with Catering Kitchen',
      'Secured Guest Parking with Valet Service'
    ],
  },
  {
    id: 19,
    title: 'Grand Avenue Classic',
    location: '275 Grand Ave E, Chatham, ON N7L 1R2',
    price: 549000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1900,
    type: 'house',
    mainImage: '/assets/properties/19/main.jpg',
    images: ['/assets/properties/19/1.jpg', '/assets/properties/19/2.jpg', '/assets/properties/19/3.jpg', '/assets/properties/19/4.jpg'],
    description: 'Discover the perfect blend of classic charm and modern comfort in this Grand Avenue gem. Situated on a tree-lined street, this family home features restored hardwood floors, a cozy fireplace, and a professionally finished basement. The private backyard garden creates a peaceful retreat in the heart of the city.',
    features: [
      'Original Restored Hardwood Throughout',
      'Wood-burning Fireplace with Custom Mantel',
      'Professional Home Theater Room',
      'Private Garden with Stone Patio'
    ],
  },
  {
    id: 20,
    title: 'Wellington Street Estate',
    location: '200 Wellington St W, Chatham, ON N7M 1J4',
    price: 579000,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 1600,
    type: 'house',
    mainImage: '/assets/properties/20/main.jpg',
    images: ['/assets/properties/20/1.jpg', '/assets/properties/20/2.jpg', '/assets/properties/20/3.jpg', '/assets/properties/20/4.jpg'],
    description: 'Welcome to this beautifully updated family home in the prestigious Wellington Street district. The gourmet kitchen and dedicated home office cater to modern living, while the spacious layout and premium finishes create an atmosphere of refined comfort. The private backyard offers the perfect space for outdoor entertaining.',
    features: [
      'Gourmet Kitchen with Custom Cabinetry',
      'Private Home Office with Built-ins',
      'Composite Deck with Built-in Lighting',
      'Oversized Garage with Workshop Space'
    ],
  },
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Properties API with mock data
export const listingsAPI = {
  async getProperties(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let filteredProperties = [...mockProperties];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProperties = filteredProperties.filter(
        property => property.price >= min && property.price <= max
      );
    }

    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(
        property => property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    if (filters.bathrooms) {
      filteredProperties = filteredProperties.filter(
        property => property.bathrooms >= parseInt(filters.bathrooms)
      );
    }

    if (filters.propertyType) {
      filteredProperties = filteredProperties.filter(
        property => property.type === filters.propertyType
      );
    }

    return filteredProperties;
  },

  async getPropertyById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const property = mockProperties.find(p => p.id === parseInt(id));
    if (!property) {
      throw new Error('Property not found');
    }

    return {
      ...property,
      agent: {
        name: 'Sarah Johnson',
        title: 'Senior Real Estate Agent',
        image: '/assets/agent.jpg',
        phone: '(555) 123-4567',
        email: 'sarah.johnson@intellisync.com'
      },
      location: {
        address: property.location.split(',')[0],
        city: 'Chatham',
        state: 'ON',
        zip: property.location.match(/N\d[A-Z] \d[A-Z]\d/)[0]
      }
    };
  },

  async getFeaturedProperties() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return first 3 properties as featured
    return mockProperties.slice(0, 3);
  }
};

// Mock testimonial data
export const mockTestimonials = [
  {
    id: 1,
    name: 'Sarah & James Mitchell',
    role: 'First-Time Homebuyers',
    image: '/assets/testimonials/1.jpg',
    content: 'Our experience was nothing short of amazing. The attention to detail and personalized service made our first home-buying journey a breeze. We found our dream starter home within our budget, and the entire process was smooth and stress-free.',
    rating: 5,
    property: 'Park View Haven',
    date: '2023-12-01'
  },
  {
    id: 2,
    name: 'Robert Thompson',
    role: 'Property Investor',
    image: '/assets/testimonials/2.jpg',
    content: 'As an experienced investor, I appreciate working with professionals who understand the market. Their deep knowledge of Chatham\'s real estate market and investment opportunities has helped me expand my portfolio significantly.',
    rating: 5,
    property: 'Downtown Luxury Condo',
    date: '2023-11-15'
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Downtown Professional',
    image: '/assets/testimonials/3.jpg',
    content: 'The team went above and beyond to help me find the perfect downtown loft. Their expertise in urban properties and understanding of my lifestyle needs made the search process efficient and enjoyable.',
    rating: 5,
    property: 'Historic District Loft',
    date: '2023-10-28'
  },
  {
    id: 4,
    name: 'David & Maria Rodriguez',
    role: 'Growing Family',
    image: '/assets/testimonials/4.jpg',
    content: 'We needed a larger home for our growing family, and they delivered beyond our expectations. They found us a beautiful property in a family-friendly neighborhood, with great schools nearby. Their negotiation skills saved us thousands!',
    rating: 5,
    property: 'Family Home in Chatham South',
    date: '2023-12-05'
  },
  {
    id: 5,
    name: 'Patricia Anderson',
    role: 'Luxury Home Buyer',
    image: '/assets/testimonials/5.jpg',
    content: 'The luxury home market requires a special touch, and this team has it. Their exclusive listings and connections in the high-end market helped me find a truly exceptional property. The attention to detail during the entire process was impeccable.',
    rating: 5,
    property: 'Woodland Estate',
    date: '2023-11-20'
  },
  {
    id: 6,
    name: 'Michael & Sophie Williams',
    role: 'Downsizing Couple',
    image: '/assets/testimonials/6.jpg',
    content: 'Downsizing was a big decision for us, but they made the transition seamless. They helped us find the perfect condo that fits our new lifestyle while maintaining the luxury amenities we\'re accustomed to.',
    rating: 5,
    property: 'Luxury Downtown Condo',
    date: '2023-09-15'
  }
];

// Testimonials API with mock data
export const testimonialsAPI = {
  async getAllTestimonials() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockTestimonials;
  },

  async getFeaturedTestimonials() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockTestimonials.slice(0, 3);
  }
};

// Contact API with mock implementation
export const contactAPI = {
  async submitContactForm(contactData) {
    // In development, simulate success
    if (import.meta.env.MODE === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Contact form submitted:', contactData);
          resolve({ success: true, message: 'Message sent successfully!' });
        }, 1000);
      });
    }
    
    return fetchAPI('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  async scheduleViewing(viewingData) {
    // In development, simulate success
    if (import.meta.env.MODE === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Viewing scheduled:', viewingData);
          resolve({ success: true, message: 'Viewing scheduled successfully!' });
        }, 1000);
      });
    }
    
    return fetchAPI('/viewings', {
      method: 'POST',
      body: JSON.stringify(viewingData),
    });
  },
};
