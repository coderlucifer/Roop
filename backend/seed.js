import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({});

const products = [
  {
    productId: "m1",
    image: "/images/maleModels/alexis-amz-da-cruz-YniSLZ56SNs-unsplash.jpg",
    name: "Classic Overcoat",
    category: "Men",
    price: "₹15,999",
    tag: "WINTER",
    description: "A timeless classic overcoat crafted from premium wool blend. Designed for sophistication and warmth during colder months.",
    details: ["80% Wool, 20% Nylon", "Notch lapel", "Single breasted", "Dry clean only"]
  },
  {
    productId: "m2",
    image: "/images/maleModels/christopher-campbell-rojFrRYRvb4-unsplash.jpg",
    name: "Midnight Linen Blazer",
    category: "Men",
    price: "₹6,999",
    tag: "NEW",
    description: "Crafted from pure linen, this midnight blazer is the epitome of effortless elegance. Tailored for a relaxed yet refined fit.",
    details: ["100% Premium Linen", "Tailored relaxed fit", "Notch lapels", "Dry clean only"]
  },
  {
    productId: "m3",
    image: "/images/maleModels/ionut-roman-65mAXnEMiuQ-unsplash.jpg",
    name: "Relaxed Fit Trousers",
    category: "Men",
    price: "₹3,999",
    description: "The essential modern trouser. Cut with a slight taper and a comfortable mid-rise, blending comfort with a sharp silhouette.",
    details: ["Cotton-blend twill", "Slight taper", "Pleated front", "Machine washable"]
  },
  {
    productId: "m4",
    image: "/images/maleModels/jessica-fox-wmDI2r_uaDE-unsplash.jpg",
    name: "Urban Utility Jacket",
    category: "Men",
    price: "₹8,499",
    tag: "HOT",
    description: "Built for the city. Features multiple pockets and a weather-resistant exterior without compromising on luxury styling.",
    details: ["Water-resistant finish", "Multiple cargo pockets", "Hidden zip placket"]
  },
  {
    productId: "m5",
    image: "/images/maleModels/manny-moreno-pidhWc7zHjA-unsplash.jpg",
    name: "Essential White Tee",
    category: "Men",
    price: "₹1,499",
    description: "The perfect t-shirt exists. Medium weight, exceptionally soft, and cut for a flattering, slightly structured fit.",
    details: ["100% Supima Cotton", "Crew neck", "Pre-shrunk", "Made in India"]
  },
  {
    productId: "m6",
    image: "/images/maleModels/onur-senay-OHdk91MEHM0-unsplash.jpg",
    name: "Textured Knit Polo",
    category: "Men",
    price: "₹4,299",
    description: "A refined take on the classic polo. Knitted from breathable cotton-silk blend with subtle textural details.",
    details: ["Silk-cotton blend", "Ribbed trims", "Three-button placket"]
  },
  {
    productId: "m7",
    image: "/images/maleModels/or-hakim-G4QN85HfuvQ-unsplash.jpg",
    name: "Cotton Mandarin Shirt",
    category: "Men",
    price: "₹2,999",
    description: "A minimalist staple. Features a clean mandarin collar, hidden button placket, and a soft, breathable cotton weave.",
    details: ["100% Organic Cotton", "Mandarin collar", "Hidden placket"]
  },
  {
    productId: "m8",
    image: "/images/maleModels/or-hakim-rdPJO8fvM6U-unsplash.jpg",
    name: "Tailored Formal Suit",
    category: "Men",
    price: "₹28,999",
    tag: "PREMIUM",
    description: "Exquisite tailoring meets modern design. This complete suit is cut from Italian wool for the ultimate boardroom statement.",
    details: ["100% Virgin Wool", "Includes jacket and trousers", "Fully lined jacket"]
  },
  {
    productId: "m9",
    image: "/images/maleModels/owen-vangioni-G7vompVCBXA-unsplash.jpg",
    name: "Structured Wool Coat",
    category: "Men",
    price: "₹18,999",
    tag: "LIMITED",
    description: "A structural triumph. This structured wool coat offers uncompromising warmth and a stark, powerful silhouette.",
    details: ["80% Wool, 20% Cashmere", "Oversized lapels", "Double breasted"]
  },
  {
    productId: "m10",
    image: "/images/maleModels/sami-sadeghi-oLhCh226KjI-unsplash.jpg",
    name: "Casual Denim Shirt",
    category: "Men",
    price: "₹3,499",
    description: "Your weekend essential. Washed down for immediate softness and a perfectly lived-in vintage feel.",
    details: ["100% Cotton Denim", "Snap button closures", "Twin chest pockets"]
  },
  {
    productId: "f1",
    image: "/images/femaleModels/anton-titov-H9-uNO9NroQ-unsplash.jpg",
    name: "Embroidered Anarkali",
    category: "Women",
    price: "₹12,999",
    tag: "NEW",
    description: "A masterpiece of traditional craftsmanship. This sweeping Anarkali features intricate zardosi embroidery.",
    details: ["Georgette blend", "Heavy zardosi embroidery", "Full flared silhouette"]
  },
  {
    productId: "f2",
    image: "/images/femaleModels/cody-black-SUuvXyJVHs8-unsplash.jpg",
    name: "Silk Drape Kurta",
    category: "Women",
    price: "₹8,499",
    tag: "HOT",
    description: "A breathtaking reimagining of the classic kurta. Made from fluid silk that drapes gracefully with metallic threadwork.",
    details: ["100% Pure Silk", "Asymmetric drape", "Hand-embroidered details"]
  },
  {
    productId: "f3",
    image: "/images/femaleModels/eve-maier-u1OuYQa0WtQ-unsplash.jpg",
    name: "Festive Lehenga Set",
    category: "Women",
    price: "₹32,000",
    tag: "LUXE",
    description: "Celebrate in unparalleled style. A three-piece lehenga set featuring voluminous skirts and intricate mirror work.",
    details: ["Raw silk blouse", "Net dupatta", "Mirror and thread embroidery"]
  },
  {
    productId: "f4",
    image: "/images/femaleModels/kristijan-arsov-7QZtR50VQJE-unsplash.jpg",
    name: "Chanderi Silk Dupatta",
    category: "Women",
    price: "₹4,499",
    description: "An ethereal addition to any ensemble. Handwoven in Chanderi, featuring delicate gold zari motifs scattered across sheer silk.",
    details: ["Chanderi Silk", "Zari woven motifs", "Hand-finished tassels"]
  },
  {
    productId: "f5",
    image: "/images/femaleModels/priscilla-du-preez-0jQx_UyRTp4-unsplash.jpg",
    name: "Summer Linen Dress",
    category: "Women",
    price: "₹5,999",
    description: "Breezy and beautiful. A quintessential summer dress cut from airy linen with a flattering cinched waist.",
    details: ["100% Linen", "Midi length", "Side pockets", "Breathable fabric"]
  },
  {
    productId: "f6",
    image: "/images/femaleModels/rendy-novantino-MhGiGFHz-8Y-unsplash.jpg",
    name: "Velvet Evening Gown",
    category: "Women",
    price: "₹24,999",
    tag: "LUXE",
    description: "Pure glamour. Deep, lustrous velvet cut to flatter, featuring a daring sweetheart neckline and a dramatic sweeping train.",
    details: ["Premium silk-velvet", "Boning for support", "Concealed back zip"]
  },
  {
    productId: "f7",
    image: "/images/femaleModels/sofia-lasheva-cSaL2UGfcoY-unsplash.jpg",
    name: "Satin Slip Dress",
    category: "Women",
    price: "₹6,499",
    description: "Effortless elegance. A bias-cut satin slip dress that hugs the contours beautifully, perfect for evening soirees.",
    details: ["Silk-satin blend", "Cowl neckline", "Adjustable straps"]
  },
  {
    productId: "f8",
    image: "/images/femaleModels/soroush-golpoor-Jy2DD80IdAg-unsplash.jpg",
    name: "Contemporary Saree",
    category: "Women",
    price: "₹16,500",
    tag: "TRENDING",
    description: "A modern twist on a timeless classic. Pre-draped for convenience without losing any of the traditional grace.",
    details: ["Crepe silk", "Pre-stitched pleats", "Includes embellished blouse piece"]
  },
  {
    productId: "f9",
    image: "/images/femaleModels/uttam-lakra-4lVN0zwFb2M-unsplash.jpg",
    name: "Handloom Cotton Kurti",
    category: "Women",
    price: "₹2,499",
    description: "Everyday comfort rooted in tradition. Handwoven cotton kurti featuring subtle block prints.",
    details: ["100% Handloom Cotton", "Block printed", "Straight fit"]
  },
  {
    productId: "f10",
    image: "/images/femaleModels/yigit-arisoy-CWYo0aAikGI-unsplash.jpg",
    name: "Statement Trench Coat",
    category: "Women",
    price: "₹14,999",
    tag: "LIMITED",
    description: "Your armor for the elements. A classic trench coat reimagined with exaggerated lapels and premium gabardine fabric.",
    details: ["Water-resistant gabardine", "Double breasted", "Removable belt"]
  },
  {
    productId: "a1",
    image: "/images/Accessories/moises-gonzalez-3nM6BebX_58-unsplash.jpg",
    name: "Leather Satchel",
    category: "Accessories",
    price: "₹14,500",
    description: "A daily companion built to last a lifetime. Crafted from vegetable-tanned full-grain leather.",
    details: ["Full-grain leather", "Brass hardware", "Adjustable strap"]
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing products
  await prisma.product.deleteMany({});
  
  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
