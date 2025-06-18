import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoFlame, IoBedOutline } from 'react-icons/io5';
import axios from "axios";
import { authDataContext } from '../context/AuthContext';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, setCurrentUser, serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      setCurrentUser(null);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      console.log("Logout successful");
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const filterItems = [
    { icon: <IoFlame />, label: 'Trending' },
    { icon: <GiFamilyHouse />, label: 'Villa' },
    { icon: <FaTreeCity />, label: 'Farm House' },
    { icon: <MdOutlinePool />, label: 'Pool House' },
    { icon: <MdBedroomParent />, label: 'Rooms' },
    { icon: <BiBuildingHouse />, label: 'Flat' },
    { icon: <IoBedOutline />, label: 'PG' },
    { icon: <GiWoodCabin />, label: 'Cabins' },
    { icon: <SiHomeassistantcommunitystore />, label: 'Shops' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">Wanderlust</Link>

        <div className="search-container">
          <form className="search-form" role="search">
            <input
              className="search-inp"
              type="search"
              placeholder="Any Where | Any Location | Any City"
            />
            <button className="search-btn" type="submit">
              <FiSearch className="search-icon" />
            </button>
          </form>
        </div>

        <button className="navbar-toggler" onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        {/* Profile Dropdown */}
        <div className={`dropdown ${isMobileMenuOpen ? "mobile-show" : ""}`}>
          <div className="dropdown-header" onClick={toggleDropdown}>
            <button className="dropdown-toggle">
              <FaBars />
              <CgProfile className="dropdown-icon" />
            </button>
          </div>

          <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
            {!currentUser ? (
              <>
                <Link
                  className="dropdown-item bold"
                  to="/login"
                  onClick={toggleMobileMenu}
                >
                  Log in
                </Link>
                <Link
                  className="dropdown-item bold"
                  to="/signup"
                  onClick={toggleMobileMenu}
                >
                  Sign up
                </Link>
                <hr />
              </>
            ) : (
              <>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  Log out
                </div>
                <Link
                  className="dropdown-item"
                  to="/mylisting"
                  onClick={toggleMobileMenu}
                >
                  My Listing
                </Link>
                
              </>
            )}
            <Link
              className="dropdown-item"
              to="/CreateListing1"
              onClick={toggleMobileMenu}
            >
              Airbnb your home
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-wrapper">
        <div className="filters">
          {filterItems.map((item, index) => (
            <div key={index} className="filter">
              <div className="filter-icon">{item.icon}</div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
