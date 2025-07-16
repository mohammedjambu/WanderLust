import {
  Wifi,
  ChefHat,
  Waves,
  PawPrint,
  Snowflake,
  WashingMachine,
  ThermometerSun,
  AirVent,
  Bike,
  Binoculars,
  FlameKindling,
  Castle,
  Globe2,
  Mountain,
  ParkingCircle,
  Soup,
  Sprout,
  Store,
  Tent,
  Trees,
  Tv2,
  Wine,
  WavesLadder,
  HelpCircle,
  Star,
  ShieldCheck,
} from "lucide-react";
import {
  MdBalcony,
  MdOutlineFireplace,
  MdOutlineHiking,
  MdOutlineBrunchDining,
  MdOutlinePool,
} from "react-icons/md";
import { FaPeopleRoof, FaTent } from "react-icons/fa6";
import { TbBeach, TbGrill, TbToolsKitchen2 } from "react-icons/tb";
import { GiIndianPalace, GiCircleForest } from "react-icons/gi";

const allAmenityNames = [
  "24/7 Security",
  "Air Conditioning",
  "Balcony",
  "BBQ Grill",
  "Beach Access",
  "Bicycle Rental",
  "Campfire",
  "Camping Tent",
  "City Access",
  "Cultural Immersion",
  "Entire Castle",
  "Entire Palace",
  "Fireplace",
  "Free Parking",
  "Free WiFi",
  "Full Kitchen",
  "Garden",
  "Guided Safari",
  "Heating",
  "Hiking Trails",
  "Home-cooked Meals",
  "Infinity Pool",
  "Lake View",
  "Laundry Service",
  "Luxury Tent",
  "Mountain Views",
  "Organic Farm",
  "Outdoor Dining",
  "Pet Friendly",
  "Private Pool",
  "Rooftop View",
  "Shared Kitchen",
  "Ski Storage",
  "Smart TV",
  "Stargazing",
  "Wildlife Viewing",
  "Wine Tasting",
];

const normalizeAmenityName = (name) => {
  if (!name) return "";
  return name.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
};

export const getAmenityIcon = (name) => {
  const iconClass = "w-6 h-6 text-gray-800 flex-shrink-0";
  const normalizedName = normalizeAmenityName(name);

  switch (normalizedName) {
    case "free-wifi":
      return <Wifi className={iconClass} />;
    case "free-parking":
      return <ParkingCircle className={iconClass} />;
    case "air-conditioning":
      return <AirVent className={iconClass} />;
    case "heating":
      return <ThermometerSun className={iconClass} />;
    case "pet-friendly":
      return <PawPrint className={iconClass} />;
    case "fireplace":
      return <MdOutlineFireplace className={iconClass} />;
    case "laundry-service":
      return <WashingMachine className={iconClass} />;
    case "smart-tv":
      return <Tv2 className={iconClass} />;
    case "24/7-security":
      return <ShieldCheck className={iconClass} />;
    case "full-kitchen":
      return <ChefHat className={iconClass} />;
    case "shared-kitchen":
      return <TbToolsKitchen2 className={iconClass} />;
    case "wine-tasting":
      return <Wine className={iconClass} />;
    case "home-cooked-meals":
      return <Soup className={iconClass} />;
    case "outdoor-dining":
      return <MdOutlineBrunchDining className={iconClass} />;
    case "bbq-grill":
      return <TbGrill className={iconClass} />;
    case "private-pool":
      return <MdOutlinePool className={iconClass} />;
    case "infinity-pool":
      return <WavesLadder className={iconClass} />;
    case "lake-view":
      return <Waves className={iconClass} />;
    case "rooftop-view":
      return <FaPeopleRoof className={iconClass} />;
    case "balcony":
      return <MdBalcony className={iconClass} />;
    case "garden":
      return <Trees className={iconClass} />;
    case "mountain-views":
      return <Mountain className={iconClass} />;
    case "organic-farm":
      return <Sprout className={iconClass} />;
    case "beach-access":
      return <TbBeach className={iconClass} />;
    case "hiking-trails":
      return <MdOutlineHiking className={iconClass} />;
    case "camping-tent":
      return <Tent className={iconClass} />;
    case "luxury-tent":
      return <FaTent className={iconClass} />;
    case "campfire":
      return <FlameKindling className={iconClass} />;
    case "wildlife-viewing":
      return <Binoculars className={iconClass} />;
    case "guided-safari":
      return <GiCircleForest className={iconClass} />;
    case "stargazing":
      return <Star className={iconClass} />;
    case "bicycle-rental":
      return <Bike className={iconClass} />;
    case "cultural-immersion":
      return <Globe2 className={iconClass} />;
    case "ski-storage":
      return <Snowflake className={iconClass} />;
    case "entire-castle":
      return <Castle className={iconClass} />;
    case "entire-palace":
      return <GiIndianPalace className={iconClass} />;
    case "city-access":
      return <Store className={iconClass} />;
    default:
      return <HelpCircle className={iconClass} />;
  }
};

export const amenityOptions = allAmenityNames.map((name) => ({
  name,
  icon: getAmenityIcon(name),
}));
