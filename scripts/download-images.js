import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const propertyTypes = {
  'heritage-home': [
    'photo-1518780664697-55e3ad937233',
    'photo-1512917774080-9991f1c4c750',
    'photo-1600047509807-ba8f99d2cdde',
    'photo-1600585154526-990dced4db0d',
    'photo-1600047509358-9dc75507daeb'
  ],
  'modern-condo': [
    'photo-1545324418-cc1a3fa10c00',
    'photo-1567496898669-ee935f5f647a',
    'photo-1600607687939-ce8a6c25118c',
    'photo-1600566753190-17f0baa2a6c3',
    'photo-1522708323590-d24dbb6b0267'
  ],
  'family-home': [
    'photo-1564013799919-ab600027ffc6',
    'photo-1600585154340-be6161a56a0c',
    'photo-1600573472592-401b489a3cdc',
    'photo-1600596542815-ffad4c1539a9',
    'photo-1583608205776-bfd35f0d9f83'
  ],
  'luxury-estate': [
    'photo-1600566753086-00f18fb6b3ea',
    'photo-1605276374104-dee2a0ed3cd6',
    'photo-1576941089067-2de3c901e126',
    'photo-1560448204-e02f11c3d0e2',
    'photo-1600047509807-ba8f99d2cdde'
  ]
};

const baseDir = path.join(__dirname, '..', 'src', 'assets', 'properties');

// Create base directory if it doesn't exist
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Download image from Unsplash
const downloadImage = (photoId, filename) => {
  return new Promise((resolve, reject) => {
    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800`;
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filename);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filename, () => reject(err));
      });
    }).on('error', reject);
  });
};

// Process each property
async function downloadPropertyImages() {
  for (let i = 1; i <= 20; i++) {
    const propertyDir = path.join(baseDir, i.toString());
    
    // Create property directory
    if (!fs.existsSync(propertyDir)) {
      fs.mkdirSync(propertyDir, { recursive: true });
    }

    // Select property type based on index
    const types = Object.keys(propertyTypes);
    const typeIndex = (i - 1) % types.length;
    const propertyType = types[typeIndex];
    const photos = propertyTypes[propertyType];

    console.log(`Downloading images for property ${i} (${propertyType})...`);

    try {
      // Download main image
      await downloadImage(
        photos[0],
        path.join(propertyDir, 'main.jpg')
      );

      // Download additional images
      for (let j = 1; j <= 4; j++) {
        await downloadImage(
          photos[j % photos.length],
          path.join(propertyDir, `${j}.jpg`)
        );
      }
      console.log(`✓ Property ${i} images downloaded`);
    } catch (error) {
      console.error(`Error downloading images for property ${i}:`, error);
    }
  }
}

downloadPropertyImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch((error) => {
  console.error('Error downloading images:', error);
});
