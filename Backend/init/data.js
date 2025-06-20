// data.js
const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&w=800&q=80",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&w=800&q=80",
      },
      {
        filename: "additional3",
        url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&w=800&q=80",
      },
      {
        filename: "additional4",
        url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&w=800&q=80",
      },
    ],
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Cabins", // Changed from "Cottage" to "Cabins"
    propertyDetails: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Full Kitchen" },
      { name: "Free Parking" },
      { name: "Pet Friendly" },
    ],
    reviews: [
      {
        id: "1",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80",
        rating: 5,
        comment: "Amazing cottage with stunning views! Perfect for a quiet getaway.",
        date: "March 2024",
      },
      {
        id: "2",
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
        rating: 4,
        comment: "Loved the beach access. Very cozy and clean!",
        date: "February 2024",
      },
    ],
    owner: {
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2019,
      rating: 4.8,
      reviewCount: 45,
    },
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259], // Malibu coordinates
    },
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&w=800&q=80",
      },
      {
        filename: "additional2",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&w=800&q=60",
      },
    ],
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Flat", // Changed from "Loft" to "Flat"
    propertyDetails: {
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
    ],
    reviews: [
      {
        id: "3",
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80",
        rating: 5,
        comment: "Perfect location for exploring NYC! The loft is stylish and comfortable.",
        date: "January 2024",
      },
    ],
    owner: {
      name: "James Carter",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2020,
      rating: 4.9,
      reviewCount: 32,
    },
    geometry: {
      type: "Point",
      coordinates: [-74.0060, 40.7128], // NYC coordinates
    },
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    images: [],
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Cabins", // Unchanged, matches enum
    propertyDetails: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Pet Friendly" },
      { name: "Fireplace" },
    ],
    reviews: [
      {
        id: "4",
        name: "Liam Brown",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
        rating: 5,
        comment: "Amazing cabin! Perfect for a winter getaway.",
        date: "December 2023",
      },
    ],
    owner: {
      name: "Sophie Lee",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2018,
      rating: 4.7,
      reviewCount: 28,
    },
    geometry: {
      type: "Point",
      coordinates: [-106.8370, 39.1911], // Aspen coordinates
    },
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&w=800&q=80",
      },
    ],
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Villa", // Unchanged, matches enum
    propertyDetails: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Private Pool" },
      { name: "Free Parking" },
      { name: "Air Conditioning" },
    ],
    reviews: [
      {
        id: "5",
        name: "Olivia Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80",
        rating: 5,
        comment: "A dream villa in Tuscany! The views and pool were fantastic.",
        date: "April 2024",
      },
    ],
    owner: {
      name: "Marco Rossi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2017,
      rating: 4.9,
      reviewCount: 60,
    },
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7696], // Florence coordinates
    },
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    images: [],
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Cabins", // Changed from "Treehouse" to "Cabins"
    propertyDetails: {
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Pet Friendly" },
      { name: "Outdoor Shower" },
    ],
    reviews: [],
    owner: {
      name: "Ava Thompson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2021,
      rating: 4.5,
      reviewCount: 10,
    },
    geometry: {
      type: "Point",
      coordinates: [-122.6765, 45.5231], // Portland coordinates
    },
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&w=800&q=80",
      },
    ],
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Flat", // Changed from "Condo" to "Flat"
    propertyDetails: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Private Pool" },
      { name: "Air Conditioning" },
      { name: "Beach Access" },
    ],
    reviews: [
      {
        id: "6",
        name: "Noah Martinez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
        rating: 5,
        comment: "Perfect beachfront location! Loved the pool and amenities.",
        date: "May 2024",
      },
    ],
    owner: {
      name: "Isabella Lopez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2019,
      rating: 4.8,
      reviewCount: 50,
    },
    geometry: {
      type: "Point",
      coordinates: [-86.7536, 21.1350], // Cancun coordinates
    },
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    images: [],
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Cabins", // Unchanged, matches enum
    propertyDetails: {
      guests: 5,
      bedrooms: 2,
      bathrooms: 1,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Lake Access" },
    ],
    reviews: [],
    owner: {
      name: "Ethan Clark",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2020,
      rating: 4.6,
      reviewCount: 15,
    },
    geometry: {
      type: "Point",
      coordinates: [-120.0324, 39.0968], // Lake Tahoe coordinates
    },
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&w=800&q=80",
      },
    ],
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Flat", // Changed from "Penthouse" to "Flat"
    propertyDetails: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "City Views" },
      { name: "Full Kitchen" },
    ],
    reviews: [
      {
        id: "7",
        name: "Mia Harris",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80",
        rating: 5,
        comment: "Incredible views and luxurious space! Highly recommend.",
        date: "June 2024",
      },
    ],
    owner: {
      name: "Lucas Wright",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2018,
      rating: 4.9,
      reviewCount: 75,
    },
    geometry: {
      type: "Point",
      coordinates: [-118.2437, 34.0522], // Los Angeles coordinates
    },
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    images: [],
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Cabins", // Changed from "Chalet" to "Cabins"
    propertyDetails: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Fireplace" },
      { name: "Ski Storage" },
      { name: "Free Parking" },
    ],
    reviews: [],
    owner: {
      name: "Sophie Muller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2019,
      rating: 4.7,
      reviewCount: 40,
    },
    geometry: {
      type: "Point",
      coordinates: [7.2286, 46.0961], // Verbier coordinates
    },
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    images: [
      {
        filename: "additional1",
        url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&w=800&q=80",
      },
    ],
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Cabins", // Changed from "Lodge" to "Cabins"
    propertyDetails: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
    },
    amenities: [
      { name: "Free WiFi" },
      { name: "Safari Tours" },
      { name: "Private Pool" },
    ],
    reviews: [
      {
        id: "8",
        name: "Aiden Patel",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
        rating: 5,
        comment: "Unforgettable safari experience! The lodge was luxurious.",
        date: "July 2024",
      },
    ],
    owner: {
      name: "Zara Khan",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80",
      joinedYear: 2020,
      rating: 4.9,
      reviewCount: 30,
    },
    geometry: {
      type: "Point",
      coordinates: [34.9179, -2.3440], // Serengeti coordinates
    },
  },
];

module.exports = { data: sampleListings };