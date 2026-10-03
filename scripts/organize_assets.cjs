const fs = require('fs');
const path = require('path');

const srcDir = 'E:/ss_webiste/assets/images';
const destDir = 'E:/ss_webiste/public/images';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy brain artifacts if available
const brainDir = 'C:/Users/JACOB/.gemini/antigravity-ide/brain/96bf3022-fc5f-40f4-828e-854e87551ddc';
if (fs.existsSync(brainDir)) {
  const brainFiles = fs.readdirSync(brainDir);
  brainFiles.forEach(file => {
    if (file.startsWith('hero_resin_art_banner')) {
      fs.copyFileSync(path.join(brainDir, file), path.join(destDir, 'hero_banner.jpg'));
    }
    if (file.startsWith('resin_ocean_clock_3d')) {
      fs.copyFileSync(path.join(brainDir, file), path.join(destDir, 'ocean_clock_hero.jpg'));
    }
  });
}

if (!fs.existsSync(srcDir)) {
  console.log('srcDir does not exist');
  process.exit(0);
}

const files = fs.readdirSync(srcDir);
const images = files.filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));

const imageCatalog = [
  {
    id: 0,
    filename: 'hero_banner.jpg',
    path: '/images/hero_banner.jpg',
    title: 'SS   Resinarts Studio Collection',
    category: 'Hero Showcase',
    price: 'Custom Pricing',
    description: 'Luxury handcrafted resin art collection featuring ocean clocks, monograms, and dried floral jewelry.',
    rating: 5.0,
    reviewsCount: 142
  },
  {
    id: 100,
    filename: 'ocean_clock_hero.jpg',
    path: '/images/ocean_clock_hero.jpg',
    title: '3D Ocean Wave Crystal Resin Clock',
    category: 'Ocean Clocks',
    price: '₹2,499',
    description: 'Swirling turquoise ocean waves with real beach sand, seashells, and gold Roman numeral indicators.',
    rating: 4.9,
    reviewsCount: 89
  }
];

const categoryMapping = [
  { title: 'Official SS   Resinarts Brochure', category: 'Brochure', price: 'Contact Us', desc: 'Complete product catalog & custom order details flyer.' },
  { title: 'Custom Couple Monogram R&S Stand', category: 'Monograms & Names', price: '₹1,299', desc: 'Real preserved red rose petals and 24K leaf gold flakes embedded in crystal resin.' },
  { title: 'Mother & Child Resin Pearl Photo Frame', category: 'Photo Frames & Coasters', price: '₹1,499', desc: 'Handcrafted scalloped frame decorated with freshwater pearls and dried wildflowers.' },
  { title: 'Rose Petal & Gold Leaf Resin Bangle', category: 'Bangles & Jewelry', price: '₹599', desc: 'Ultra-glossy clear resin bangle infused with magenta petals and gold foil sparkles.' },
  { title: 'Custom Floral Memory Preserved Frame', category: 'Photo Frames & Coasters', price: '₹1,699', desc: 'Preserve wedding/anniversary flowers forever inside high-refraction resin.' },
  { title: 'Crystal Floral Hexagon Coaster Set', category: 'Photo Frames & Coasters', price: '₹799', desc: 'Set of 4 heat-resistant resin coasters with embedded dried daisy blooms.' },
  { title: 'Golden Petal Resin Pen & Executive Stand', category: 'Pens & Hampers', price: '₹899', desc: 'Smooth black ink ballpoint pen with dried flowers encapsulated inside clear resin casing.' },
  { title: 'Preserved Bridal Rose Resin Locket', category: 'Bangles & Jewelry', price: '₹699', desc: 'Heart-shaped resin necklace pendant with gold chain and micro rosebuds.' },
  { title: 'Turquoise Reef Epoxy Wall Clock', category: 'Ocean Clocks', price: '₹2,499', desc: '3D layered lacing ocean foam effect with high gloss UV resistant epoxy.' },
  { title: 'Custom Initial & Date Resin Stand', category: 'Monograms & Names', price: '₹1,599', desc: 'Personalized anniversary gift stand with customized initials and date.' },
  { title: 'Heart Floral Resin Pendant', category: 'Bangles & Jewelry', price: '₹499', desc: 'Charming mini heart pendant with dried yellow and pink wildflowers.' },
  { title: 'Resin Crafting & DIY Silicone Mold Set', category: 'Pens & Hampers', price: '₹999', desc: 'Silicone molds and resin starter supplies for DIY creators.' },
  { title: 'Luxury Resin Keepsake Gift Hamper Box', category: 'Pens & Hampers', price: '₹2,999', desc: 'Curated gift set including resin pen, photo frame, keychain, and candle.' },
  { title: 'Floral Bookmark & Keychain Combo', category: 'Bangles & Jewelry', price: '₹449', desc: 'Personalized letter keychain with matching floral bookmark.' },
  { title: 'Golden Leaf Resin Ring Holder Pyramid', category: 'Photo Frames & Coasters', price: '₹649', desc: 'Ring dish pyramid with floating gold leaf and pressed lavender.' },
  { title: 'Preserved Varmala Garland Resin Frame', category: 'Photo Frames & Coasters', price: '₹2,899', desc: 'Transform bridal garland flowers into a lifetime memory heirloom block.' },
  { title: 'Ocean Breeze Coaster & Tray Set', category: 'Ocean Clocks', price: '₹1,899', desc: 'Beach themed resin tray with matching ocean wave drink coasters.' },
  { title: 'Custom Name Resin Desk Nameplate', category: 'Monograms & Names', price: '₹1,799', desc: 'Executive desk plaque with gold metallic lettering and dried botanicals.' },
  { title: 'Resin Earnings & Jewelry Gift Set', category: 'Bangles & Jewelry', price: '₹799', desc: 'Handcrafted floral drop earrings with gold hooks.' },
  { title: 'Vintage Rose Petal Resin Memory Cube', category: 'Photo Frames & Coasters', price: '₹1,399', desc: 'Transparent 3D cubic resin block encapsulating deep red rose.' },
  { title: 'Couple Initial Keychains Pair', category: 'Bangles & Jewelry', price: '₹549', desc: 'Matching pair of initial keychains with gold foil accents.' },
  { title: 'Custom Photo Resin LED Lamp Stand', category: 'Photo Frames & Coasters', price: '₹2,199', desc: 'Illuminated resin photo block on warm LED wooden base.' }
];

images.forEach((file, index) => {
  const cleanName = `whatsapp_img_${index + 1}.jpg`;
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, cleanName);
  fs.copyFileSync(srcPath, destPath);

  const meta = categoryMapping[index] || {
    title: `Handcrafted Resin   #${index + 1}`,
    category: 'Bangles & Jewelry',
    price: '₹799',
    desc: 'Unique handcrafted resin art made with love and premium epoxy.'
  };

  imageCatalog.push({
    id: index + 1,
    originalName: file,
    filename: cleanName,
    path: `/images/${cleanName}`,
    title: meta.title,
    category: meta.category,
    price: meta.price,
    description: meta.desc,
    rating: (4.7 + (index % 4) * 0.1).toFixed(1),
    reviewsCount: 15 + index * 7
  });
});

fs.writeFileSync(path.join(destDir, 'catalog.json'), JSON.stringify(imageCatalog, null, 2));
console.log(`Copied ${images.length} images and generated catalog.json with ${imageCatalog.length} entries.`);
