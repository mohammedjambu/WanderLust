import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { 
  IoFlame,  
  IoBedOutline,
} from 'react-icons/io5';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setCurrUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/logout');
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
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Wanderlust
        </Link>

        {/* Search Bar */}
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

        {/* Toggler for Mobile */}
        <button className="navbar-toggler" onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        {/* Dropdown Menu */}
        <div className={`dropdown ${isMobileMenuOpen ? "mobile-show" : ""}`}>
          <div className="dropdown-header" onClick={toggleDropdown}>
            <button className="dropdown-toggle" >
              {/* <FaBars className="dropdown-icon" /> */}
              {isDropdownOpen ? <FaBars /> : <FaBars />}
              <CgProfile className="dropdown-icon" />
            </button>
          </div>

          {/* Dropdown Menu Items */}
          <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
            {!currUser ? (
              <>
                <Link
                  className="dropdown-item bold"
                  to="/login"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Log in
                </Link>
                <Link
                  className="dropdown-item bold"
                  to="/signup"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign up
                </Link>
                <hr />
              </>
            ) : (
              <>
                <Link
                  className="dropdown-item"
                  to="/logout"
                  onClick={handleLogout}
                >
                  Log out
                </Link>
                <Link
                  className="dropdown-item"
                  to="/mylisting"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  My Listing
                </Link>
              </>
            )}
            <Link
              className="dropdown-item"
              to="/CreateListing1"
              onClick={() => {
                setIsDropdownOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              Airbnb your home
            </Link>
          </div>
        </div>
      </div>

        {/* <hr></hr> */}
      {/* Filter bar */}
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