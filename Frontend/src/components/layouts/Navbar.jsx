import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import "../../utils css/Navbar.css";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import {
  GiFamilyHouse,
  GiWoodCabin,
  GiCampingTent,
  GiCastle,
} from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoFlame, IoBedOutline } from "react-icons/io5";
import { authDataContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

import { LuLuggage } from "react-icons/lu";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { IoHomeSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { PiListBulletsFill } from "react-icons/pi";



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
  { icon: <FaUmbrellaBeach />, label: "Beach" },
  { icon: <GiCampingTent />, label: "Camping" },
  { icon: <GiCastle />, label: "Castles" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { authUser, loading, logout } = useContext(authDataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navRef = useRef(null);
  const filtersRef = useRef(null);

  // dropdown click-away handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // dropdown scroll-away handler
  useEffect(() => {
    const handleScroll = () => {
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const calculateHeight = () => {
      const navbarHeight = navRef.current?.offsetHeight || 0;
      const filtersHeight = filtersRef.current?.offsetHeight || 0;
      const totalHeight = navbarHeight + filtersHeight;

      document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbarHeight}px`
      );
      document.documentElement.style.setProperty(
        "--filters-height",
        `${filtersHeight}px`
      );
      document.documentElement.style.setProperty(
        "--total-fixed-height",
        `${totalHeight}px`
      );
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [location.pathname]);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const handleFilterOrSearch = (newSearch, newCategory) => {
    const params = new URLSearchParams(searchParams);
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logout Successful");
    navigate("/");
  };

  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Add this new function inside your Navbar component
const handleSearchInputChange = (e) => {
  const newSearchValue = e.target.value;
  setSearchInput(newSearchValue);

  if (newSearchValue === "") {
    handleFilterOrSearch("", selectedCategory);
  }
};

  const renderDropdownMenu = () => {
    if (loading) return null;

    if (!authUser) {
      return (
        <>
          <Link
            className="dropdown-item bold"
            to="/login"
            onClick={closeAllMenus}
          >
            Log in
          </Link>
          <Link
            className="dropdown-item bold"
            to="/signup"
            onClick={closeAllMenus}
          >
            Sign up
          </Link>
          <hr />
          <Link
            className="dropdown-item"
            to="/createListing1"
            onClick={closeAllMenus}
          >
            Airbnb your home
          </Link>
        </>
      );
    }
    return (
      <>
        <div className="dropdown-container">
          <LuLuggage className="dropdown-navbar-icon" />
          <Link
            className="dropdown-item bold"
            to="/mytrips"
            onClick={closeAllMenus}
          >
            Trips
          </Link>
        </div>

        <div className="dropdown-container">
          <PiHeartStraightDuotone className="dropdown-navbar-icon" />
          <Link
            className="dropdown-item bold"
            to="/wishlist"
            onClick={closeAllMenus}
          >
            Wishlist
          </Link>
        </div>

        <div className="dropdown-container">
          <PiListBulletsFill className="dropdown-navbar-icon" />
          <Link
            className="dropdown-item"
            to="/mylisting"
            onClick={closeAllMenus}
          >
            My Listings
          </Link>
        </div>

        <div className="dropdown-container">
          <CgProfile className="dropdown-navbar-icon" />
          <Link className="dropdown-item" to="/profile" onClick={closeAllMenus}>
            Profile
          </Link>
        </div>
        <hr />

        <div className="dropdown-container">
          <IoHomeSharp className="dropdown-navbar-icon excep" />
          <Link
            className="dropdown-item"
            to="/createListing1"
            onClick={closeAllMenus}
          >
            Airbnb your home
          </Link>
        </div>
        <hr />

        <div className="dropdown-container">
          <FiLogOut className="dropdown-navbar-icon " />
          <button className="dropdown-item" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </>
    );
  };

  return (
    <header className="navbar-header">
      <nav
        ref={navRef}
        className={`navbar-top ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Wanderlust
          </Link>

          {location.pathname === "/" && (
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
                  onChange={handleSearchInputChange}
                  placeholder="Search destinations"
                  aria-label="Search destinations"
                />
                <button className="search-btn" type="submit" aria-label="Search">
                  <FiSearch className="search-icon" />
                </button>
              </form>
            </div>
          )}

          <button
            className="navbar-toggler"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-content"
          >
            <FaBars />
            {authUser ? (
              <img
                src={authUser.avatar || "/default-avatar.png"}
                alt="User profile"
                className="profile-avatar"
              />
            ) : (
              <CgProfile className="dropdown-icon" />
            )}
          </button>

          {/* Desktop User Menu */}
          <div className="user-menu-container" ref={dropdownRef}>
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Toggle user menu"
              aria-expanded={isDropdownOpen}
              aria-controls="desktop-dropdown-menu"
            >
              <FaBars className="fa-bars" />
              {authUser ? (
                <img
                  src={authUser.avatar || "/default-avatar.png"}
                  alt="User profile"
                  className="profile-avatar"
                />
              ) : (
                <CgProfile className="dropdown-icon" />
              )}
            </button>
            <div
              id="desktop-dropdown-menu"
              className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
            >
              {renderDropdownMenu()}
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div id="mobile-menu-content" className="mobile-menu" ref={mobileMenuRef}>
          <div className="dropdown-menu">{renderDropdownMenu()}</div>
        </div>
      </nav>

      {location.pathname === "/" && (
        <div className="filters-wrapper" ref={filtersRef}>
          <div className="filters">
            {filterItems.map((item) => {
              const isTrendingActive =
                item.label === "Trending" && !selectedCategory;
              const isCategoryActive = selectedCategory === item.label;
              const isActive = isTrendingActive || isCategoryActive;

              return (
                <div
                  key={item.label}
                  className={`filter ${isActive ? "active" : ""}`}
                  onClick={() => {
                    const newCategory =
                      item.label === "Trending" ? "" : item.label;
                    handleFilterOrSearch(searchInput, newCategory);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="filter-icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
