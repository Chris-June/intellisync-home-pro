const fs = require('fs');
const path = require('path');
const { listingsAPI } = require('../src/services/api');

const BASE_URL = 'https://home.intellisyncsolutions.io';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

async function generateSitemap() {
  try {
    // Get all property listings
    const listings = await listingsAPI.getListings();
    
    // Static routes
    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/listings', priority: '0.9', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/testimonials', priority: '0.7', changefreq: 'weekly' },
    ];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
  ${listings.map(listing => `
  <url>
    <loc>${BASE_URL}/property/${listing.id}</loc>
    <lastmod>${new Date(listing.updatedAt || listing.createdAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    // Write sitemap to file
    fs.writeFileSync(SITEMAP_PATH, sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Run the generator
generateSitemap();
