import { Product, StoreSettings, CategoryMeta } from '../types';

export const categoryMeta: CategoryMeta[] = [
  { key: 'all', label: 'All Products', icon: 'LayoutGrid' },
  { key: 'food cupboard', label: 'Food Cupboard', icon: 'Boxes' },
  { key: 'fresh food', label: 'Fresh Food', icon: 'Carrot' },
  { key: 'beverages', label: 'Beverages', icon: 'Coffee' },
  { key: 'baby & kids', label: 'Baby & Kids', icon: 'Baby' },
  { key: 'electronics', label: 'Electronics', icon: 'Plug' },
  { key: 'cleaning', label: 'Cleaning', icon: 'Sparkles' },
  { key: 'beauty', label: 'Beauty & Cosmetics', icon: 'Sparkles' },
  { key: 'liquor', label: 'Liquor & Spirits', icon: 'Wine', gated: true },
  { key: 'stationery', label: 'Stationery', icon: 'Pencil' },
  { key: 'pet', label: 'Pet Supplies', icon: 'PawPrint' },
  { key: 'hardware', label: 'Hardware', icon: 'Wrench' },
  { key: 'furniture', label: 'Furniture', icon: 'Armchair' }
];

export const defaultSettings: StoreSettings = {
  storeName: 'Kipchimatt Supermarket',
  storePhone: '+254 111 184 200',
  storeEmail: 'hello@kipchimatt.co.ke',
  freeDeliveryThreshold: 2000,
  deliveryFee: 99,
  lowStockThreshold: 15,
  seasonalThemeEnabled: true
};

export const defaultProducts: Product[] = [
  // FOOD CUPBOARD
  { 
    id: 1, 
    name: 'Dola Premium Maize Flour 2kg', 
    brand: 'Dola', 
    category: 'food cupboard', 
    price: 189, 
    originalPrice: 230, 
    stock: 150, 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    description: 'Dola Premium Maize Flour is finely milled from selected white corn under strict quality checks. It is ideal for cooking soft, fluffy and extremely nutritious Ugali—Kenya\'s national favorite staple. Packed with essential iron, zinc, and vitamins.',
    rating: 4.9,
    ratingCount: 142,
    specifications: {
      'Net Weight': '2 Kilograms (2kg)',
      'Grain Type': 'Premium White Maize',
      'Fortification': 'Iron, Zinc, Vitamin A, B1, B2, B3, B6, B12',
      'Origin': 'Milled in Eldoret, Kenya',
      'Shelf Life': '6 Months'
    },
    reviews: [
      { id: 'r1', userName: 'Mercy Achieng', rating: 5, comment: 'The softest Ugali I have ever cooked! Dola is my forever brand.', date: '2026-06-25T14:30:00.000Z' },
      { id: 'r2', userName: 'Kipkorir J.', rating: 5, comment: 'Clean, beautiful packaging, and super fast delivery from Kipchimatt.', date: '2026-06-28T09:15:00.000Z' }
    ]
  },
  { 
    id: 2, 
    name: 'Jogoo Maize Meal 2kg', 
    brand: 'Jogoo', 
    category: 'food cupboard', 
    price: 175, 
    originalPrice: 210, 
    stock: 120, 
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    description: 'Jogoo Maize Meal has been Kenya\'s trusted choice for generations. It offers excellent texture and traditional flavor for a heavy, satisfying Ugali meal. Fortified for healthy, active families.',
    rating: 4.7,
    ratingCount: 98,
    specifications: {
      'Net Weight': '2 Kilograms (2kg)',
      'Grain Type': 'Sifted Maize',
      'Manufacturer': 'Ungu Group Ltd',
      'Origin': 'Nairobi, Kenya',
      'Fortified': 'Yes'
    },
    reviews: [
      { id: 'r3', userName: 'Peter Kamau', rating: 5, comment: 'Jogoo is class. Heavy and traditional ugali.', date: '2026-06-15T18:45:00.000Z' }
    ]
  },
  { 
    id: 3, 
    name: 'Sunrice Basmati Rice 1kg', 
    brand: 'Sunrice', 
    category: 'food cupboard', 
    price: 289, 
    originalPrice: 350, 
    stock: 80, 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    description: 'Sunrice Pure Basmati Rice features extra-long, slender grains that elongate to twice their size when cooked. Characterized by an exquisite aroma and non-sticky texture, it is perfect for Biryani, Pilau, and plain rice delicacies.',
    rating: 4.8,
    ratingCount: 76,
    specifications: {
      'Net Weight': '1 Kilogram',
      'Rice Type': 'Pure Basmati Rice',
      'Grain Length': 'Exceeds 8.2 mm',
      'Aroma': 'Rich Natural Pandan Aroma',
      'Origin': 'Imported from Punjab Plains'
    },
    reviews: [
      { id: 'r4', userName: 'Fatuma Hassan', rating: 5, comment: 'Perfect aroma. Excellent length for making luxury pilau!', date: '2026-06-20T11:20:00.000Z' }
    ]
  },
  { 
    id: 4, 
    name: 'Nescafe Classic Instant Coffee 100g', 
    brand: 'Nescafe', 
    category: 'food cupboard', 
    price: 349, 
    originalPrice: 420, 
    stock: 60, 
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    description: 'Start your Kenyan mornings with the bold, rich aroma of Nescafe Classic. Made from 100% pure Robusta and Arabica coffee beans, carefully roasted to release dark, premium coffee notes.',
    rating: 4.6,
    ratingCount: 110,
    specifications: {
      'Net Weight': '100g Glass Jar',
      'Coffee Type': '100% Soluble Coffee Granules',
      'Roast Level': 'Medium-Dark Roast',
      'Manufacturer': 'Nestle SA',
      'Servings': 'Approx 50 cups'
    }
  },
  { 
    id: 5, 
    name: 'Royco Mchuzi Mix Beef 500g', 
    brand: 'Royco', 
    category: 'food cupboard', 
    price: 129, 
    originalPrice: 165, 
    stock: 200, 
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&h=400&fit=crop',
    description: 'Royco Mchuzi Mix Beef is an all-in-one culinary helper containing natural spices like garlic, coriander, turmeric, and cumin. It thickens your stews, darkens the gravy, and adds an irresistible meaty aroma and flavor.',
    rating: 4.8,
    ratingCount: 190,
    specifications: {
      'Net Weight': '500 Grams Tub',
      'Flavor Profile': 'Classic Beef Stew',
      'Ingredients': 'Salt, Cornstarch, Coriander, Metanil Yellow, Turmeric, Cumin',
      'Origin': 'Unilever Kenya Ltd'
    }
  },
  { 
    id: 6, 
    name: 'Kingsmill Fresh White Bread 400g', 
    brand: 'Kingsmill', 
    category: 'food cupboard', 
    price: 65, 
    originalPrice: 80, 
    stock: 90, 
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    description: 'Baked fresh daily at dawn and delivered immediately to Kipchimatt aisles. Kingsmill Toasting Bread is incredibly soft, with perfectly sliced square margins ready for buttering or making breakfast sandwiches.',
    rating: 4.5,
    ratingCount: 44,
    specifications: {
      'Weight': '400g Sliced',
      'Type': 'White Toasting Bread',
      'Allergy Warning': 'Contains Wheat Gluten',
      'Daily Freshness': 'Baked daily at 3:00 AM'
    }
  },
  { 
    id: 7, 
    name: 'Indomie Instant Chicken Noodles 5-pack', 
    brand: 'Indomie', 
    category: 'food cupboard', 
    price: 149, 
    originalPrice: 195, 
    stock: 250, 
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop',
    description: 'The ultimate quick-fix snack loved by students and kids alike. Indomie Chicken Noodles are savory, flavorful, and incredibly easy to cook. Contains aromatic seasoning oil and chili powder.',
    rating: 4.8,
    ratingCount: 310,
    specifications: {
      'Pack Size': '5 Packs x 70g each',
      'Flavor': 'Signature Chicken Stew',
      'Cook Time': '3 Minutes'
    }
  },
  { 
    id: 8, 
    name: 'Blue Band Margarine Medium 250g', 
    brand: 'Blue Band', 
    category: 'food cupboard', 
    price: 95, 
    originalPrice: 120, 
    stock: 110, 
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop',
    description: 'Blue Band Fat Spread is enriched with 7 essential vitamins (A, B1, B2, B6, B12, D, E) and Omega 3 & 6. It spreads perfectly on hot fresh bread, melts wonderfully over Ugali or rice, and enhances baking.',
    rating: 4.9,
    ratingCount: 165,
    specifications: {
      'Weight': '250 Grams Tub',
      'Nutritional Values': 'Omega 3, Omega 6, 7 Vitamins',
      'Storage': 'Store in cool place, refrigerator optional'
    }
  },
  { 
    id: 9, 
    name: 'Kimbo Premium Cooking Fat 500g', 
    brand: 'Kimbo', 
    category: 'food cupboard', 
    price: 179, 
    originalPrice: 220, 
    stock: 75, 
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    description: 'Kimbo has been the standard of frying fat in Kenya since 1954. Made from pure vegetable oil, it is perfect for deep-frying soft, golden Mandazi, Chapati, and crispy chips without flavor transfers.',
    rating: 4.7,
    ratingCount: 63
  },
  { 
    id: 10, 
    name: 'Ketepa Premium Tea Bags 100pc', 
    brand: 'Ketepa', 
    category: 'food cupboard', 
    price: 159, 
    originalPrice: 199, 
    stock: 130, 
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=400&fit=crop',
    description: 'Handpicked from the lush green hills of Kericho, Kenya. Ketepa Tea Bags contain high-quality CTC black tea dust. Releases a rich, deep amber color and robust, soothing taste in seconds.',
    rating: 4.9,
    ratingCount: 140,
    specifications: {
      'Count': '100 Tagless Tea Bags',
      'Tea Type': 'Pure CTC Black Tea dust',
      'Origin': 'Kericho Highlands, Kenya',
      'Manufacturer': 'Kenya Tea Packers Ltd'
    }
  },

  // FRESH FOOD
  { 
    id: 11, 
    name: 'Fresh Cavendish Bananas Bunch (1kg)', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 89, 
    originalPrice: 120, 
    stock: 50, 
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    description: 'Sweet, energy-packed ripe bananas sourced from local farmers in Meru and Kisii. Picked at optimal maturity and delivered fresh daily. Perfect for healthy breakfast smoothies, kid meals, or quick snacking.',
    rating: 4.6,
    ratingCount: 45,
    specifications: {
      'Weight': 'Approx 1 Kilogram',
      'Type': 'Cavendish Sweet Banana',
      'Ripeness': 'Ripe, Ready to eat'
    }
  },
  { 
    id: 12, 
    name: 'Juicy Organic Tomatoes 500g', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 75, 
    originalPrice: 110, 
    stock: 60, 
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
    description: 'Sun-ripened, firm tomatoes grown organically on open fields. Rich in Lycopene and packed with sweet-tart juice. Ideal for preparing flavorful Kenyan tomato bases (Kachumbari) or stews.',
    rating: 4.5,
    ratingCount: 38
  },
  { 
    id: 13, 
    name: 'Fresh Farm Spinach Bunch', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 45, 
    originalPrice: 65, 
    stock: 40, 
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    description: 'Crisp green spinach leaves packed with iron and minerals. Harvested in the morning, washed in pure water, and tied in a generous bunch. A healthy side addition to Ugali and beef stew.',
    rating: 4.7,
    ratingCount: 29
  },
  { 
    id: 14, 
    name: 'Red Onions Large 1kg', 
    brand: 'Farm Fresh', 
    category: 'fresh food', 
    price: 69, 
    originalPrice: 95, 
    stock: 70, 
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop',
    description: 'Strong, flavorful red onions sourced from irrigation farms in Kajiado. Firm texture, purple-red outer skin, and a spicy kick. Excellent shelf life when stored in a ventilated pantry.',
    rating: 4.4,
    ratingCount: 55
  },
  { 
    id: 15, 
    name: 'Brookside Fresh Milk 500ml Pack', 
    brand: 'Brookside', 
    category: 'fresh food', 
    price: 55, 
    originalPrice: 70, 
    stock: 100, 
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    description: 'Brookside pasteurized whole milk is smooth, creamy, and sourced from dairy farmers across Rift Valley. Perfect for hot tea, cereal, or drinking cold. Kept under cold chain storage.',
    rating: 4.9,
    ratingCount: 220
  },
  { 
    id: 16, 
    name: 'Fresh Kenchic Eggs Tray (30pcs)', 
    brand: 'Kenchic', 
    category: 'fresh food', 
    price: 450, 
    originalPrice: 550, 
    stock: 30, 
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
    description: 'Freshly laid, farm-grade eggs with sturdy brown shells and rich golden yolks. Sorted and packed securely into a sturdy 30-egg pulp tray. High in protein and excellent for baking or breakfast fries.',
    rating: 4.8,
    ratingCount: 105,
    specifications: {
      'Quantity': '30 Eggs Tray',
      'Shell Color': 'Natural Brown',
      'Type': 'Layer Eggs',
      'Grade': 'A Large'
    }
  },
  { 
    id: 17, 
    name: 'Kenchic Fresh Whole Chicken 1.2kg', 
    brand: 'Kenchic', 
    category: 'fresh food', 
    price: 599, 
    originalPrice: 750, 
    stock: 25, 
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop',
    description: 'The national standard for fresh poultry. Kenchic whole chicken is premium grade, tender, pre-plucked, and fully cleaned. Ready for roasting, boiling (Kienyeji style) or currying.',
    rating: 4.9,
    ratingCount: 88
  },
  { 
    id: 18, 
    name: 'Beef Steak Prime Boneless 500g', 
    brand: 'Prime Cuts', 
    category: 'fresh food', 
    price: 450, 
    originalPrice: 580, 
    stock: 20, 
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1fc1959?w=400&h=400&fit=crop',
    description: 'Finely trimmed, lean boneless beef steak sliced from premium local steers. Hand-cut by our master butchers at Kipchimatt. Rich, tender, and ideal for stir-fries, stews, or barbeque skewers.',
    rating: 4.7,
    ratingCount: 47,
    specifications: {
      'Weight': '500g Net',
      'Type': 'Beef Steak',
      'Bone': 'Boneless',
      'Halaal Certified': 'Yes'
    }
  },

  // BEVERAGES
  { 
    id: 21, 
    name: 'Coca-Cola Original Taste 2L', 
    brand: 'Coca-Cola', 
    category: 'beverages', 
    price: 165, 
    originalPrice: 210, 
    stock: 100, 
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop',
    description: 'The world\'s favorite sparkling soft drink. Coca-Cola Original Taste delivers a crisp, refreshing, bubbly flavor that is best enjoyed ice-cold. Perfect for gatherings, parties, and family dinners.',
    rating: 4.8,
    ratingCount: 150
  },
  { 
    id: 24, 
    name: 'Minute Maid Mango Fruit Juice 1L', 
    brand: 'Minute Maid', 
    category: 'beverages', 
    price: 110, 
    originalPrice: 145, 
    stock: 70, 
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
    description: 'Packed with the lush, tropical sweetness of real mangoes. Minute Maid Mango is smooth, satisfying, and fortified with Vitamin C. Contains real fruit pulp for a thicker, natural texture.',
    rating: 4.6,
    ratingCount: 82
  },
  { 
    id: 25, 
    name: 'Red Bull Energy Drink 250ml Can', 
    brand: 'Red Bull', 
    category: 'beverages', 
    price: 220, 
    originalPrice: 280, 
    stock: 60, 
    image: 'https://images.unsplash.com/photo-1570527140771-020891229bb4?w=400&h=400&fit=crop',
    description: 'Red Bull Energy Drink is a functional beverage that vitalizes body and mind. Contains high-quality caffeine, taurine, B-group vitamins, and real sugars. Perfect for long drives, intense study, or peak workouts.',
    rating: 4.7,
    ratingCount: 94
  },

  // BABY & KIDS
  { 
    id: 31, 
    name: 'Pampers Baby Dry Diapers Size 4 (52pcs)', 
    brand: 'Pampers', 
    category: 'baby & kids', 
    price: 1299, 
    originalPrice: 1599, 
    stock: 45, 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    description: 'Pampers Baby Dry diapers feature 3 extra absorbency channels that distribute wetness evenly for up to 12 hours of dry comfort. Features stretchy side cuffs and a breathable backsheet to prevent baby rashes.',
    rating: 4.9,
    ratingCount: 160,
    specifications: {
      'Size': 'Size 4 (Maxi)',
      'Baby Weight': '9 - 14 kg',
      'Quantity': '52 Disposable Diapers',
      'Absorbency Duration': 'Up to 12 Hours'
    }
  },
  { 
    id: 34, 
    name: 'Cerelac Wheat & Milk Baby Cereal 400g', 
    brand: 'Nestle', 
    category: 'baby & kids', 
    price: 399, 
    originalPrice: 499, 
    stock: 50, 
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
    description: 'Nestle Cerelac Wheat & Milk is a highly nutritious, easily digestible instant baby porridge. Infused with Iron, Zinc, Vitamin C, and Calcium. Crafted to support physical growth and cognitive brain development in growing toddlers.',
    rating: 4.8,
    ratingCount: 112,
    specifications: {
      'Net Weight': '400 Grams',
      'Age Bracket': '6 Months to 24 Months',
      'Allergen Info': 'Contains Milk, Wheat Gluten',
      'Nutrients': 'Iron + Zinc + Calcium'
    }
  },

  // ELECTRONICS (AMAZON-STYLE HIGH TICKET ITEMS)
  { 
    id: 39, 
    name: 'Ramtons Stainless Steel Blender 1.5L', 
    brand: 'Ramtons', 
    category: 'electronics', 
    price: 3499, 
    originalPrice: 4500, 
    stock: 20, 
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop',
    description: 'A kitchen powerhouse. The Ramtons Blender features a massive 1.5-liter glass jar, stainless steel body, and highly engineered 4-point blades. Has 5 speeds plus pulse for blending smoothies, pureeing vegetables, or crushing ice.',
    rating: 4.8,
    ratingCount: 74,
    specifications: {
      'Capacity': '1.5 Liters Jar',
      'Motor Power': '500 Watts heavy-duty',
      'Blade Material': 'Stainless Steel',
      'Warranty': '1-Year Official Ramtons Warranty'
    }
  },
  { 
    id: 40, 
    name: 'Mika Fast-Boil Electric Kettle 1.8L', 
    brand: 'Mika', 
    category: 'electronics', 
    price: 1899, 
    originalPrice: 2499, 
    stock: 25, 
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop',
    description: 'Boil water in under 2 minutes. The Mika Stainless Steel Kettle features double-wall insulation, automatic safety shutoff, and a cool-touch exterior handle. Perfect for making Kericho tea or quick cooking prep.',
    rating: 4.6,
    ratingCount: 52
  },
  { 
    id: 41, 
    name: 'Samsung Solo Microwave Oven 20L', 
    brand: 'Samsung', 
    category: 'electronics', 
    price: 12999, 
    originalPrice: 15999, 
    stock: 10, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop',
    description: 'Heat, defrost, and cook food instantly with the Samsung Solo Microwave. Features Ceramic Inside walls that are scratch-resistant, hygienic, and incredibly easy to clean. Equipped with smart local food cooking presets.',
    rating: 4.9,
    ratingCount: 63,
    specifications: {
      'Capacity': '20 Liters',
      'Control Panel': 'Digital Tact Touch Buttons',
      'Interior': 'Scratch-Proof Ceramic Enamel',
      'Output Power': '800 Watts',
      'Defrost Modes': 'Quick Auto-Defrost'
    }
  },
  { 
    id: 43, 
    name: 'Samsung Galaxy A14 4G LTE 64GB', 
    brand: 'Samsung', 
    category: 'electronics', 
    price: 18999, 
    originalPrice: 22999, 
    stock: 15, 
    image: 'https://images.unsplash.com/photo-1610945265078-3858a0828671?w=400&h=400&fit=crop',
    description: 'A beautiful, feature-rich smartphone. The Galaxy A14 features a massive 6.6\" FHD+ screen, octa-core processor, and a top-tier 50MP triple-lens main camera. Complemented by a 5000mAh battery that lasts up to 2 full days.',
    rating: 4.7,
    ratingCount: 135,
    specifications: {
      'Screen': '6.6 Inches FHD+ PLS LCD',
      'Processor': 'Exynos 850 Octa-Core',
      'Storage': '64GB ROM (Expandable up to 1TB)',
      'RAM': '4GB RAM',
      'Battery': '5000 mAh with 15W Fast Charge',
      'Rear Camera': '50MP Main + 5MP Ultra-Wide + 2MP Macro'
    }
  },

  // CLEANING
  { 
    id: 47, 
    name: 'Omo Active Auto Washing Powder 1kg', 
    brand: 'Omo', 
    category: 'cleaning', 
    price: 249, 
    originalPrice: 320, 
    stock: 100, 
    image: 'https://images.unsplash.com/photo-1583947581924-860b3c3a9e3b?w=400&h=400&fit=crop',
    description: 'Omo Active Auto penetrates deep into fabric fibers to dissolve and lift tough oil and dirt stains instantly. Safe for use in automatic washing machines, leaving clothes brightly clean and freshly scented.',
    rating: 4.9,
    ratingCount: 185
  },

  // BEAUTY
  { 
    id: 53, 
    name: 'Nivea Rich Nourishing Body Lotion 400ml', 
    brand: 'Nivea', 
    category: 'beauty', 
    price: 449, 
    originalPrice: 580, 
    stock: 65, 
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    description: 'Keep your skin deeply hydrated for 48 hours. Formulated with Nivea Deep Moisture Serum, Natural Almond Oil, and Vitamin E to soothe dry skin and restore essential smoothness.',
    rating: 4.8,
    ratingCount: 120
  },

  // LIQUOR
  { 
    id: 59, 
    name: 'Johnnie Walker Black Label Whisky 750ml', 
    brand: 'Johnnie Walker', 
    category: 'liquor', 
    price: 3499, 
    originalPrice: 4299, 
    stock: 25, 
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop',
    description: 'An iconic, award-winning blend of Scotland\'s finest single malt and grain whiskies, aged for at least 12 years. Features deep layers of dark fruits, rich vanilla, and a signature smoky finish. Strictly for ages 18+.',
    rating: 4.9,
    ratingCount: 88,
    specifications: {
      'Volume': '750ml Glass Bottle',
      'Alcohol by Vol': '40% ABV',
      'Country': 'Scotland',
      'Type': 'Blended Scotch Whisky',
      'Ageing': '12 Years Old Minimum'
    }
  },

  // HARDWARE, STATIONERY, FURNITURE
  { 
    id: 63, 
    name: 'BIC Cristal Ballpoint Pens 10pcs Pack', 
    brand: 'BIC', 
    category: 'stationery', 
    price: 89, 
    originalPrice: 120, 
    stock: 200, 
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop',
    description: 'The world\'s most popular writing pen. BIC Cristal features a durable tungsten carbide ballpoint, delivering exceptionally smooth ink flows for long school essays or office notes. Contains 10 pens.',
    rating: 4.6,
    ratingCount: 140
  },
  { 
    id: 64, 
    name: 'Pedigree Beef & Vegetable Dry Dog Food 2kg', 
    brand: 'Pedigree', 
    category: 'pet', 
    price: 499, 
    originalPrice: 650, 
    stock: 40, 
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop',
    description: 'Ensure your beloved pet stays healthy, active and strong. Pedigree Adult Dog Food is formulated with beef flavor and wholesome grains, boosting your pet\'s digestion, coat glow, and immune system.',
    rating: 4.8,
    ratingCount: 54
  },
  { 
    id: 66, 
    name: 'Elite Home 3-Seater Elastic Sofa Cover', 
    brand: 'Home Style', 
    category: 'furniture', 
    price: 1299, 
    originalPrice: 1699, 
    stock: 20, 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    description: 'Give your living room a modern makeover. This elasticated slipcover is made from breathable, stretch-to-fit fabric, protecting your sofas from pet hairs, dust, and stains. Easy to machine wash.',
    rating: 4.5,
    ratingCount: 30
  }
];

export function formatMoney(num: number): string {
  return 'Ksh ' + Math.round(num).toLocaleString('en-KE');
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calcDiscount(price: number, original: number): number {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

export function uid(): string {
  return Date.now().toString(36).toUpperCase();
}
