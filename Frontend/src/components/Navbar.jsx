import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoFlame, IoBedOutline } from 'react-icons/io5';
import { authDataContext } from '../context/AuthContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { authUser, loading, logout } = useContext(authDataContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false); 
  };
  
  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    console.log("Logout successful");
    navigate('/');
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

  const renderDropdownMenu = () => {
    if (loading) {
      return null;
    }
    if (!authUser) {
      return (
        <>
          <Link className="dropdown-item bold" to="/login" onClick={() => setIsDropdownOpen(false)}>Log in</Link>
          <Link className="dropdown-item" to="/signup" onClick={() => setIsDropdownOpen(false)}>Sign up</Link>
          <hr />
          <Link className="dropdown-item" to="/createListing1" onClick={() => setIsDropdownOpen(false)}>Airbnb your home</Link>
        </>
      );
    } else {
      return (
        <>
          <Link className="dropdown-item" to="/mylisting" onClick={() => setIsDropdownOpen(false)}>My Listings</Link>
          <Link className="dropdown-item" to="/createListing1" onClick={() => setIsDropdownOpen(false)}>Airbnb your home</Link>
          <hr />
          <div className="dropdown-item logout" onClick={handleLogout}>Log out</div>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">Wanderlust</Link>

        <div className="search-container">
          <form className="search-form" role="search">
            <input className="search-inp" type="search" placeholder="Any Where | Any Location | Any City" />
            <button className="search-btn" type="submit"><FiSearch className="search-icon" /></button>
          </form>
        </div>

        {/* This is the hamburger menu button for mobile */}
        <button className="navbar-toggler" onClick={toggleMobileMenu}><FaBars /></button>

        {/* This is the desktop profile dropdown */}
        <div className="dropdown">
          <div className="dropdown-header" onClick={toggleDropdown}>
            <button className="dropdown-toggle">
              <FaBars className="fa-bars" />
              {authUser ? (
                 <img src={authUser.avatar || '/default-avatar.png'} alt={authUser.username} className="profile-avatar" />
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
      
      {/* This section will show below the hamburger menu on mobile when it's open */}
      {isMobileMenuOpen && (
        <div className="dropdown mobile-show">
           <div className="dropdown-menu show">
             {renderDropdownMenu()}
           </div>
        </div>
      )}

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