const fs = require('fs');
const path = require('path');

const destDir = 'E:/ss_webiste/public/images';
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const brainDir = 'C:/Users/JACOB/.gemini/antigravity-ide/brain/96bf3022-fc5f-40f4-828e-854e87551ddc';
const imageMap = [
  { prefix: 'hero_resin_art_banner', name: 'hero_banner.jpg' },
  { prefix: 'resin_ocean_clock_3d', name: 'ocean_clock_hero.jpg' },
  { prefix: 'resin_monogram_stand', name: 'monogram_rs.jpg' },
  { prefix: 'resin_bangle_jewelry', name: 'floral_bangle.jpg' },
  { prefix: 'resin_photo_frame', name: 'scallop_frame.jpg' },
  { prefix: 'resin_pen_hamper', name: 'luxury_hamper.jpg' }
];

if (fs.existsSync(brainDir)) {
  const files = fs.readdirSync(brainDir);
  imageMap.forEach(item => {
    const match = files.find(f => f.startsWith(item.prefix) && f.endsWith('.jpg'));
    if (match) {
      fs.copyFileSync(path.join(brainDir, match), path.join(destDir, item.name));
      console.log(`Copied ${match} to ${item.name}`);
    }
  });
}

const catalog = [
  {
    id: 1,
    title: '3D Ocean Wave Epoxy Resin Wall Clock',
    category: 'Ocean Clocks',
    price: '₹2,499',
    originalPrice: '₹3,200',
    path: '/images/ocean_clock_hero.jpg',
    description: 'Bespoke 3D ocean wave clock featuring real golden beach sand, seashells, and 3D resin foam lacing.',
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 128,
    is3DModelAvailable: true,
    modelType: 'clock'
  },
  {
    id: 2,
    title: 'Custom Couple Initial Monogram "R&S" Stand',
    category: 'Monograms & Names',
    price: '₹1,299',
    originalPrice: '₹1,699',
    path: '/images/monogram_rs.jpg',
    description: 'High clarity crystal resin letters with real preserved red rose petals and 24K gold foil flakes.',
    badge: 'Popular',
    rating: 5.0,
    reviewsCount: 94,
    is3DModelAvailable: true,
    modelType: 'monogram'
  },
  {
    id: 3,
    title: 'Preserved Floral Resin Bangle & Jewelry',
    category: 'Bangles & Jewelry',
    price: '₹599',
    originalPrice: '₹899',
    path: '/images/floral_bangle.jpg',
    description: 'Ultra-clear curved resin bracelet encapsulated with dried botanical petals and gold foil shimmer.',
    badge: 'Trending',
    rating: 4.8,
    reviewsCount: 76,
    is3DModelAvailable: true,
    modelType: 'bangle'
  },
  {
    id: 4,
    title: 'Pearlescent Scalloped Floral Photo Frame',
    category: 'Photo Frames & Coasters',
    price: '₹1,499',
    originalPrice: '₹1,899',
    path: '/images/scallop_frame.jpg',
    description: 'Handcrafted pearl-bordered resin frame decorated with preserved wildflowers and personal photo insert.',
    badge: 'New',
    rating: 4.9,
    reviewsCount: 62,
    is3DModelAvailable: true,
    modelType: 'frame'
  },
  {
    id: 5,
    title: 'Luxury Resin Executive Gift Box Hamper',
    category: 'Pens & Hampers',
    price: '₹2,999',
    originalPrice: '₹3,999',
    path: '/images/luxury_hamper.jpg',
    description: 'Curated wooden hamper with resin pen, floral lockets, photo block, and handmade scented candle.',
    badge: 'Exclusive',
    rating: 5.0,
    reviewsCount: 110,
    is3DModelAvailable: true,
    modelType: 'hamper'
  },
  {
    id: 6,
    title: 'SS Creation 0118 Official Master Flyer',
    category: 'Brochure',
    price: 'Contact Us',
    originalPrice: '',
    path: '/images/hero_banner.jpg',
    description: 'Complete brochure detailing our product lineup: Bouquets, Earrings, Keychains, Lockets, Moulds, Bangles, Pens, Hampers.',
    badge: 'Official',
    rating: 5.0,
    reviewsCount: 200,
    is3DModelAvailable: false
  },
  {
    id: 7,
    title: 'Preserved Bridal Varmala Flower Pyramid',
    category: 'Photo Frames & Coasters',
    price: '₹2,899',
    originalPrice: '₹3,500',
    path: '/images/scallop_frame.jpg',
    description: 'Preserve your wedding varmala garland flowers inside a crystal-clear 3D resin memory pyramid.',
    badge: 'Custom Order',
    rating: 4.9,
    reviewsCount: 45,
    is3DModelAvailable: true,
    modelType: 'pyramid'
  },
  {
    id: 8,
    title: 'Golden Rose Petal Resin Locket & Chain',
    category: 'Bangles & Jewelry',
    price: '₹699',
    originalPrice: '₹999',
    path: '/images/monogram_rs.jpg',
    description: 'Heart-shaped resin necklace pendant with gold-plated chain and real miniature rosebud.',
    badge: 'Hot Seller',
    rating: 4.7,
    reviewsCount: 88,
    is3DModelAvailable: true,
    modelType: 'pendant'
  },
  {
    id: 9,
    title: 'Handcrafted Resin Floral Pen Set',
    category: 'Pens & Hampers',
    price: '₹899',
    originalPrice: '₹1,199',
    path: '/images/luxury_hamper.jpg',
    description: 'Smooth writing ballpoint pen filled with floating botanicals and gold leaf accents.',
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 53,
    is3DModelAvailable: false
  }
];

fs.writeFileSync(path.join(destDir, 'catalog.json'), JSON.stringify(catalog, null, 2));
console.log('Catalog created with', catalog.length, 'entries');
