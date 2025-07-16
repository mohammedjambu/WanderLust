const sampleListings = [
  // Villas (3 listings: 1 Indian, 2 Global)
  {
    title: "The Maharana's View: A Lake Pichola Villa",
    description:
      "Experience royalty at this exquisite villa perched on the shores of Lake Pichola. With traditional Rajasthani jharokhas (balconies) offering panoramic water views and interiors adorned with intricate marble work, this property blends heritage with five-star comfort. The private pool provides a serene escape, making it a perfect retreat after exploring the vibrant city of Udaipur.",
    image: {
      filename: "image2",
      url: "https://res.cloudinary.com/dcwffxjz4/image/upload/v1752595179/wanderlust_DEV/ypdjfz5nniadowtmrjts.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      },
      {
        filename: "image3",
        url: "https://res.cloudinary.com/dcwffxjz4/image/upload/v1752595180/wanderlust_DEV/jp0fa9ivuuzyzyouukun.webp",
      },
      {
        filename: "image4",
        url: "https://res.cloudinary.com/dcwffxjz4/image/upload/v1752595180/wanderlust_DEV/l7978v3o0njovultbhr4.jpg",
      },
      {
        filename: "image5",
        url: "https://res.cloudinary.com/dcwffxjz4/image/upload/v1752595181/wanderlust_DEV/pdvpnvrbipuo104ozmub.jpg",
      },
    ],
    price: 32000,
    location: "Udaipur",
    country: "India",
    category: "Villa",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 4 },
    amenities: [
      { name: "Private Pool" },
      { name: "Lake View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Smart TV" },
      { name: "24/7 Security" },
      { name: "Garden" },
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
    title: "Aegean Dream: Santorini Cliffside Escape",
    description:
      "Carved into the iconic cliffs of Santorini, this villa offers a breathtaking, uninterrupted view of the Aegean Sea. Wake up to the Grecian sun in whitewashed rooms and spend your days lounging by the private infinity pool that seems to merge with the sky. It's an idyllic spot for honeymoons or a luxurious escape, promising unforgettable sunsets from your private terrace.",
    image: {
      filename: "image2",
      url: "https://images.pexels.com/photos/6957079/pexels-photo-6957079.jpeg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://cdn.pixabay.com/photo/2013/10/12/18/05/villa-194671_1280.jpg",
      },
      {
        filename: "image3",
        url: "https://cdn.shopify.com/s/files/1/0503/0330/3873/files/3_cc607788-74ff-439b-9c31-61629b629f6b_1024x1024.jpg?v=1698259680",
      },
      {
        filename: "image4",
        url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
      },
      {
        filename: "image5",
        url: "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg",
      },
    ],
    price: 55000,
    location: "Santorini",
    country: "Greece",
    category: "Villa",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Infinity Pool" },
      { name: "Lake View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Balcony" },
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
    title: "Villa Vigna: A Tuscan Vineyard Retreat",
    description:
      "Nestled in the rolling hills of Chianti, this charming villa offers an authentic Tuscan experience. Surrounded by lush vineyards and olive groves, the property features traditional terracotta floors, wooden beams, and a modern kitchen. Enjoy a glass of local wine on the stone-paved patio, take a dip in the pool, or try your hand at a cooking class. Perfect for families and groups.",
    image: {
      filename: "image2",
      url: "https://gstatic1.promeai.pro/gallery/publish/2025/01/26/589a70d4fe24450f984c1e3962d5addf.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://glamorous-design.org/wp-content/uploads/2024/09/Untitled-design-2023-09-13T152846.191-scaled-scaled.jpg",
      },
      {
        filename: "image3",
        url: "https://images.mansionglobal.com/im-614693?height=523&width=784",
      },
      {
        filename: "image4",
        url: "https://cdn.pixabay.com/photo/2014/12/27/14/37/living-room-581073_1280.jpg",
      },
      {
        filename: "image5",
        url: "https://www.homestratosphere.com/wp-content/uploads/2018/01/z-mediterranean-living-room-23-jan2018.jpg",
      },
    ],
    price: 40000,
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
      { name: "Outdoor Dining" },
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

  // Farm Houses
  {
    title: "Golden Fields: A Punjabi Farmhouse Experience",
    description:
      "Escape the city and embrace the heart of Punjab. This traditional farmhouse is set amidst acres of lush, green fields, offering an authentic and tranquil rural experience. Enjoy fresh, farm-to-table meals, relax on the charpoy in the courtyard, and experience the warm hospitality of a true Punjabi family.",
    image: {
      filename: "image2",
      url: "https://i.pinimg.com/736x/be/a9/ab/bea9ab8414b277bfdd00e6f03e392fad.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://thearchitectsdiary.com/wp-content/uploads/2025/04/06_Farmhouse-Design.webp",
      },
      {
        filename: "image3",
        url: "https://www.buildofy.com/blog/content/images/2024/06/Blog-3.jpg",
      },
      {
        filename: "image4",
        url: "https://goodhomes.wwmindia.com/content/2019/jan/living-space1548666871.jpg",
      },
      {
        filename: "image5",
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
      },
    ],
    price: 4500,
    location: "Amritsar",
    country: "India",
    category: "Farm House",
    propertyDetails: { guests: 8, bedrooms: 4, bathrooms: 3 },
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
    title: "The Cotswolds Hideaway: A 17th-Century Farmhouse",
    description:
      "Step back in time at this historic 17th-century stone farmhouse in the heart of the Cotswolds. Surrounded by rolling green hills and quaint villages, this property is the quintessential English countryside retreat. Cozy up by the original fireplace, wander through the beautiful garden, and enjoy the peace and quiet of this idyllic location.",
    image: {
      filename: "image5",
      url: "https://secure.uniquebookingservices.com/uf/property/7673/gallery/12160/27194/248270-v2-gallery@2x.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://secure.uniquebookingservices.com/uf/property/7673/gallery/12165/27204/134104-v1-gallery@2x.jpg",
      },
      {
        filename: "image2",
        url: "https://secure.uniquebookingservices.com/uf/property/7673/gallery/4735/12244/134046-v1-gallery@2x.jpg",
      },
      {
        filename: "image3",
        url: "https://secure.uniquebookingservices.com/uf/property/7673/gallery/4739/12253/134065-v1-gallery@2x.jpg",
      },
      {
        filename: "image4",
        url: "https://secure.uniquebookingservices.com/uf/property/7673/gallery/12160/27195/134097-v2-gallery@2x.jpg",
      },
    ],
    price: 18000,
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
      { name: "Heating" },
      { name: "Free Parking" },
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
    title: "Maple Leaf Farm: A Vermont Organic Stay",
    description:
      "Reconnect with nature at this charming farmhouse in Stowe, Vermont. With access to private organic gardens and miles of nearby hiking trails, it's a haven for nature lovers. The interior is cozy and inviting, featuring a fireplace perfect for chilly evenings. A wonderful place for a digital detox and a breath of fresh air.",
    image: {
      filename: "image5",
      url: "https://a0.muscache.com/im/pictures/81c1766d-9ddb-4194-95c7-2f689789f203.jpg?im_w=720",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-16519531/original/fb34d46f-1916-49d3-9263-926fb1f05415.jpeg?im_w=1200",
      },
      {
        filename: "image2",
        url: "https://a0.muscache.com/im/pictures/dc1b5bf9-5f1f-4f9e-9aa3-fcc2362d007e.jpg?im_w=1200",
      },
      {
        filename: "image3",
        url: "https://a0.muscache.com/im/pictures/c41699a5-8ae7-48b3-9f9a-98dc2a56c306.jpg?im_w=1200",
      },
      {
        filename: "image4",
        url: "https://a0.muscache.com/im/pictures/f79182a9-2de9-4b06-935e-fb8a1f4e0d1d.jpg?im_w=720",
      },
    ],
    price: 15000,
    location: "Stowe",
    country: "United States",
    category: "Farm House",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Organic Farm" },
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Fireplace" },
      { name: "Hiking Trails" },
      { name: "Pet Friendly" },
      { name: "Heating" },
      { name: "Garden" },
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

  // Pool Houses
  {
    title: "Anjuna Oasis: A Tropical Pool House in Goa",
    description:
      "Discover your private paradise just minutes from Anjuna Beach. This vibrant pool house is enveloped in lush tropical greenery, offering a secluded and serene atmosphere. The centerpiece is a stunning private pool, perfect for cooling off after a day at the beach. Ideal for groups looking to experience the best of Goa's sun, sand, and style.",
    image: {
      filename: "image5",
      url: "https://assets.architecturaldigest.in/photos/664ad4b4a1c9b5fb094c8ab1/master/w_1600,c_limit/Fabien%20charuau%20-%20Vianaar%20-%20Villa%20Da%20Zita%20-%2011.jpeg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://assets.architecturaldigest.in/photos/664ad395d07d00765c423833/16:9/w_1920,c_limit/Untitled%20design%20(31).jpg",
      },
      {
        filename: "image2",
        url: "https://assets.architecturaldigest.in/photos/664ad3fbd07d00765c423835/master/w_1600,c_limit/Fabien%20charuau%20-%20Vianaar%20-%20Villa%20Da%20Zita%20-%2007.jpeg",
      },
      {
        filename: "image3",
        url: "https://assets.architecturaldigest.in/photos/664ad4a79ce9355660908552/master/w_1600,c_limit/Fabien%20charuau%20-%20Vianaar%20-%20Villa%20Da%20Zita%20-%2010.jpeg",
      },
      {
        filename: "image4",
        url: "https://assets.architecturaldigest.in/photos/664ad4e4da1429ed30da6acb/master/w_1600,c_limit/_DSC9749.jpg",
      },
    ],
    price: 18000,
    location: "Goa",
    country: "India",
    category: "Pool House",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 3 },
    amenities: [
      { name: "Private Pool" },
      { name: "Free WiFi" },
      { name: "Garden" },
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
    title: "Ubud Serenity: Rice Field Infinity Pool Retreat",
    description:
      "Find your zen at this stunningly modern pool house in the heart of Ubud, Bali. The main attraction is a magnificent infinity pool that overlooks tranquil, emerald-green rice paddies. The open-plan living space and minimalist design create a sense of peace and connection with nature, making it the ultimate tropical escape.",
    image: {
      filename: "image5",
      url: "https://the-pool-house-magnificent-24m-private-pool-in-berawa.all-balihotels.net/data/Pics/OriginalPhoto/9762/976239/976239112/the-pool-house-magnificent-24m-private-pool-in-berawa-canggu-bali-pic-39.JPEG",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://the-pool-house-magnificent-24m-private-pool-in-berawa.all-balihotels.net/data/Pics/OriginalPhoto/9762/976239/976239022/the-pool-house-magnificent-24m-private-pool-in-berawa-canggu-bali-pic-1.JPEG",
      },
      {
        filename: "image2",
        url: "https://the-pool-house-magnificent-24m-private-pool-in-berawa.all-balihotels.net/data/Pics/OriginalPhoto/9806/980672/980672464/the-pool-house-magnificent-24m-private-pool-in-berawa-canggu-bali-pic-2.JPEG",
      },
      {
        filename: "image3",
        url: "https://the-pool-house-magnificent-24m-private-pool-in-berawa.all-balihotels.net/data/Pics/OriginalPhoto/9762/976234/976234000/the-pool-house-magnificent-24m-private-pool-in-berawa-canggu-bali-pic-34.JPEG",
      },
      {
        filename: "image4",
        url: "https://the-pool-house-magnificent-24m-private-pool-in-berawa.all-balihotels.net/data/Pics/OriginalPhoto/9762/976234/976234018/the-pool-house-magnificent-24m-private-pool-in-berawa-canggu-bali-pic-35.JPEG",
      },
    ],
    price: 25000,
    location: "Ubud",
    country: "Indonesia",
    category: "Pool House",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Infinity Pool" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Garden" },
      { name: "Full Kitchen" },
      { name: "Outdoor Dining" },
      { name: "Smart TV" },
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
    title: "Desert Modern: A Palm Springs Pool House",
    description:
      "Step into a postcard from the past at this mid-century modern pool house in sunny Palm Springs. With its clean lines, retro furnishings, and stunning desert mountain views, this home is a masterclass in style. The private pool is the heart of the home, perfect for soaking up the California sun. An ideal spot for a chic and stylish getaway.",
    image: {
      filename: "image5",
      url: "https://media.architecturaldigest.com/photos/68432200dfd8e55175172400/4:3/w_1600,c_limit/Screenshot%202025-06-06%20at%201.14.10%20PM.png",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://media.architecturaldigest.com/photos/684708646997c736958b3e56/master/w_1600,c_limit/PS%20Aloha%20Two.jpg",
      },
      {
        filename: "image2",
        url: "https://media.architecturaldigest.com/photos/68431d16d006e521fdc34b30/4:3/w_1600,c_limit/Screenshot%202025-06-06%20at%2012.53.29%20PM.png",
      },
      {
        filename: "image3",
        url: "https://media.architecturaldigest.com/photos/684708646997c736958b3e57/master/w_1600,c_limit/PS%20Aloha%20one.jpg",
      },
      {
        filename: "image4",
        url: "https://media.architecturaldigest.com/photos/68482d1620ab6bd99d9e8c77/master/w_1600,c_limit/frank%20sinatra%20three.jpg",
      },
    ],
    price: 38000,
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
      { name: "Heating" },
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

  // Rooms
  {
    title: "The Pink City Gem: A Jaipur Haveli Room",
    description:
      "Stay in a beautifully restored room within a traditional heritage haveli in the heart of Jaipur. Adorned with classic Rajasthani decor, this cozy room offers an authentic cultural experience alongside modern amenities. It’s the perfect, charming base for exploring the vibrant markets and majestic forts of the Pink City.",
    image: {
      filename: "image5",
      url: "https://media.designcafe.com/wp-content/uploads/2020/11/24125350/rajasthan-home-decor-ideas.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://media.designcafe.com/wp-content/uploads/2020/11/24125359/rajasthani-decor-ideas-interiors-with-jaalis.jpg",
      },
      {
        filename: "image2",
        url: "https://media.designcafe.com/wp-content/uploads/2020/11/24125340/floor-seating-arrangement-in-rajasthani-interior.jpg",
      },
      {
        filename: "image3",
        url: "https://media.designcafe.com/wp-content/uploads/2020/11/24125407/rajasthani-style-interior-design-ideas.jpg",
      },
      {
        filename: "image4",
        url: "https://media.designcafe.com/wp-content/uploads/2020/11/24125420/rajasthani-textiles-for-home-interiors.jpg",
      },
    ],
    price: 2500,
    location: "Jaipur",
    country: "India",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Heating" },
      { name: "City Access" },
      { name: "Shared Kitchen" },
      { name: "Laundry Service" },
      { name: "Balcony" },
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
    title: "Amsterdam Canal View Room",
    description:
      "Experience Amsterdam like a local in this charming private room in a historic canal house. Wake up to picturesque views of the iconic canals, and enjoy being just a short walk or bike ride away from the city’s most famous museums and cafes. The room is cozy, clean, and the perfect base for urban explorers.",
    image: {
      filename: "image5",
      url: "https://cdn.decoist.com/wp-content/uploads/2020/05/Creating-a-kitchen-and-dining-area-with-white-walls-gray-cabinet-and-wooden-floor-that-adds-visual-warmth-92424.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://cdn.decoist.com/wp-content/uploads/2020/05/Framed-glass-wall-delineate-space-without-actually-stoping-the-flow-of-light-inside-the-Amsterdam-home-44438.jpg",
      },
      {
        filename: "image2",
        url: "https://cdn.decoist.com/wp-content/uploads/2020/05/Drak-gray-and-black-paint-a-picture-of-sophitsication-in-this-AMsterdam-kitchen-91431.jpg",
      },
      {
        filename: "image3",
        url: "https://cdn.decoist.com/wp-content/uploads/2020/05/Fabulous-renovated-home-on-KNSM-Island-in-Amsterdam-with-a-multi-level-interior-92726.jpg",
      },
      {
        filename: "image4",
        url: "https://cdn.decoist.com/wp-content/uploads/2020/05/White-and-wood-living-area-with-the-classic-Eames-Lounger-at-its-heart-81376.jpg",
      },
    ],
    price: 9000,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Bicycle Rental" },
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Heating" },
      { name: "Laundry Service" },
      { name: "City Access" },
      { name: "Cultural Immersion" },
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
    title: "The Seoul Nest: Modern & Central Room",
    description:
      "Discover the energy of Seoul from this sleek and modern private room. Located in a vibrant neighborhood with excellent transport links, it's the ideal spot for solo travelers or couples. The room is designed with a minimalist aesthetic, providing a peaceful and comfortable space to recharge after a day of sightseeing and enjoying the city's incredible food scene.",
    image: {
      filename: "image5",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/665851989.jpg?k=5022dc60050dafb6c33f3193f1d5c376814613bd96422f4d4aaf385fb044a542&o=",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/665852047.jpg?k=62593b200302a9f3399997a01e4423f8492174a133cd657a74092121affff3c1&o=",
      },
      {
        filename: "image2",
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/665852028.jpg?k=daad3583d8d3d919f70ff6f93ef845ce33ef64facd9228e9b614a2d67f72f693&o=",
      },
      {
        filename: "image3",
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/665852097.jpg?k=e1fb984a252e987952dfd65bc5d532752d16b0d834255063bf7dd2b6ed40b7c7&o=",
      },
      {
        filename: "image4",
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/665851842.jpg?k=ec472863f31bfabb40dd9f88d874b846340e19845f882c70da6308b3b426f441&o=",
      },
    ],
    price: 6500,
    location: "Seoul",
    country: "South Korea",
    category: "Rooms",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "City Access" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Shared Kitchen" },
      { name: "Heating" },
      { name: "Laundry Service" },
      { name: "Smart TV" },
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

  // Flats
  {
    title: "Bandra Buzz: A Stylish Urban Flat",
    description:
      "Immerse yourself in the trendiest part of Mumbai with a stay at this stylish flat in Bandra. Perfectly located near the neighborhood's best cafes, designer boutiques, and vibrant nightlife, this is the ultimate spot for the urban explorer. The apartment features a modern design, a comfortable living space, and a private balcony to soak in the city vibes.",
    image: {
      filename: "image5",
      url: "https://thearchitectsdiary.com/wp-content/uploads/2025/04/modern-interior-design-for-home-10.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://thearchitectsdiary.com/wp-content/uploads/2025/04/modern-interior-design-for-home-13-1024x682.jpg",
      },
      {
        filename: "image2",
        url: "https://thearchitectsdiary.com/wp-content/uploads/2025/04/modern-interior-design-for-home-2.jpg",
      },
      {
        filename: "image3",
        url: "https://thearchitectsdiary.com/wp-content/uploads/2025/04/modern-interior-design-for-home-5.jpg",
      },
      {
        filename: "image4",
        url: "https://thearchitectsdiary.com/wp-content/uploads/2025/04/modern-interior-design-for-home-11.jpg",
      },
    ],
    price: 8500,
    location: "Mumbai",
    country: "India",
    category: "Flat",
    propertyDetails: { guests: 3, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Balcony" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Smart TV" },
      { name: "Laundry Service" },
      { name: "City Access" },
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
    title: "Le Marais Charm: A Chic Parisian Flat",
    description:
      "Live the Parisian dream in this elegant flat located in the historic and fashionable Le Marais district. You'll be surrounded by art galleries, charming cafes, and designer shops. The flat itself is a blend of classic Parisian architecture and modern comfort, featuring high ceilings, a cozy balcony, and everything you need for a memorable stay.",
    image: {
      filename: "image5",
      url: "https://images.trvl-media.com/lodging/18000000/17480000/17471700/17471679/7e8a25dc.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://images.trvl-media.com/lodging/18000000/17480000/17471700/17471679/f51656b0.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
      {
        filename: "image2",
        url: "https://images.trvl-media.com/lodging/18000000/17480000/17471700/17471679/ab270192.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
      {
        filename: "image3",
        url: "https://images.trvl-media.com/lodging/18000000/17480000/17471700/17471679/dea7e641.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
      {
        filename: "image4",
        url: "https://images.trvl-media.com/lodging/18000000/17480000/17471700/17471679/089e2e63.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
    ],
    price: 16000,
    location: "Paris",
    country: "France",
    category: "Flat",
    propertyDetails: { guests: 3, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Balcony" },
      { name: "Free WiFi" },
      { name: "Full Kitchen" },
      { name: "Air Conditioning" },
      { name: "Heating" },
      { name: "Laundry Service" },
      { name: "City Access" },
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
    title: "Shibuya Crossing View: Sleek Tokyo Flat",
    description:
      "Positioned in the heart of the electric Shibuya district, this modern flat is your gateway to the best of Tokyo. Witness the world-famous Shibuya Crossing from nearby, and dive into an endless array of shopping, dining, and nightlife. The flat is a compact, efficient, and stylish sanctuary, perfect for recovering from your city adventures.",
    image: {
      filename: "image5",
      url: "https://images.trvl-media.com/lodging/79000000/78520000/78517200/78517186/9b200216.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://images.trvl-media.com/lodging/79000000/78520000/78517200/78517186/4f0c9f53.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
      {
        filename: "image2",
        url: "https://images.trvl-media.com/lodging/79000000/78520000/78517200/78517186/cac0c6ae.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
      {
        filename: "image3",
        url: "https://images.trvl-media.com/lodging/79000000/78520000/78517200/78517186/57797746.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
      {
        filename: "image4",
        url: "https://images.trvl-media.com/lodging/79000000/78520000/78517200/78517186/b5579b6f.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      },
    ],
    price: 14000,
    location: "Tokyo",
    country: "Japan",
    category: "Flat",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Full Kitchen" },
      { name: "Laundry Service" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Smart TV" },
      { name: "Heating" },
      { name: "City Access" },
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

  // PG
  {
    title: "The Bangalore Base: Affordable Tech Hub PG",
    description:
      "An ideal and affordable Paying Guest accommodation for students and young professionals in Bangalore's tech corridor. This PG offers clean, comfortable rooms, high-speed WiFi, and a shared kitchen. With 24/7 security and easy access to major tech parks, it's a practical and smart choice for your stay in the city.",
    image: {
      filename: "image5",
      url: "https://alexandro.in/image/bangalore/settl-santana/5.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://alexandro.in/image/bangalore/settl-santana/1.jpg",
      },
      {
        filename: "image2",
        url: "https://alexandro.in/image/bangalore/settl-santana/2.jpg",
      },
      {
        filename: "image3",
        url: "https://alexandro.in/image/bangalore/settl-santana/3.jpg",
      },
      {
        filename: "image4",
        url: "https://alexandro.in/image/bangalore/settl-santana/4.jpg",
      },
    ],
    price: 800,
    location: "Bangalore",
    country: "India",
    category: "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Laundry Service" },
      { name: "24/7 Security" },
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "City Access" },
      { name: "Air Conditioning" },
      { name: "Heating" },
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
    title: "Delhi Connect: Modern & Metro-Friendly PG",
    description:
      "This stylish PG in a bustling Delhi neighborhood is designed for the modern professional. Offering contemporary rooms, essential amenities, and unbeatable proximity to the Delhi Metro, it ensures a comfortable and convenient stay. A perfect, budget-friendly option for those working or studying in the capital.",
    image: {
      filename: "image5",
      url: "https://img.cofynd.com/images/original/59cc53393fb89e5cc6c7717ece1a37d87a012f77.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://img.cofynd.com/images/original/f81fe9b1a46d8fd9658cd5b0dcb3bd0939a2d280.jpg",
      },
      {
        filename: "image2",
        url: "https://img.cofynd.com/images/original/2c9bd9d5da9437ce6088839e59263618b93865e2.jpg",
      },
      {
        filename: "image3",
        url: "https://img.cofynd.com/images/original/2c9bd9d5da9437ce6088839e59263618b93865e2.jpg",
      },
      {
        filename: "image4",
        url: "https://img.cofynd.com/images/original/371b0cce34d894c3bb4564d10dfc6595872f462a.jpg",
      },
    ],
    price: 750,
    location: "Delhi",
    country: "India",
    category: "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "24/7 Security" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Shared Kitchen" },
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
    title: "HITEC Hub: Cozy PG in Hyderabad",
    description:
      "A clean, cozy, and budget-friendly PG located in the heart of Hyderabad’s HITEC City. This accommodation is tailor-made for tech professionals and students, offering all necessary amenities like WiFi and laundry service, ensuring a hassle-free and productive stay. It's the perfect launchpad for your career in Cyberabad.",
    image: {
      filename: "image5",
      url: "https://img.cofynd.com/images/original/6b3def4dd2758e4a73426af3cb2ef7dba2b52368.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://img.cofynd.com/images/original/4133f794a721672244877ccb27b1b4bbabf5bee5.jpg",
      },
      {
        filename: "image2",
        url: "https://img.cofynd.com/images/original/64d59d57ac46fa29e46b4943146ae1eee4f374ca.jpg",
      },
      {
        filename: "image3",
        url: "https://img.cofynd.com/images/original/7c08f398c7fb8b0c10acb1e983bf12319f457e00.jpg",
      },
      {
        filename: "image4",
        url: "https://img.cofynd.com/images/original/c43ccba61b2505c82344be66b16514c6ec210355.jpg",
      },
    ],
    price: 700,
    location: "Hyderabad",
    country: "India",
    category: "PG",
    propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Laundry Service" },
      { name: "City Access" },
      { name: "Free WiFi" },
      { name: "Shared Kitchen" },
      { name: "Air Conditioning" },
      { name: "Heating" },
      { name: "24/7 Security" },
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

  // Cabins
  {
    title: "Himalayan Hideout: A Cozy Cabin in Manali",
    description:
      "Nestled amidst the majestic Himalayas in Manali, this cozy wooden cabin is a perfect mountain retreat. Offering stunning views from every window, a warm fireplace, and access to serene hiking trails, it's an ideal escape for those seeking peace, adventure, and a deep connection with nature.",
    image: {
      filename: "image5",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzMxNjcyODcyNTg1MTAzNjU4/original/0ea3b347-f83e-4b3f-838a-9bd8620d889f.jpeg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://images.unsplash.com/photo-1633426768219-8891031e522c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "image2",
        url: "https://images.unsplash.com/photo-1648598060650-615824fb71d5?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "image3",
        url: "https://plus.unsplash.com/premium_photo-1687995672948-2e81955988af?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "image4",
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/671002711.jpg?hp=1&k=9a189a9568652b8ccda844c80bdfea014d1bd588e48f8b2c3ea2f019e4361ba9&o=",
      },
    ],
    price: 7500,
    location: "Manali",
    country: "India",
    category: "Cabins",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Fireplace" },
      { name: "Mountain Views" },
      { name: "Free WiFi" },
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
    title: "Chamonix Alpine Chalet near Mont Blanc",
    description:
      "Your ultimate base for mountain adventures, this charming alpine cabin is situated near the legendary Mont Blanc in Chamonix. Perfect for skiers and hikers, it offers dedicated ski storage, a cozy fireplace for après-ski relaxation, and breathtaking views of the French Alps. A dream location for adventure sports enthusiasts.",
    image: {
      filename: "image5",
      url: "https://secure.uniquebookingservices.com/uf/property/4547/gallery/9213/21464/50569-v1-672pxh@2x.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://secure.uniquebookingservices.com/uf/property/4547/gallery/4009/10672/90972-v1-gallery@2x.jpg",
      },
      {
        filename: "image2",
        url: "https://secure.uniquebookingservices.com/uf/property/4547/gallery/2900/8001/50585-v3-672pxh@2x.jpg",
      },
      {
        filename: "image3",
        url: "https://secure.uniquebookingservices.com/uf/property/4547/gallery/2899/7998/50581-v2-672pxh@2x.jpg",
      },
      {
        filename: "image4",
        url: "https://secure.uniquebookingservices.com/uf/property/4547/gallery/3656/9840/123729-v5-672pxh@2x.jpg",
      },
    ],
    price: 28000,
    location: "Chamonix",
    country: "France",
    category: "Cabins",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 2 },
    amenities: [
      { name: "Fireplace" },
      { name: "Ski Storage" },
      { name: "Mountain Views" },
      { name: "Free WiFi" },
      { name: "Full Kitchen" },
      { name: "Heating" },
      { name: "Free Parking" },
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
    title: "Patagonian Wilderness Cabin",
    description:
      "Truly get away from it all in this remote and secluded cabin, surrounded by the raw, dramatic landscapes of Patagonia. This is a place for adventurers, hikers, and nature lovers seeking solitude and stunning vistas. The cabin is rustic yet comfortable, with a wood-burning fireplace to keep you warm as you gaze upon the rugged mountains.",
    image: {
      filename: "image5",
      url: "https://secure.uniquebookingservices.com/uf/property/6610/gallery/8136/19171/184356-v3-gallery@2x.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://secure.uniquebookingservices.com/uf/property/6610/gallery/8152/19202/184352-v1-672pxh@2x.jpg",
      },
      {
        filename: "image2",
        url: "https://secure.uniquebookingservices.com/uf/property/6610/gallery/8139/19176/184371-v1-672pxh@2x.jpg",
      },
      {
        filename: "image3",
        url: "https://secure.uniquebookingservices.com/uf/property/6610/gallery/8136/19170/184362-v4-gallery@2x.jpg",
      },
      {
        filename: "image4",
        url: "https://secure.uniquebookingservices.com/uf/property/6610/gallery/8142/19183/184386-v1-672pxh@2x.jpg",
      },
    ],
    price: 16000,
    location: "Patagonia",
    country: "Chile",
    category: "Cabins",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 1 },
    amenities: [
      { name: "Fireplace" },
      { name: "Hiking Trails" },
      { name: "Pet Friendly" },
      { name: "Free Parking" },
      { name: "Heating" },
      { name: "Shared Kitchen" },
      { name: "Stargazing" },
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

  // Shops
  {
    title: "Ganges View Stay: A Restored Varanasi Shop",
    description:
      "A truly unique stay in a beautifully restored heritage shop-house just steps from the sacred Ganges river. Immerse yourself in the spiritual energy of Varanasi, with views of the ghats and easy access to the bustling market alleys. This is an authentic experience for the culturally curious traveler.",
    image: {
      filename: "image5",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f6/c7/87/lobby.jpg?w=1400&h=-1&s=1",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f6/c6/fd/recipation.jpg?w=1400&h=-1&s=1",
      },
      {
        filename: "image2",
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/01/c5/ec/repcation.jpg?w=1400&h=-1&s=1",
      },
      {
        filename: "image3",
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f6/cc/9d/superior-room.jpg?w=1400&h=-1&s=1",
      },
      {
        filename: "image4",
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f6/cc/4d/room-superior.jpg?w=1400&h=-1&s=1",
      },
    ],
    price: 3500,
    location: "Varanasi",
    country: "India",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Lake View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "City Access" },
      { name: "Shared Kitchen" },
      { name: "Heating" },
      { name: "Cultural Immersion" },
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
    title: "Grand Bazaar Hideout: An Istanbul Artisan Stay",
    description:
      "Stay in a cozy, converted artisan shop right at the edge of Istanbul's famous Grand Bazaar. This is a dream for those who want to be immersed in the city's vibrant culture and history. Enjoy stunning rooftop views of the old city and spend your days getting lost in the maze of market streets.",
    image: {
      filename: "image5",
      url: "https://az712897.vo.msecnd.net/images/full/15308996-0c85-4bcd-aea9-a462b0c1b34d.jpeg?width=800",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://az712897.vo.msecnd.net/images/full/810a5cf1-4599-4e2b-b695-6f671b0f1cec.jpeg?width=800",
      },
      {
        filename: "image2",
        url: "https://az712897.vo.msecnd.net/images/full/bc0e9e23-0112-4265-b223-a7168553e4ed.jpeg?width=800",
      },
      {
        filename: "image3",
        url: "https://az712897.vo.msecnd.net/images/full/b74d9130-d5c8-4753-a513-b5cb55e7ec85.jpeg?width=800",
      },
      {
        filename: "image4",
        url: "https://az712897.vo.msecnd.net/images/full/af152e32-f475-4b17-ad1b-2a3f0a8db180.jpeg?width=800",
      },
    ],
    price: 7000,
    location: "Istanbul",
    country: "Turkey",
    category: "Shops",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Rooftop View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "City Access" },
      { name: "Shared Kitchen" },
      { name: "Heating" },
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
    title: "Kyoto's Gion District: A Traditional Machiya Stay",
    description:
      "Experience the timeless beauty of Kyoto with a stay in a restored 'machiya' (traditional wooden townhouse) in the historic Gion district. This stay blends authentic Japanese design, like tatami mat flooring, with modern comforts. Enjoy the serene private garden and the incredible convenience of being in one of Kyoto's most famous and atmospheric areas.",
    image: {
      filename: "image5",
      url: "https://www.machiya-inn-japan.com/blog/wp-content/uploads/2023/10/marikoji_img04.jpeg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://www.machiya-inn-japan.com/blog/wp-content/uploads/2023/10/marikoji_img06.jpeg",
      },
      {
        filename: "image2",
        url: "https://www.machiya-inn-japan.com/blog/wp-content/uploads/2023/10/marikoji_img07.jpeg",
      },
      {
        filename: "image3",
        url: "https://www.machiya-inn-japan.com/blog/wp-content/uploads/2023/10/marikoji_img08.jpeg",
      },
      {
        filename: "image4",
        url: "https://www.machiya-inn-japan.com/blog/wp-content/uploads/2023/10/marikoji_img05.jpeg",
      },
    ],
    price: 11000,
    location: "Kyoto",
    country: "Japan",
    category: "Shops",
    propertyDetails: { guests: 3, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Garden" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Shared Kitchen" },
      { name: "Heating" },
      { name: "City Access" },
      { name: "Cultural Immersion" },
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

  // Beach
  {
    title: "Alleppey Backwaters & Beach House",
    description:
      "Why choose when you can have both? This serene house in Alleppey offers direct access to a beautiful beach on one side and stunning views of the famous Kerala backwaters on the other. It's a peaceful, tropical paradise, perfect for family holidays and those looking to experience the unique natural beauty of Kerala.",
    image: {
      filename: "image5",
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-730338545541524579/original/b3f2dcdc-0919-4811-b637-0fc4c173989c.jpeg?im_w=1200",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-730338545541524579/original/286a8688-4daf-4235-8e58-7a69e236f347.jpeg?im_w=1200",
      },
      {
        filename: "image2",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-730338545541524579/original/11818fc5-13c0-4019-b5bf-2637b49bda17.jpeg?im_w=1200",
      },
      {
        filename: "image3",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-730338545541524579/original/6f44165c-c507-4c61-8ae9-e6171f1366cc.jpeg?im_w=1440",
      },
      {
        filename: "image4",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-730338545541524579/original/155b827d-cda9-4d32-b8c2-e01d80a5ddcf.jpeg?im_w=720",
      },
    ],
    price: 12000,
    location: "Alleppey",
    country: "India",
    category: "Beach",
    propertyDetails: { guests: 6, bedrooms: 3, bathrooms: 3 },
    amenities: [
      { name: "Beach Access" },
      { name: "Lake View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Free Parking" },
      { name: "Outdoor Dining" },
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
    title: "The Malibu Dream: Oceanfront Cottage",
    description:
      "Live the California dream at this cozy cottage with direct access to Malibu's iconic beaches. Enjoy stunning, panoramic views of the Pacific Ocean right from your living room. It's the perfect spot to watch dolphins play in the morning and enjoy spectacular sunsets in the evening. A truly magical beach getaway.",
    image: {
      filename: "image5",
      url: "https://secure.uniquebookingservices.com/uf/property/11107/gallery/11908/26690/246133-v1-gallery@2x.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-947586227795155815/original/c0545be4-22e0-415e-b6a5-f760a7331e1a.jpeg?im_w=1200",
      },
      {
        filename: "image2",
        url: "https://secure.uniquebookingservices.com/uf/property/11107/gallery/11894/26665/246130-v3-gallery@2x.jpg",
      },
      {
        filename: "image3",
        url: "https://secure.uniquebookingservices.com/uf/property/11107/gallery/11898/26672/246108-v1-gallery@2x.jpg",
      },
      {
        filename: "image4",
        url: "https://secure.uniquebookingservices.com/uf/property/11107/gallery/11900/26675/246114-v2-gallery@2x.jpg",
      },
    ],
    price: 45000,
    location: "Malibu",
    country: "United States",
    category: "Beach",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Beach Access" },
      { name: "Lake View" },
      { name: "Free WiFi" },
      { name: "Pet Friendly" },
      { name: "Full Kitchen" },
      { name: "Heating" },
      { name: "Free Parking" },
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
    title: "Phuket Sands: A Private Beachfront Bungalow",
    description:
      "Your own slice of paradise awaits at this charming bungalow with direct access to the soft, sandy shores of Phuket. This is the perfect tropical escape for those who want to hear the waves from their bedroom. Spend your days swimming, sunbathing, and relaxing on your private patio with a cool drink in hand.",
    image: {
      filename: "image5",
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-947586227795155815/original/c0545be4-22e0-415e-b6a5-f760a7331e1a.jpeg?im_w=1200",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-947586227795155815/original/ebf28a32-d77a-4f34-bdac-77732cd9bd3a.jpeg?im_w=1200",
      },
      {
        filename: "image2",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-947586227795155815/original/fcf92591-7f24-4711-a487-bd8f6dbfc153.jpeg?im_w=1200",
      },
      {
        filename: "image3",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-947586227795155815/original/eb7a7a52-72f3-4106-aa38-49c8b2aba940.jpeg?im_w=720",
      },
      {
        filename: "image4",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-947586227795155815/original/5b05b931-9693-4aaf-b083-8035f113d1ba.jpeg?im_w=1200",
      },
    ],
    price: 15000,
    location: "Phuket",
    country: "Thailand",
    category: "Beach",
    propertyDetails: { guests: 4, bedrooms: 2, bathrooms: 2 },
    amenities: [
      { name: "Beach Access" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Shared Kitchen" },
      { name: "Free Parking" },
      { name: "Outdoor Dining" },
      { name: "Balcony" },
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

  // Camping
  {
    title: "Ganga River Camping in Rishikesh",
    description:
      "Experience a serene riverside camp on the banks of the holy Ganges in Rishikesh. This is an ideal spot for adventure seekers, yoga lovers, and anyone looking to connect with nature. Enjoy evening campfires, stargazing, and listening to the tranquil sounds of the river. A truly refreshing and spiritual experience.",
    image: {
      filename: "image5",
      url: "https://www.campingale.com/img/ris40-18.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://www.campingale.com/img/ris40-06.jpg",
      },
      {
        filename: "image2",
        url: "https://www.campingale.com/img/ris40-02.jpg",
      },
      {
        filename: "image3",
        url: "https://www.campingale.com/img/ris40-03.jpg",
      },
      {
        filename: "image4",
        url: "https://www.campingale.com/img/ris40-16.jpg",
      },
    ],
    price: 2500,
    location: "Rishikesh",
    country: "India",
    category: "Camping",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Campfire" },
      { name: "Hiking Trails" },
      { name: "Wildlife Viewing" },
      { name: "Home-cooked Meals" },
      { name: "Free Parking" },
      { name: "Pet Friendly" },
      { name: "Stargazing" },
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
    title: "Serengeti Safari: Luxury Glamping Tent",
    description:
      "This is not just camping; it's a luxury glamping experience in the heart of the Serengeti. Witness the Great Migration and the Big Five from the comfort of your lavish tent, which features a proper bed and en-suite bathroom. Enjoy guided safaris during the day and gourmet meals under the stars at night. An unforgettable wildlife adventure.",
    image: {
      filename: "image5",
      url: "https://waybird.imgix.net/lodge_images/images/000/054/907/original/Serengeti-Safari-Camp--Tanzania-timbuktu-travel-11.jpg?w=1420&crop=center%20center&fit=max&dpr=1&q=50&auto=format",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://waybird.imgix.net/lodge_images/images/000/054/896/original/2018-01-Serengeti-Safari-Camo--Tanzania-timbuktu-travel-3.jpg?w=1420&crop=center%20center&fit=max&dpr=1&q=50&auto=format",
      },
      {
        filename: "image2",
        url: "https://waybird.imgix.net/lodge_images/images/000/054/903/original/Serengeti-Safari-Camp--Tanzania-timbuktu-travel-7.jpg?w=1420&crop=center%20center&fit=max&dpr=1&q=50&auto=format",
      },
      {
        filename: "image3",
        url: "https://waybird.imgix.net/lodge_images/images/000/054/904/original/Serengeti-Safari-Camp--Tanzania-timbuktu-travel-8.jpg?w=1420&crop=center%20center&fit=max&dpr=1&q=50&auto=format",
      },
      {
        filename: "image4",
        url: "https://waybird.imgix.net/lodge_images/images/000/054/906/original/Serengeti-Safari-Camp--Tanzania-timbuktu-travel-10.jpg?w=1420&crop=center%20center&fit=max&dpr=1&q=50&auto=format",
      },
    ],
    price: 60000,
    location: "Serengeti",
    country: "Tanzania",
    category: "Camping",
    propertyDetails: { guests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: [
      { name: "Luxury Tent" },
      { name: "Wildlife Viewing" },
      { name: "Guided Safari" },
      { name: "Home-cooked Meals" },
      { name: "Free WiFi" },
      { name: "Heating" },
      { name: "Stargazing" },
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
    title: "Gobi Desert Dream: A Traditional Mongolian Yurt",
    description:
      "Embark on a life-changing cultural journey by staying in a traditional Mongolian yurt (ger) with a nomadic family in the Gobi Desert. This is an authentic, rustic experience far from the tourist trail. Learn about the nomadic way of life, enjoy home-cooked meals, and witness the most spectacular star-filled sky you've ever seen.",
    image: {
      filename: "image5",
      url: "https://media.glampinghub.com/CACHE/images/accommodations/handmade-yurts-in-the-heart-of-the-gobi-mongolia-1521796522473/ce1d0d42b41cbacd3847299b17a335ac.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://media.glampinghub.com/CACHE/images/accommodations/handmade-yurts-in-the-heart-of-the-gobi-mongolia-1521796522709/cc064d97b57ad9392378d0614b511966.jpg",
      },
      {
        filename: "image2",
        url: "https://media.glampinghub.com/CACHE/images/accommodations/handmade-yurts-in-the-heart-of-the-gobi-mongolia-1521796522860/016473d6775e9ef7bfac58db2784f3fa.jpg",
      },
      {
        filename: "image3",
        url: "https://media.glampinghub.com/CACHE/images/accommodations/handmade-yurts-in-the-heart-of-the-gobi-mongolia-1521796522557/4a55a180e705585f71077ec4823fb8ce.jpg",
      },
      {
        filename: "image4",
        url: "https://media.glampinghub.com/CACHE/images/accommodations/handmade-yurts-in-the-heart-of-the-gobi-mongolia-1521796522723/5fdb9a57dd48409765fee9a49dfeeee5.jpg",
      },
    ],
    price: 8000,
    location: "Gobi Desert",
    country: "Mongolia",
    category: "Camping",
    propertyDetails: { guests: 4, bedrooms: 1, bathrooms: 0 },
    amenities: [
      { name: "Cultural Immersion" },
      { name: "Stargazing" },
      { name: "Home-cooked Meals" },
      { name: "Bicycle Rental" },
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

  // Castles
  {
    title: "The Jodhpur Citadel: A Royal Fort Palace",
    description:
      "Live like a Maharaja in your own private wing of a majestic fort palace in Jodhpur. This is an unparalleled heritage experience, offering breathtaking, panoramic views of the 'Blue City.' The property features sprawling courtyards, intricate royal architecture, and dedicated staff to cater to your every need. An unforgettable setting for a special occasion.",
    image: {
      filename: "image5",
      url: "https://plus.unsplash.com/premium_photo-1678916185493-781b5b61b93b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    images: [
      {
        filename: "mainimage",
        url: "https://images.unsplash.com/photo-1705039439212-c3130e4c62a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "image2",
        url: "https://images.unsplash.com/photo-1696246739953-dc82dcec32b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "image3",
        url: "https://images.unsplash.com/photo-1669664321694-b5c57b15c3de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        filename: "image4",
        url: "https://images.unsplash.com/photo-1668517107930-27191d3f4bfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    price: 150000,
    location: "Jodhpur",
    country: "India",
    category: "Castles",
    propertyDetails: { guests: 16, bedrooms: 8, bathrooms: 9 },
    amenities: [
      { name: "Entire Palace" },
      { name: "Rooftop View" },
      { name: "Free WiFi" },
      { name: "Air Conditioning" },
      { name: "Full Kitchen" },
      { name: "Garden" },
      { name: "24/7 Security" },
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
    title: "Lord of the Glen: A Grand Scottish Highland Castle",
    description:
      "Command your own 15th-century Scottish castle, set amidst the dramatic and beautiful Highlands. This exclusive-use property features a grand hall with a roaring fireplace, eight stately bedrooms, and sprawling private grounds. It's the perfect venue for a magnificent family reunion, wedding, or a once-in-a-lifetime luxury holiday.",
    image: {
      filename: "image5",
      url: "https://secure.uniquebookingservices.com/uf/property/1355/gallery/10926/24826/232109-v3-gallery@2x.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://secure.uniquebookingservices.com/uf/property/1355/gallery/5902/14657/150947-v1-gallery@2x.jpg",
      },
      {
        filename: "image2",
        url: "https://secure.uniquebookingservices.com/uf/property/1355/gallery/10918/24810/232104-v2-gallery@2x.jpg",
      },
      {
        filename: "image3",
        url: "https://secure.uniquebookingservices.com/uf/property/1355/gallery/2032/5718/232088-v7-gallery@2x.jpg",
      },
      {
        filename: "image4",
        url: "https://secure.uniquebookingservices.com/uf/property/1355/gallery/10939/24854/232081-v1-gallery@2x.jpg",
      },
    ],
    price: 220000,
    location: "Highlands",
    country: "Scotland",
    category: "Castles",
    propertyDetails: { guests: 16, bedrooms: 8, bathrooms: 9 },
    amenities: [
      { name: "Entire Castle" },
      { name: "Free WiFi" },
      { name: "Heating" },
      { name: "Fireplace" },
      { name: "Full Kitchen" },
      { name: "Garden" },
      { name: "Free Parking" },
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
    title: "Le Rêve Royal: A Majestic Loire Valley Château",
    description:
      "Live out your fairytale fantasies at this majestic château in the heart of France’s Loire Valley. Surrounded by manicured gardens and a private lake, this opulent estate boasts a grand ballroom, ten luxurious bedrooms, and exquisite period details. It is the ultimate destination for a lavish wedding, a grand celebration, or an unforgettable holiday.",
    image: {
      filename: "image5",
      url: "https://travelmemo.com/wp-content/uploads/2011/07/rolls-royce-chateau-barre-hotel-vanssay-loire-france.jpg",
    },
    images: [
      {
        filename: "mainImage",
        url: "https://travelmemo.com/wp-content/uploads/2011/07/garden-view-chateau-barre-hotel-vanssay-loire-france-440x328.jpg",
      },
      {
        filename: "image2",
        url: "https://travelmemo.com/wp-content/uploads/2011/05/dining-room-chateau-barre-hotel-vanssay-loire-france.jpg",
      },
      {
        filename: "image3",
        url: "https://travelmemo.com/wp-content/uploads/2011/07/yellow-ensuite-guest-room-chateau-barre-hotel-vanssay-loire-france.jpg",
      },
      {
        filename: "image4",
        url: "https://travelmemo.com/wp-content/uploads/2011/07/salon-chateau-barre-hotel-vanssay-loire-france.jpg",
      },
    ],
    price: 250000,
    location: "Loire Valley",
    country: "France",
    category: "Castles",
    propertyDetails: { guests: 20, bedrooms: 10, bathrooms: 12 },
    amenities: [
      { name: "Entire Castle" },
      { name: "Lake View" },
      { name: "Garden" },
      { name: "Free WiFi" },
      { name: "Free Parking" },
      { name: "Full Kitchen" },
      { name: "Heating" },
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
