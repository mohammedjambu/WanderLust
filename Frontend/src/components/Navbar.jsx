import React, { useState, useContext, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoFlame, IoBedOutline } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { User } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const { authUser, loading, logout } = useContext(authDataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  const handleFilterOrSearch = (newSearch, newCategory) => {
    const params = new URLSearchParams();
    if (newSearch) {
      params.set("search", newSearch);
    }
    if (newCategory) {
      params.set("category", newCategory);
    }
    navigate(`/?${params.toString()}`);
  };

  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const filterItems = [
    { icon: <IoFlame />, label: "Trending" },
    { icon: <GiFamilyHouse />, label: "Villa" },
    { icon: <FaTreeCity />, label: "Farm House" },
    { icon: <MdOutlinePool />, label: "Pool House" },
    { icon: <MdBedroomParent />, label: "Rooms" },
    { icon: <BiBuildingHouse />, label: "Flat" },
    { icon: <IoBedOutline />, label: "PG" },
    { icon: <GiWoodCabin />, label: "Cabins" },
    { icon: <SiHomeassistantcommunitystore />, label: "Shops" },
  ];

  const renderDropdownMenu = () => {
    if (loading) {
      return null;
    }
    if (!authUser) {
      return (
        <>
          <Link
            className="dropdown-item bold"
            to="/login"
            onClick={() => setIsDropdownOpen(false)}
          >
            Log in
          </Link>
          <Link
            className="dropdown-item bold"
            to="/signup"
            onClick={() => setIsDropdownOpen(false)}
          >
            Sign up
          </Link>
          <hr />
          <Link
            className="dropdown-item"
            to="/createListing1"
            onClick={() => setIsDropdownOpen(false)}
          >
            Airbnb your home
          </Link>
        </>
      );
    }
    return (
      <>
        <Link
          className="dropdown-item"
          to="/profile"
          onClick={() => setIsDropdownOpen(false)}
        >
          {/* <User />  */}
          Profile
        </Link>
        <Link
          className="dropdown-item"
          to="/wishlist"
          onClick={() => setIsDropdownOpen(false)}
        >
          WishList
        </Link>
        <Link
          className="dropdown-item"
          to="/mytrips"
          onClick={() => setIsDropdownOpen(false)}
        >
          Trips
        </Link>
        <Link
          className="dropdown-item"
          to="/mylisting"
          onClick={() => setIsDropdownOpen(false)}
        >
          My Listings
        </Link>
        <hr></hr>
        <Link
          className="dropdown-item"
          to="/createListing1"
          onClick={() => setIsDropdownOpen(false)}
        >
          Airbnb your home
        </Link>
        <hr />
        <div className="dropdown-item logout" onClick={handleLogout}>
          Log out
        </div>
      </>
    );
  };

  return (
    <>
      <nav className="navbar-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Wanderlust
          </Link>

          <div className="search-container">
            <form
              className="search-form"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                handleFilterOrSearch(searchInput, selectedCategory);
              }}
            >
              <input
                className="search-inp"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search destinations"
              />
              <button className="search-btn" type="submit">
                <FiSearch className="search-icon" />
              </button>
            </form>
          </div>

          <button className="navbar-toggler" onClick={toggleMobileMenu}>
            <FaBars />
          </button>

          <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              <button className="dropdown-toggle">
                <FaBars className="fa-bars" />
                {authUser ? (
                  <img
                    src={authUser.avatar || "/default-avatar.png"}
                    alt={authUser.username}
                    className="profile-avatar"
                  />
                ) : (
                  <CgProfile className="dropdown-icon" />
                )}
              </button>
            </div>
            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              {renderDropdownMenu()}
            </div>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="dropdown mobile-show">
            <div className="dropdown-menu show">{renderDropdownMenu()}</div>
          </div>
        )}
      </nav>

      {location.pathname === "/" && (
        <div className="filters-wrapper">
          <div className="filters">
            {filterItems.map((item, index) => {
              // ✅ FIX: Logic to determine if a filter is active
              const isTrendingActive = item.label === "Trending" && !selectedCategory;
              const isCategoryActive = selectedCategory === item.label;
              const isActive = isTrendingActive || isCategoryActive;

              return (
                <div
                  key={index}
                  className={`filter ${isActive ? "active" : ""}`}
                  onClick={() => {
                    // ✅ FIX: If "Trending" is clicked, clear the category. Otherwise, set it.
                    const newCategory = item.label === "Trending" ? "" : item.label;
                    handleFilterOrSearch(searchInput, newCategory);
                  }}
                >
                  <div className="filter-icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;