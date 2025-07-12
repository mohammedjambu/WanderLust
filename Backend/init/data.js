const sampleListings = [
  // Villas (3 listings: 1 Indian, 2 Global)
  {
    title: "Royal Udaipur Lakefront Villa",
    description:
      "A luxurious villa overlooking Lake Pichola, blending Rajasthani architecture with modern comforts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
      },
    ],
    price: 4500,
    location: "Udaipur",
    country: "India",
    category: "Villa",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 3 },
    amenities: [
      { name: "Private Pool" },
      { name: "Lake View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Smart TV" },
      { name: "Washer" },
      { name: "Security" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Stunning lake views! Felt like royalty in this villa.",
      },
      {
        rating: 4,
        comment: "Beautiful Rajasthani decor, perfect for a luxury stay.",
      },
    ],
    geometry: { type: "Point", coordinates: [73.6808, 24.5854] },
  },
  {
    title: "Santorini Cliffside Villa",
    description:
      "A stunning villa with panoramic Aegean Sea views, featuring a private infinity pool and whitewashed interiors.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1573843324134-9a74526c4e64?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
      },
    ],
    price: 4800,
    location: "Santorini",
    country: "Greece",
    category: "Villa",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 3 },
    amenities: [
      { name: "Infinity Pool" },
      { name: "Sea View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Private Patio" },
      { name: "Smart TV" },
      { name: "Heating" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Breathtaking views! The pool was a dream.",
      },
      {
        rating: 4,
        comment: "Perfect for a romantic getaway. Stunning design.",
      },
    ],
    geometry: { type: "Point", coordinates: [25.4326, 36.4162] },
  },
  {
    title: "Tuscan Vineyard Villa",
    description:
      "A charming villa nestled among vineyards, offering rustic elegance and modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    },
    images: [
      {
        filename: "kitchen",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
    ],
    price: 3500,
    location: "Chianti",
    country: "Italy",
    category: "Villa",
    propertyDetails: { guests: 8, bedrooms: 4, bathrooms: 3 },
    amenities: [
      { name: "Private Pool" },
      { name: "Free WiFi" },
      { name: "Wine Tasting" },
      { name: "Free Parking" },
      { name: "Full Kitchen" },
      { name: "BBQ Grill" },
      { name: "Garden" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Magical vineyard setting! Loved the rustic charm.",
      },
      {
        rating: 5,
        comment: "Spacious and elegant. Perfect for a family retreat.",
      },
    ],
    geometry: { type: "Point", coordinates: [11.3059, 43.6187] },
  },

  // Farm Houses (3 listings: 1 Indian, 2 Global)
  {
    title: "Punjab Countryside Farmhouse",
    description:
      "A traditional Punjabi farmhouse surrounded by lush fields, offering an authentic rural experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585153490-76fb20a0f2b4?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257365-8a6c19c306c0?w=800",
      },
    ],
    price: 1500,
    location: "Amritsar",
    country: "India",
    category: "Farm House",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Organic Farm" },
      { name: "Free WiFi" },
      { name: "Outdoor Dining" },
      { name: "Pet Friendly" },
      { name: "Shared Kitchen" },
      { name: "Garden" },
      { name: "Free Parking" },
      { name: "Heating" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Loved the rural vibe! Fresh farm food was amazing.",
      },
      {
        rating: 4,
        comment: "Cozy and authentic. Perfect for a quiet escape.",
      },
    ],
    geometry: { type: "Point", coordinates: [74.8723, 31.634] },
  },
  {
    title: "Cotswolds Stone Farmhouse",
    description:
      "A historic 17th-century farmhouse surrounded by rolling hills, perfect for a serene countryside retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1613977257473-8e17d2881c9c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
      },
    ],
    price: 1900,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Farm House",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Fireplace" },
      { name: "Free WiFi" },
      { name: "Garden" },
      { name: "Pet Friendly" },
      { name: "Full Kitchen" },
      { name: "Washer" },
      { name: "TV" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Quintessential English countryside! So cozy.",
      },
      {
        rating: 4,
        comment: "Perfect for a quiet getaway. Loved the garden.",
      },
    ],
    geometry: { type: "Point", coordinates: [-1.7207, 51.8378] },
  },
  {
    title: "Vermont Organic Farm Stay",
    description:
      "A cozy farmhouse with organic gardens and nearby hiking trails, ideal for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",
    },
    images: [
      {
        filename: "kitchen",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
      },
    ],
    price: 1600,
    location: "Stowe",
    country: "United States",
    category: "Farm House",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Organic Garden" },
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Fireplace" },
      { name: "Hiking Trails" },
      { name: "Pet Friendly" },
      { name: "Heating" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Fresh produce and cozy vibes! Loved it.",
      },
      {
        rating: 4,
        comment: "Great for a nature-filled escape.",
      },
    ],
    geometry: { type: "Point", coordinates: [-72.6874, 44.4654] },
  },

  // Pool Houses (3 listings: 1 Indian, 2 Global)
  {
    title: "Goa Tropical Pool House",
    description:
      "A vibrant pool house near Anjuna Beach, offering a private pool and lush tropical surroundings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      },
    ],
    price: 2800,
    location: "Goa",
    country: "India",
    category: "Pool House",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Private Pool" },
      { name: "Free WiFi" },
      { name: "Tropical Garden" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Beach Access" },
      { name: "Free Parking" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect for a beach getaway! The pool was amazing.",
      },
      {
        rating: 4,
        comment: "Vibrant and spacious. Loved the tropical vibe.",
      },
    ],
    geometry: { type: "Point", coordinates: [73.7552, 15.5736] },
  },
  {
    title: "Bali Infinity Pool Retreat",
    description:
      "A modern pool house with an infinity pool overlooking rice fields, ideal for a tropical escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
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
      { name: "Full Kitchen" },
      { name: "Garden View" },
      { name: "Private Patio" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Stunning pool and views! Perfect Bali retreat.",
      },
      {
        rating: 5,
        comment: "Serene and stylish. Loved the rice field backdrop.",
      },
    ],
    geometry: { type: "Point", coordinates: [115.2624, -8.5098] },
  },
  {
    title: "Palm Springs Retro Pool House",
    description:
      "A mid-century pool house with a private pool and desert views, perfect for a stylish getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
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
      { name: "Full Kitchen" },
      { name: "Smart TV" },
      { name: "Free Parking" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Retro vibes and a fabulous pool! Loved it.",
      },
      {
        rating: 4,
        comment: "Stylish and comfortable. Great for a group trip.",
      },
    ],
    geometry: { type: "Point", coordinates: [-116.5453, 33.8303] },
  },

  // Rooms (3 listings: 1 Indian, 2 Global)
  {
    title: "Heritage Room in Jaipur",
    description:
      "A cozy room in a heritage haveli in the Pink City, offering traditional Rajasthani decor and modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
    ],
    price: 800,
    location: "Jaipur",
    country: "India",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Heritage Decor" },
      { name: "Free WiFi" },
      { name: "Shared Courtyard" },
      { name: "Air Conditioning" },
      { name: "Heating" },
      { name: "TV" },
      { name: "City Access" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Loved the heritage vibe! Perfect for exploring Jaipur.",
      },
      {
        rating: 4,
        comment: "Cozy and authentic. Great location in the Pink City.",
      },
    ],
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] },
  },
  {
    title: "Canal House Room in Amsterdam",
    description:
      "A charming private room in a historic canal house, perfect for exploring Amsterdam’s vibrant city center.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1591081658719-f575e204d119?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
    ],
    price: 850,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Canal View" },
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Bicycle Rental" },
      { name: "Heating" },
      { name: "TV" },
      { name: "Washer" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect location! The room was cozy and clean.",
      },
      {
        rating: 4,
        comment: "Great canal views. Small but charming.",
      },
    ],
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] },
  },
  {
    title: "Cozy Room in Seoul",
    description:
      "A modern private room in a vibrant Seoul neighborhood, ideal for solo travelers or couples.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585153490-76fb20a0f2b4?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
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
      { name: "Heating" },
      { name: "TV" },
      { name: "Washer" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Great location and cozy room! Perfect for Seoul.",
      },
      {
        rating: 4,
        comment: "Clean and modern. Great value for the price.",
      },
    ],
    geometry: { type: "Point", coordinates: [126.978, 37.5665] },
  },

  // Flats (3 listings: 1 Indian, 2 Global)
  {
    title: "Modern Flat in Mumbai Bandra",
    description:
      "A stylish flat in Mumbai’s trendy Bandra area, close to cafes, boutiques, and the vibrant nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582719478250-c891446a5a60?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      },
    ],
    price: 1800,
    location: "Mumbai",
    country: "India",
    category: "Flat",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Balcony" },
      { name: "Smart TV" },
      { name: "Washer" },
      { name: "Security" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect Bandra vibe! Stylish and well-located.",
      },
      {
        rating: 4,
        comment: "Great flat, very comfortable. Loved the balcony.",
      },
    ],
    geometry: { type: "Point", coordinates: [72.8342, 19.0596] },
  },
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
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
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
      { name: "Heating" },
      { name: "TV" },
      { name: "Washer" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect Parisian flat! Loved the Le Marais vibe.",
      },
      {
        rating: 4,
        comment: "Stylish and well-located. Small but functional.",
      },
    ],
    geometry: { type: "Point", coordinates: [2.3602, 48.8637] },
  },
  {
    title: "Sleek Flat in Tokyo Shibuya",
    description:
      "A modern flat in the bustling Shibuya district, close to shopping, dining, and nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
      },
    ],
    price: 1900,
    location: "Tokyo",
    country: "Japan",
    category: "Flat",
    propertyDetails: { guests: 3, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Washer" },
      { name: "TV" },
      { name: "Heating" },
      { name: "Security" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect Shibuya location! Modern and clean.",
      },
      {
        rating: 5,
        comment: "Great base for exploring Tokyo. Very comfortable.",
      },
    ],
    geometry: { type: "Point", coordinates: [139.7006, 35.6581] },
  },

  // PG (3 listings: All Indian)
  {
    title: "Affordable PG in Bangalore",
    description:
      "A comfortable PG in Bangalore’s tech hub, ideal for students or young professionals.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585153490-76fb20a0f2b4?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257365-8a6c19c306c0?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
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
      { name: "City Access" },
      { name: "Heating" },
      { name: "Air Conditioning" },
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
      "A stylish PG in a vibrant Delhi neighborhood, offering modern amenities and easy metro access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
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
      { name: "City Access" },
      { name: "Laundry Service" },
      { name: "Heating" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Very modern and clean. Great for professionals.",
      },
      {
        rating: 4,
        comment: "Comfortable and well-located. Good value for Delhi.",
      },
    ],
    geometry: { type: "Point", coordinates: [77.2167, 28.7041] },
  },
  {
    title: "Cozy PG in Hyderabad",
    description:
      "A budget-friendly PG in Hyderabad’s HITEC City, perfect for tech professionals or students.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1613977257473-8e17d2881c9c?w=800",
    },
    images: [
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
      },
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
      },
    ],
    price: 650,
    location: "Hyderabad",
    country: "India",
    category: "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Laundry Service" },
      { name: "City Access" },
      { name: "Air Conditioning" },
      { name: "Security" },
      { name: "Heating" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Great location in HITEC City! Clean and cozy.",
      },
      {
        rating: 4,
        comment: "Perfect for a short stay. Good amenities.",
      },
    ],
    geometry: { type: "Point", coordinates: [78.3889, 17.4415] },
  },

  // Cabins (3 listings: 1 Indian, 2 Global)
  {
    title: "Himalayan Cabin in Manali",
    description:
      "A cozy wooden cabin nestled in the Himalayas, offering stunning mountain views and serene surroundings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1633426768219-8891031e522c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1648598060650-615824fb71d5?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "outdoor",
        url: "https://plus.unsplash.com/premium_photo-1687995672948-2e81955988af?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    price: 2000,
    location: "Manali",
    country: "India",
    category: "Cabins",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Fireplace" },
      { name: "Free WiFi" },
      { name: "Mountain Views" },
      { name: "Free Parking" },
      { name: "Heating" },
      { name: "Hiking Trails" },
      { name: "Shared Kitchen" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect Himalayan retreat! Loved the cozy vibe.",
      },
      {
        rating: 4,
        comment: "Great for a mountain getaway. Stunning views.",
      },
    ],
    geometry: { type: "Point", coordinates: [77.1893, 32.2396] },
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
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
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
      { name: "Full Kitchen" },
      { name: "Heating" },
      { name: "Washer" },
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
  {
    title: "Patagonia Secluded Cabin",
    description:
      "A remote cabin surrounded by Patagonia’s dramatic landscapes, ideal for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1508919801845-4b3b42a93e38?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
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
      { name: "Heating" },
      { name: "Shared Kitchen" },
      { name: "BBQ Grill" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Incredible views and total peace. A nature lover’s dream.",
      },
      {
        rating: 4,
        comment: "Rustic but comfortable. Perfect for solitude.",
      },
    ],
    geometry: { type: "Point", coordinates: [-72.3311, -41.3188] },
  },

  // Shops (3 listings: 1 Indian, 2 Global)
  {
    title: "Heritage Shop Stay in Varanasi",
    description:
      "A unique stay in a restored shop near the Ganges, offering an authentic Varanasi experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1562183241-b937e1de6626?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257365-8a6c19c306c0?w=800",
      },
    ],
    price: 1000,
    location: "Varanasi",
    country: "India",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Ganges View" },
      { name: "Air Conditioning" },
      { name: "Market Access" },
      { name: "Heating" },
      { name: "Shared Kitchen" },
      { name: "City Access" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Magical stay near the Ganges! So authentic.",
      },
      {
        rating: 4,
        comment: "Charming and unique. Perfect for Varanasi vibes.",
      },
    ],
    geometry: { type: "Point", coordinates: [83.0061, 25.3176] },
  },
  {
    title: "Artisan Shop Stay in Istanbul",
    description:
      "A cozy stay in a converted shop in Istanbul’s Grand Bazaar, perfect for a cultural experience.",
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
        url: "https://images.unsplash.com/photo-1613977257473-8e17d2881c9c?w=800",
      },
    ],
    price: 1100,
    location: "Istanbul",
    country: "Turkey",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Market Access" },
      { name: "Air Conditioning" },
      { name: "Rooftop View" },
      { name: "Heating" },
      { name: "Shared Kitchen" },
      { name: "Cultural Immersion" },
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
    title: "Traditional Shop Stay in Kyoto",
    description:
      "A restored shop in Kyoto’s Gion district, offering a blend of tradition and modern comfort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1617887534282-36d7a9b37fcf?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
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
      { name: "Heating" },
      { name: "Shared Kitchen" },
      { name: "Washer" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Magical stay in Gion! Loved the traditional design.",
      },
      {
        rating: 5,
        comment: "Unique and serene. Perfect for Kyoto.",
      },
    ],
    geometry: { type: "Point", coordinates: [135.7681, 35.0116] },
  },

  // Trending (3 listings: 1 Indian, 2 Global)
  {
    title: "Trendy Loft in Bangalore Koramangala",
    description:
      "A stylish loft in Bangalore’s vibrant Koramangala, perfect for urban explorers and nightlife lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      },
    ],
    price: 2200,
    location: "Bangalore",
    country: "India",
    category: "Trending",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Rooftop Deck" },
      { name: "Air Conditioning" },
      { name: "Smart TV" },
      { name: "Full Kitchen" },
      { name: "Washer" },
      { name: "Free Parking" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Super trendy loft! Loved the Koramangala vibe.",
      },
      {
        rating: 5,
        comment: "Stylish and modern. Perfect for a city stay.",
      },
    ],
    geometry: { type: "Point", coordinates: [77.6141, 12.9352] },
  },
  {
    title: "Chic Loft in Brooklyn",
    description:
      "A modern loft in Williamsburg, offering a trendy stay with easy access to NYC’s hotspots.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
      },
    ],
    price: 2600,
    location: "Brooklyn",
    country: "United States",
    category: "Trending",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Rooftop Terrace" },
      { name: "Air Conditioning" },
      { name: "Washer" },
      { name: "Full Kitchen" },
      { name: "Smart TV" },
      { name: "Heating" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Amazing loft! Williamsburg is the place to be.",
      },
      {
        rating: 4,
        comment: "Stylish and spacious. Great for exploring Brooklyn.",
      },
    ],
    geometry: { type: "Point", coordinates: [-73.9442, 40.6782] },
  },
  {
    title: "Trendy Studio in London Shoreditch",
    description:
      "A sleek studio in London’s trendy Shoreditch area, perfect for urban explorers and nightlife lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582719478250-c891446a5a60?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
      },
    ],
    price: 2200,
    location: "London",
    country: "United Kingdom",
    category: "Trending",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Smart TV" },
      { name: "City View" },
      { name: "Shared Kitchen" },
      { name: "Washer" },
      { name: "Heating" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Super cool studio! Shoreditch is so vibrant.",
      },
      {
        rating: 5,
        comment: "Perfect for a trendy London stay. Highly recommend!",
      },
    ],
    geometry: { type: "Point", coordinates: [-0.0759, 51.5266] },
  },

  // Beach (3 listings: 1 Indian, 2 Global)
  {
    title: "Kerala Backwater Beach House",
    description:
      "A serene beach house along Kerala’s backwaters, offering direct beach access and tropical vibes.",
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
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      },
    ],
    price: 2500,
    location: "Alleppey",
    country: "India",
    category: "Beach",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Beach Access" },
      { name: "Free WiFi" },
      { name: "Backwater View" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Private Patio" },
      { name: "Free Parking" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect beach and backwater combo! Loved the serenity.",
      },
      {
        rating: 5,
        comment: "Spacious and relaxing. Ideal for a family trip.",
      },
    ],
    geometry: { type: "Point", coordinates: [76.3224, 9.4981] },
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
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
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
      { name: "Full Kitchen" },
      { name: "Heating" },
      { name: "TV" },
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
    title: "Phuket Beachfront Bungalow",
    description:
      "A charming bungalow with direct access to Phuket’s sandy shores, perfect for a tropical escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    },
    images: [
      {
        filename: "livingroom",
        url: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1616627670137-8a93d8f5b7e1?w=800",
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
      { name: "Shared Kitchen" },
      { name: "TV" },
      { name: "Free Parking" },
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

  // Camping (3 listings: 1 Indian, 2 Global)
  {
    title: "Rishikesh Riverside Camping",
    description:
      "A serene camping experience along the Ganges in Rishikesh, perfect for yoga and nature lovers.",
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
    price: 1200,
    location: "Rishikesh",
    country: "India",
    category: "Camping",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Riverside Tent" },
      { name: "Wildlife Viewing" },
      { name: "Campfire" },
      { name: "Hiking Trails" },
      { name: "Free Parking" },
      { name: "Pet Friendly" },
      { name: "Home-cooked Meals" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Amazing riverside camping! Loved the yoga sessions.",
      },
      {
        rating: 4,
        comment: "Serene and refreshing. Perfect for nature lovers.",
      },
    ],
    geometry: { type: "Point", coordinates: [78.2676, 30.0869] },
  },
  {
    title: "Serengeti Luxury Glamping",
    description:
      "Luxury glamping in the Serengeti with stunning wildlife views and modern comforts.",
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
      { name: "Home-cooked Meals" },
      { name: "Free WiFi" },
      { name: "Heating" },
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
    title: "Mongolian Yurt Camping",
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
      { name: "bicycle-rental" },
      { name: "Campfire" },
      { name: "Heating" },
      { name: "Free Parking" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "A life-changing experience! Loved the hospitality.",
      },
      {
        rating: 4,
        comment: "Authentic and unique. Rustic but memorable.",
      },
    ],
    geometry: { type: "Point", coordinates: [103.8466, 43.4187] },
  },

  // Castles (3 listings: 1 Indian, 2 Global)
  {
    title: "Rajasthani Fort Palace in Jodhpur",
    description:
      "A majestic fort palace in Jodhpur, offering royal Rajasthani hospitality and stunning city views.",
    image: {
      filename: "hall",
      url: "https://plus.unsplash.com/premium_photo-1678916185493-781b5b61b93b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    images: [
      {
        filename: "mainimage",
        url: "https://images.unsplash.com/photo-1705039439212-c3130e4c62a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "sittinghall",
        url: "https://images.unsplash.com/photo-1696246739953-dc82dcec32b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "corridor",
        url: "https://images.unsplash.com/photo-1669664321694-b5c57b15c3de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "outdoor",
        url: "https://images.unsplash.com/photo-1668517107930-27191d3f4bfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    price: 40000,
    location: "Jodhpur",
    country: "India",
    category: "Castles",
    propertyDetails: { guests: 12, bedrooms: 6, bathrooms: 7 },
    amenities: [
      { name: "Entire Palace" },
      { name: "Rooftop Terrace" },
      { name: "Heritage Decor" },
      { name: "Private Courtyard" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "Felt like royalty! The palace was breathtaking.",
      },
      {
        rating: 5,
        comment: "Perfect for our family event. Stunning views!",
      },
    ],
    geometry: { type: "Point", coordinates: [73.0297, 26.2389] },
  },
  {
    title: "Scottish Highland Castle",
    description:
      "Live like royalty in a 15th-century Scottish castle with grand halls and sprawling grounds.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1568642193233-0bb3571d2551?w=800",
    },
    images: [
      {
        filename: "greatroom",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
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
      { name: "Air Conditioning" },
      { name: "Free WiFi" },
      { name: "Heating" },
      { name: "Fireplace" },
    ],
    reviews: [
      {
        rating: 5,
        comment: "A magical experience! Felt like stepping back in time.",
      },
      {
        rating: 5,
        comment: "Perfect for our family reunion. Stunning castle.",
      },
    ],
    geometry: { type: "Point", coordinates: [-4.2265, 57.4778] },
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
        url: "https://images.unsplash.com/photo-1615873968403-89e0686290a3?w=800",
      },
      {
        filename: "bedroom",
        url: "https://images.unsplash.com/photo-1613977257592-79e89b7b44d8?w=800",
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
      { name: "Entire Palace" },
      { name: "Air Conditioning" },
      { name: "Free WiFi" },
      { name: "Free Parking" },
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
