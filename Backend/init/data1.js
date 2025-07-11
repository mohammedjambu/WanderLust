const sampleListings = [
  // Villas (3 listings)
  {
    title: "Elegant Villa in Santorini",
    description:
      "Perched on a cliff with breathtaking views of the Aegean Sea, this luxurious villa offers a private pool and modern Greek design.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1573843324134-9a74526c4e64?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 4500,
    location: "Santorini",
    country: "Greece",
    category: "Villa",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 3 },
    amenities: [
      { name: "Private Pool" },
      { name: "Sea View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Stunning views and luxurious stay! The pool was a highlight.",
      },
      {
        rating: 4,
        comment: "Beautiful villa, perfect for our family vacation.",
      },
    ],
    geometry: { type: "Point", coordinates: [25.4326, 36.4162] },
  },
  {
    title: "Tuscan Villa with Olive Grove",
    description:
      "Nestled among olive trees, this restored villa offers rustic charm and modern comforts, ideal for a serene Italian escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    },
    images: [
      {
        filename: "kitchen",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 3200,
    location: "Chianti",
    country: "Italy",
    category: "Villa",
    propertyDetails: { guests: 8, bedrooms: 4, bathrooms: 3 },
    amenities: [
      { name: "Private Pool" },
      { name: "Free WiFi" },
      { name: "Outdoor Dining" },
      { name: "Free Parking" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "The olive grove setting was magical. Perfect for relaxation.",
      },
      {
        rating: 5,
        comment: "Spacious and beautifully designed. Loved the pool!",
      },
    ],
    geometry: { type: "Point", coordinates: [11.3059, 43.6187] },
  },
  {
    title: "Modern Villa in Cape Town",
    description:
      "A sleek villa with panoramic views of Table Mountain, featuring floor-to-ceiling windows and a private infinity pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 3800,
    location: "Cape Town",
    country: "South Africa",
    category: "Villa",
    propertyDetails: { guests: 10, bedrooms: 5, bathrooms: 4 },
    amenities: [
      { name: "Infinity Pool" },
      { name: "Mountain Views" },
      { name: "Free WiFi" },
      { name: "BBQ Grill" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Incredible views and modern design. A perfect stay!",
      },
      {
        rating: 4,
        comment: "Luxurious and spacious. The pool was amazing.",
      },
    ],
    geometry: { type: "Point", coordinates: [18.4241, -33.9249] },
  },
  {
    title: "Luxurious Tuscan Villa with Vineyard Views",
    description:
      "Experience the charm of Tuscany in this stunning villa surrounded by rolling hills and vineyards. Perfect for a romantic or family retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
      },
    ],
    price: 3200,
    location: "Siena",
    country: "Italy",
    category: "Villa",
    propertyDetails: { guests: 8, bedrooms: 4, bathrooms: 3 },
    amenities: [
      { name: "Private Pool" },
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Wine Tasting" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "A dream stay! The vineyard views and pool were breathtaking.",
      },
      {
        rating: 4,
        comment: "Beautiful villa, very spacious. Loved the Tuscan charm!",
      },
    ],
    geometry: { type: "Point", coordinates: [11.3308, 43.3188] },
  },
  // Farm Houses (3 listings)
  {
    title: "Cozy Farmhouse in Cotswolds",
    description:
      "A charming 17th-century farmhouse surrounded by rolling hills, perfect for a peaceful countryside retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
    },
    images: [
      {
        filename: "kitchen",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 2000,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Farm House",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Fireplace" },
      { name: "Free WiFi" },
      { name: "Garden" },
      { name: "Pet Friendly" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Quintessential English countryside! The farmhouse was cozy.",
      },
      {
        rating: 4,
        comment: "Loved the rustic charm. Perfect for a quiet getaway.",
      },
    ],
    geometry: { type: "Point", coordinates: [-1.7207, 51.8378] },
  },
  {
    title: "Provence Lavender Farmhouse",
    description:
      "Stay in a beautifully restored farmhouse surrounded by lavender fields, offering a serene French countryside experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 1800,
    location: "Provence",
    country: "France",
    category: "Farm House",
    propertyDetails: { guests: 5, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Outdoor Dining" },
      { name: "Garden" },
      { name: "Bicycle Rental" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "The lavender fields were stunning! A perfect stay.",
      },
      {
        rating: 5,
        comment: "Charming and peaceful. Loved the outdoor dining area.",
      },
    ],
    geometry: { type: "Point", coordinates: [5.4486, 43.5297] },
  },
  {
    title: "Organic Farm Stay in Vermont",
    description:
      "Experience farm life in this cozy farmhouse with access to organic gardens and nearby hiking trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",
    },
    images: [
      {
        filename: "kitchen",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 1500,
    location: "Stowe",
    country: "United States",
    category: "Farm House",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Organic Garden" },
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Fireplace" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Loved the farm experience! Fresh produce was a bonus.",
      },
      {
        rating: 4,
        comment: "Cozy and rustic. Great for a nature lover’s getaway.",
      },
    ],
    geometry: { type: "Point", coordinates: [-72.6874, 44.4654] },
  },
  {
    title: "Rustic Farm House in Provence",
    description:
      "Stay in a charming 18th-century farmhouse surrounded by lavender fields. Ideal for those seeking a peaceful countryside escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
    ],
    price: 1800,
    location: "Provence",
    country: "France",
    category: "Farm House",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Outdoor Dining Area" },
      { name: "Pet Friendly" },
      { name: "Garden" },
    ],
    reviews: [
      {
        rating: 5,
        comment:
          "The lavender fields were magical! A perfect countryside stay.",
      },
      {
        rating: 4,
        comment: "Cozy and authentic. The farmhouse was a delight.",
      },
    ],
    geometry: { type: "Point", coordinates: [5.4486, 43.5297] },
  },

  // Pool Houses (3 listings)
  {
    title: "Bali Infinity Pool Retreat",
    description:
      "A modern pool house with an infinity pool overlooking lush rice fields, perfect for a tropical escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 3000,
    location: "Ubud",
    country: "Indonesia",
    category: "Pool House",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Infinity Pool" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Yoga Deck" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "The infinity pool was breathtaking! Perfect Bali stay.",
      },
      {
        rating: 5,
        comment: "Stylish and serene. Loved the rice field views.",
      },
    ],
    geometry: { type: "Point", coordinates: [115.2624, -8.5098] },
  },
  {
    title: "Palm Springs Mid-Century Pool House",
    description:
      "A retro-chic pool house with a private pool and desert views, perfect for a stylish getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 3500,
    location: "Palm Springs",
    country: "United States",
    category: "Pool House",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Private Pool" },
      { name: "BBQ Grill" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Retro vibes and a fabulous pool! Loved our stay.",
      },
      {
        rating: 4,
        comment: "Very stylish and comfortable. Great for a group trip.",
      },
    ],
    geometry: { type: "Point", coordinates: [-116.5453, 33.8303] },
  },
  {
    title: "Ibiza Party Pool House",
    description:
      "A vibrant pool house with a large pool and sound system, ideal for a lively group getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1579895397335-39a2fe614e9f?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 5000,
    location: "Ibiza",
    country: "Spain",
    category: "Pool House",
    propertyDetails: { guests: 10, bedrooms: 5, bathrooms: 4 },
    amenities: [
      { name: "Large Pool" },
      { name: "Sound System" },
      { name: "Free WiFi" },
      { name: "Outdoor Bar" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect for a party! The pool and sound system were epic.",
      },
      {
        rating: 5,
        comment: "Amazing space for a group. Ibiza vibes all the way!",
      },
    ],
    geometry: { type: "Point", coordinates: [1.4206, 38.9067] },
  },
  {
    title: "Modern Pool House in Bali",
    description:
      "Relax in this sleek pool house with a private infinity pool overlooking rice fields. Perfect for a tropical getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1572178239975-104313f9373b?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 2800,
    location: "Ubud",
    country: "Indonesia",
    category: "Pool House",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Infinity Pool" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Yoga Deck" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "The pool and views were stunning! Perfect Bali retreat.",
      },
      {
        rating: 5,
        comment: "Loved the modern design and tranquility. Highly recommend!",
      },
    ],
    geometry: { type: "Point", coordinates: [115.2624, -8.5098] },
  },

  // Rooms (3 listings)
  {
    title: "Private Room in Amsterdam Canal House",
    description:
      "A cozy private room in a historic canal house, perfect for exploring Amsterdam’s vibrant city center.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
    ],
    price: 800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Canal View" },
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Bicycle Rental" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect location! The room was cozy and clean.",
      },
      {
        rating: 4,
        comment: "Great host and canal views. Small but charming.",
      },
    ],
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] },
  },
  {
    title: "Bright Room in Lisbon",
    description:
      "A sunny private room in a traditional Portuguese home, close to Lisbon’s historic Alfama district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1591081658719-f575e204d119?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
    ],
    price: 700,
    location: "Lisbon",
    country: "Portugal",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Balcony" },
      { name: "City View" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Lovely room and great location! Perfect for exploring Lisbon.",
      },
      {
        rating: 4,
        comment: "Comfortable and clean. The balcony was a nice touch.",
      },
    ],
    geometry: { type: "Point", coordinates: [-9.1393, 38.7223] },
  },
  {
    title: "Cozy Room in Seoul",
    description:
      "A modern private room in a vibrant Seoul neighborhood, ideal for solo travelers or couples.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
    ],
    price: 650,
    location: "Seoul",
    country: "South Korea",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Shared Kitchen" },
      { name: "City Access" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Great location and cozy room! Perfect for Seoul adventures.",
      },
      {
        rating: 4,
        comment: "Clean and modern. Great value for the price.",
      },
    ],
    geometry: { type: "Point", coordinates: [126.9780, 37.5665] },
  },
  {
    title: "Cozy Private Room in Amsterdam",
    description:
      "Stay in a bright, private room in a canal house in the heart of Amsterdam. Perfect for solo travelers or couples.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1591081658719-f575e204d119?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
    ],
    price: 900,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Canal View" },
      { name: "Shared Kitchen" },
      { name: "Bicycle Rental" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect location by the canal! The room was cozy and clean.",
      },
      {
        rating: 4,
        comment: "Great host and location. Small but charming room.",
      },
    ],
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] },
  },
  {
    title: "Stylish Flat in Tokyo’s Shibuya",
    description:
      "Live like a local in this modern flat in the vibrant Shibuya district. Close to shopping, dining, and nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
    ],
    price: 1500,
    location: "Tokyo",
    country: "Japan",
    category: "Flat",
    propertyDetails: { guests: 3, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Washer" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Amazing location in Shibuya! The flat was clean and modern.",
      },
      {
        rating: 5,
        comment: "Perfect for exploring Tokyo. Very comfortable stay.",
      },
    ],
    geometry: { type: "Point", coordinates: [139.7006, 35.6581] },
  },
  {
    title: "Shared PG in Bangalore",
    description:
      "Affordable and comfortable PG accommodation in the heart of Bangalore, ideal for students or young professionals.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 600,
    location: "Bangalore",
    country: "India",
    category: "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Laundry Service" },
      { name: "Security" },
    ],
    reviews: [
      {
        rating: 4,
        comment: "Great value for money! Clean and safe PG.",
      },
      {
        rating: 5,
        comment: "Perfect for students. Friendly staff and good amenities.",
      },
    ],
    geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
  },
  {
    title: "Cozy Mountain Cabin in Banff",
    description:
      "Escape to this cozy cabin in the Canadian Rockies, surrounded by stunning mountain views and hiking trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1508919801845-4b3b42a93e38?w=800",
      },
    ],
    price: 2000,
    location: "Banff",
    country: "Canada",
    category: "Cabins",
    propertyDetails: { guests: 5, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Fireplace" },
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Hot Tub" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "The cabin was perfect! Loved the hot tub and views.",
      },
      {
        rating: 4,
        comment: "Cozy and well-equipped. Great base for exploring Banff.",
      },
    ],
    geometry: { type: "Point", coordinates: [-115.5708, 51.1784] },
  },
  {
    title: "Charming Boutique Shop in Marrakech",
    description:
      "Stay in a unique riad-style shop converted into a cozy accommodation in the heart of Marrakech’s souk.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1562183241-b937e1de6626?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 1200,
    location: "Marrakech",
    country: "Morocco",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Rooftop Terrace" },
      { name: "Air Conditioning" },
      { name: "Market Access" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Unique stay in the souk! Loved the vibrant atmosphere.",
      },
      {
        rating: 4,
        comment: "Charming and authentic. Great for exploring Marrakech.",
      },
    ],
    geometry: { type: "Point", coordinates: [-7.9861, 31.6295] },
  },
  {
    title: "Trending Loft in Miami",
    description:
      "Stay in this trendy loft in Miami’s Wynwood district, known for its street art and vibrant nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1582719478250-c891446a5a60?w=800",
      },
    ],
    price: 2500,
    location: "Miami",
    country: "United States",
    category: "Trending",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Rooftop Deck" },
      { name: "Smart TV" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Super trendy and stylish! Perfect for a Miami getaway.",
      },
      {
        rating: 5,
        comment: "Loved the vibe and location. Wynwood is so cool!",
      },
    ],
    geometry: { type: "Point", coordinates: [-80.1918, 25.7617] },
  },
  {
    title: "Beachfront Bungalow in Phuket",
    description:
      "Step onto the sandy beaches of Phuket from this charming beachfront bungalow, perfect for a tropical escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      },
    ],
    price: 2200,
    location: "Phuket",
    country: "Thailand",
    category: "Beach",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Beach Access" },
      { name: "Free WiFi" },
      { name: "Private Patio" },
      { name: "Air Conditioning" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect beachfront location! The bungalow was amazing.",
      },
      {
        rating: 5,
        comment: "Loved waking up to the sound of waves. Highly recommend!",
      },
    ],
    geometry: { type: "Point", coordinates: [98.3919, 7.8804] },
  },
  {
    title: "Glamping Tent in Serengeti",
    description:
      "Experience luxury glamping in the heart of the Serengeti, with stunning views of wildlife and starry skies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533874643336-104313f8373b?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1594495893663-d8a42323a315?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1525811902-f2342640856e?w=800",
      },
    ],
    price: 3500,
    location: "Serengeti",
    country: "Tanzania",
    category: "Camping",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Luxury Tent" },
      { name: "Wildlife Viewing" },
      { name: "Private Fire Pit" },
      { name: "Guided Safari" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Unforgettable experience! Saw zebras from our tent!",
      },
      {
        rating: 5,
        comment: "Luxury in the wild. The staff made it so special.",
      },
    ],
    geometry: { type: "Point", coordinates: [34.8333, -2.6667] },
  },
  {
    title: "Medieval Castle in Transylvania",
    description:
      "Live like royalty in this historic castle in the heart of Transylvania, surrounded by dramatic mountain landscapes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1568642193233-0bb3571d2551?w=800",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1615875227038-d213459a349b?w=800",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1574947948216-e5c7e3b8a1e3?w=800",
      },
    ],
    price: 40000,
    location: "Bran",
    country: "Romania",
    category: "Castles",
    propertyDetails: { guests: 12, bedrooms: 6, bathrooms: 5 },
    amenities: [
      { name: "Historic Castle" },
      { name: "Mountain Views" },
      { name: "Private Gardens" },
      { name: "Fireplace" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Felt like a king! The castle was stunning and historic.",
      },
      {
        rating: 5,
        comment: "Incredible experience. The views and ambiance were perfect.",
      },
    ],
    geometry: { type: "Point", coordinates: [25.3676, 45.5153] },
  },


  // Flats (3 listings)
  {
    title: "Chic Flat in Paris Le Marais",
    description:
      "A stylish flat in the heart of Le Marais, perfect for exploring Paris’s art galleries and cafes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 2000,
    location: "Paris",
    country: "France",
    category: "Flat",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Full Kitchen" },
      { name: "Air Conditioning" },
      { name: "Balcony" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect Parisian flat! Loved the Le Marais vibe.",
      },
      {
        rating: 4,
        comment: "Stylish and well-located. Small but functional bathroom.",
      },
    ],
    geometry: { type: "Point", coordinates: [2.3602, 48.8637] },
  },
  {
    title: "Modern Flat in Tokyo Shibuya",
    description:
      "A sleek flat in the bustling Shibuya district, close to shopping, dining, and nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 1800,
    location: "Tokyo",
    country: "Japan",
    category: "Flat",
    propertyDetails: { guests: 3, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Washer" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect location in Shibuya! The flat was modern and clean.",
      },
      {
        rating: 5,
        comment: "Great base for exploring Tokyo. Very comfortable.",
      },
    ],
    geometry: { type: "Point", coordinates: [139.7006, 35.6581] },
  },
  {
    title: "Bright Flat in Barcelona",
    description:
      "A vibrant flat near La Sagrada Familia, offering modern amenities and easy access to Barcelona’s attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 1700,
    location: "Barcelona",
    country: "Spain",
    category: "Flat",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Balcony" },
      { name: "Full Kitchen" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Fantastic location! The flat was bright and spacious.",
      },
      {
        rating: 4,
        comment: "Great stay, very clean. Close to major sights.",
      },
    ],
    geometry: { type: "Point", coordinates: [2.1734, 41.3851] },
  },

  // PG (3 listings)
  {
    title: "Affordable PG in Bangalore",
    description:
      "A comfortable PG accommodation in Bangalore’s tech hub, ideal for students or young professionals.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
    ],
    price: 600,
    location: "Bangalore",
    country: "India",
    category:

 "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Laundry Service" },
      { name: "Security" },
    ],
    reviews: [
      {
        rating: 4,
        comment: "Great value for money! Clean and safe PG.",
      },
      {
        rating: 5,
        comment: "Perfect for students. Friendly staff and good amenities.",
      },
    ],
    geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
  },
  {
    title: "Modern PG in Delhi",
    description:
      "A stylish PG in a vibrant Delhi neighborhood, offering modern amenities and easy access to public transport.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
    ],
    price: 550,
    location: "Delhi",
    country: "India",
    category: "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Shared Kitchen" },
      { name: "24/7 Security" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Very modern and clean. Great for young professionals.",
      },
      {
        rating: 4,
        comment: "Comfortable and well-located. Good value for Delhi.",
      },
    ],
    geometry: { type: "Point", coordinates: [77.2167, 28.7041] },
  },
  {
    title: "Cozy PG in Mumbai",
    description:
      "A budget-friendly PG in Mumbai’s Bandra area, perfect for students or travelers seeking a vibrant neighborhood.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
    ],
    price: 700,
    location: "Mumbai",
    country: "India",
    category: "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Laundry Service" },
      { name: "City Access" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Loved the Bandra vibe! The PG was clean and cozy.",
      },
      {
        rating: 4,
        comment: "Great location and amenities. Perfect for a short stay.",
      },
    ],
    geometry: { type: "Point", coordinates: [72.8777, 19.0760] },
  },

  // Cabins (3 listings)
  {
    title: "Rustic Cabin in Banff",
    description:
      "A cozy cabin in the heart of the Canadian Rockies, perfect for hiking and skiing enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 2200,
    location: "Banff",
    country: "Canada",
    category: "Cabins",
    propertyDetails: { guests: 5, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Fireplace" },
      { name: "Free WiFi" },
      { name: "Hot Tub" },
      { name: "Free Parking" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect mountain retreat! The hot tub was amazing.",
      },
      {
        rating: 4,
        comment: "Cozy and well-equipped. Great for exploring Banff.",
      },
    ],
    geometry: { type: "Point", coordinates: [-115.5708, 51.1784] },
  },
  {
    title: "Secluded Cabin in Patagonia",
    description:
      "A remote cabin surrounded by Patagonia’s stunning landscapes, ideal for nature lovers seeking solitude.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1508919801845-4b3b42a93e38?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 1800,
    location: "Patagonia",
    country: "Chile",
    category: "Cabins",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Fireplace" },
      { name: "Free Parking" },
      { name: "Hiking Trails" },
      { name: "Pet Friendly" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Incredible views and total peace. A nature lover’s dream.",
      },
      {
        rating: 4,
        comment: "Rustic but comfortable. Perfect for a quiet escape.",
      },
    ],
    geometry: { type: "Point", coordinates: [-72.3311, -41.3188] },
  },
  {
    title: "Alpine Cabin in Chamonix",
    description:
      "A charming alpine cabin near Mont Blanc, perfect for skiing and mountain adventures.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 2500,
    location: "Chamonix",
    country: "France",
    category: "Cabins",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Fireplace" },
      { name: "Free WiFi" },
      { name: "Ski Storage" },
      { name: "Mountain Views" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect for skiing! The cabin was warm and inviting.",
      },
      {
        rating: 5,
        comment: "Stunning views and great location. Highly recommend!",
      },
    ],
    geometry: { type: "Point", coordinates: [6.8694, 45.9237] },
  },

  // Shops (3 listings)
  {
    title: "Boutique Shop Stay in Marrakech",
    description:
      "A unique stay in a converted shop in Marrakech’s souk, offering a vibrant and authentic experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1562183241-b937e1de6626?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 1100,
    location: "Marrakech",
    country: "Morocco",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Rooftop Terrace" },
      { name: "Air Conditioning" },
      { name: "Market Access" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Unique and vibrant stay! Loved the souk atmosphere.",
      },
      {
        rating: 4,
        comment: "Charming and authentic. Great for exploring Marrakech.",
      },
    ],
    geometry: { type: "Point", coordinates: [-7.9861, 31.6295] },
  },
  {
    title: "Artisan Shop Stay in Istanbul",
    description:
      "A cozy stay in a converted artisan shop in Istanbul’s Grand Bazaar, perfect for a cultural experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 1000,
    location: "Istanbul",
    country: "Turkey",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Market Access" },
      { name: "Air Conditioning" },
      { name: "Rooftop View" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Loved the bazaar vibes! Unique and cozy stay.",
      },
      {
        rating: 4,
        comment: "Great location, very authentic. Small but charming.",
      },
    ],
    geometry: { type: "Point", coordinates: [28.9784, 41.0082] },
  },
  {
    title: "Historic Shop Stay in Kyoto",
    description:
      "A beautifully restored shop in Kyoto’s Gion district, offering a unique blend of tradition and comfort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1617887534282-36d7a9b37fcf?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 1300,
    location: "Kyoto",
    country: "Japan",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Tatami Mats" },
      { name: "Air Conditioning" },
      { name: "Garden View" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "A magical stay in Gion! Loved the traditional design.",
      },
      {
        rating: 5,
        comment: "Unique and serene. Perfect for experiencing Kyoto.",
      },
    ],
    geometry: { type: "Point", coordinates: [135.7681, 35.0116] },
  },

  
  // Beach (3 listings)
  {
    title: "Beachfront Bungalow in Phuket",
    description:
      "A charming beachfront bungalow with direct access to Phuket’s sandy shores, perfect for a tropical getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 2300,
    location: "Phuket",
    country: "Thailand",
    category: "Beach",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Beach Access" },
      { name: "Free WiFi" },
      { name: "Private Patio" },
      { name: "Air Conditioning" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect beachfront location! Loved the bungalow.",
      },
      {
        rating: 5,
        comment: "Amazing stay. The beach was right at our doorstep!",
      },
    ],
    geometry: { type: "Point", coordinates: [98.3919, 7.8804] },
  },
  {
    title: "Malibu Oceanfront Cottage",
    description:
      "A cozy cottage with stunning Pacific Ocean views, steps away from Malibu’s iconic beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 2800,
    location: "Malibu",
    country: "United States",
    category: "Beach",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Beach Access" },
      { name: "Free WiFi" },
      { name: "Ocean View" },
      { name: "Pet Friendly" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Stunning ocean views! Perfect for a beach getaway.",
      },
      {
        rating: 4,
        comment: "Cozy and clean. Loved the beach access!",
      },
    ],
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] },
  },
  {
    title: "Beach House in Byron Bay",
    description:
      "A stylish beach house in Australia’s Byron Bay, offering direct beach access and a relaxed vibe.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      },
    ],
    price: 2600,
    location: "Byron Bay",
    country: "Australia",
    category: "Beach",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Beach Access" },
      { name: "Free WiFi" },
      { name: "BBQ Grill" },
      { name: "Air Conditioning" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect beach house! Loved the laid-back vibe.",
      },
      {
        rating: 5,
        comment: "Great location and spacious. Ideal for a family trip.",
      },
    ],
    geometry: { type: "Point", coordinates: [153.6170, -28.6417] },
  },

  // Camping (3 listings)
  {
    title: "Luxury Glamping in Serengeti",
    description:
      "Experience luxury glamping in the Serengeti with stunning wildlife views and modern comforts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533874643336-104313f8373b?w=800",
    },
    images: [
      {
        filename: "tentinterior",
        url: "https://images.unsplash.com/photo-1594495893663-d8a42323a315?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1525811902-f2342640856e?w=800",
      },
    ],
    price: 3500,
    location: "Serengeti",
    country: "Tanzania",
    category: "Camping",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Luxury Tent" },
      { name: "Wildlife Viewing" },
      { name: "Private Fire Pit" },
      { name: "Guided Safari" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Unforgettable! Saw wildlife from our tent.",
      },
      {
        rating: 5,
        comment: "Luxury in the wild. The staff were incredible.",
      },
    ],
    geometry: { type: "Point", coordinates: [34.8333, -2.6667] },
  },
  {
    title: "Eco Glamping in Costa Rica",
    description:
      "A sustainable eco-pod in the Costa Rican rainforest, offering a unique off-grid experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593854932194-2703272b5a22?w=800",
    },
    images: [
      {
        filename: "tentinterior",
        url: "https://images.unsplash.com/photo-1525983394285-5ec91a13e2f4?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
      },
    ],
    price: 2000,
    location: "La Fortuna",
    country: "Costa Rica",
    category: "Camping",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Rainforest Views" },
      { name: "Wildlife Viewing" },
      { name: "Sustainable Design" },
      { name: "Hiking Trails" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Amazing rainforest experience! Loved the eco-pod.",
      },
      {
        rating: 5,
        comment: "Sustainable and comfortable. A unique stay!",
      },
    ],
    geometry: { type: "Point", coordinates: [-84.6443, 10.4705] },
  },
  {
    title: "Yurt Camping in Mongolia",
    description:
      "Stay in a traditional Mongolian yurt with a nomadic family, offering an authentic cultural experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1534269219088-a448d1e4a3b8?w=800",
    },
    images: [
      {
        filename: "tentinterior",
        url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1587280501635-3c094a3e8913?w=800",
      },
    ],
    price: 1500,
    location: "Gobi Desert",
    country: "Mongolia",
    category: "Camping",
    propertyDetails: { guests: 3, bedrooms: 1, bathrooms: 0 },
    amenities: [
      { name: "Cultural Immersion" },
      { name: "Stargazing" },
      { name: "Home-cooked Meals" },
      { name: "Horse Riding" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "A life-changing experience! Loved the hospitality.",
      },
      {
        rating: 4,
        comment: "Authentic and unique. Come prepared for rustic charm.",
      },
    ],
    geometry: { type: "Point", coordinates: [103.8466, 43.4187] },
  },

  // Castles (3 listings)
  {
    title: "Scottish Highland Castle",
    description:
      "Live like royalty in a 15th-century Scottish castle with grand halls and sprawling grounds.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1579401769396-8f385185a767?w=800",
    },
    images: [
      {
        filename: "greatroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 45000,
    location: "Highlands",
    country: "Scotland",
    category: "Castles",
    propertyDetails: { guests: 16, bedrooms: 8, bathrooms: 9 },
    amenities: [
      { name: "Entire Castle" },
      { name: "Great Hall" },
      { name: "Private Grounds" },
      { name: "Chef’s Kitchen" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "A magical experience! Felt like stepping back in time.",
      },
      {
        rating: 5,
        comment: "Perfect for our family reunion. The castle was stunning.",
      },
    ],
    geometry: { type: "Point", coordinates: [-4.2265, 57.4778] },
  },
  {
    title: "Bavarian Fairytale Castle",
    description:
      "Stay in a wing of a fairytale castle in the German Alps, featuring opulent rooms and mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1568642193233-0bb3571d2551?w=800",
    },
    images: [
      {
        filename: "greatroom",
        url: "https://images.unsplash.com/photo-1615875227038-d213459a349b?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1574947948216-e5c7e3b8a1e3?w=800",
      },
    ],
    price: 38000,
    location: "Bavaria",
    country: "Germany",
    category: "Castles",
    propertyDetails: { guests: 10, bedrooms: 5, bathrooms: 5 },
    amenities: [
      { name: "Mountain Views" },
      { name: "Antique Furnishings" },
      { name: "Grand Library" },
      { name: "Formal Dining Room" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "A fairytale come true! The castle was breathtaking.",
      },
      {
        rating: 5,
        comment: "Opulent and historic. Every room was stunning.",
      },
    ],
    geometry: { type: "Point", coordinates: [11.5820, 48.1351] },
  },
  {
    title: "Loire Valley Château",
    description:
      "A majestic château in France’s Loire Valley, perfect for a lavish holiday or special event.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564755255395-45656157f353?w=800",
    },
    images: [
      {
        filename: "greatroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1618221195710-dd2b643834cc?w=800",
      },
    ],
    price: 50000,
    location: "Loire Valley",
    country: "France",
    category: "Castles",
    propertyDetails: { guests: 20, bedrooms: 10, bathrooms: 12 },
    amenities: [
      { name: "Private Lake" },
      { name: "Manicured Gardens" },
      { name: "Ballroom" },
      { name: "Helipad" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect for our wedding! The château was stunning.",
      },
      {
        rating: 5,
        comment: "Luxurious and grand. The gardens were impeccable.",
      },
    ],
    geometry: { type: "Point", coordinates: [0.6848, 47.3948] },
  },
];

module.exports = { data: sampleListings };
