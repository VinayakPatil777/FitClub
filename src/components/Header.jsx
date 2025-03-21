import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "../styles/header.css";
import logo from "../assets/img/vsLogo.jpg";
import { useLocation } from "react-router-dom";

const nav__links = [
  { path: "/", display: "Home" },
  { path: "/programs", display: "Programs" },
  { path: "/membership", display: "Membership" },
  { path: "/about", display: "About" },
  { path: "/contact", display: "Contact Us" },
];

// Simulate fetching user plan (Replace with actual plan data from DB)
const getUserPlan = (email) => {
  if (!email) return "Regular Member"; // Default
  if (email.includes("gold")) return "Gold Member";
  if (email.includes("standard")) return "Standard Member";
  return "Regular Member";
};

const Header = () => {
  const headerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [plan, setPlan] = useState(() => {
    return (localStorage.getItem("userPlan") || "free").trim().toLowerCase();
  });
  useEffect(() => {
    const storedPlan = localStorage.getItem("userPlan");
    if (storedPlan) {
      setPlan(storedPlan.trim().toLowerCase());
    }
  }, []);
  // Sticky Header
  useEffect(() => {
    const headerFunc = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  // Get initials for avatar
  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          {/* Logo */}
          <div className="logo">
            <div className="logo__img">
              <img src={logo} alt="Fitness Club Logo" />
            </div>
            <h2>Fitness Club</h2>
          </div>

          <div className={`navigation ${mobileMenuOpen ? "open" : ""}`}>
            <ul className="menu">
              {nav__links.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "nav__item active" : "nav__item"
                    }
                    onClick={() => setMobileMenuOpen(false)} // Close mobile menu on click
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right">
            {location.pathname !== "/login" &&
              location.pathname !== "/signup" && (
                <>
                  {user ? (
                    <div
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="profile__container "
                      ref={dropdownRef}
                    >
                      <div className="avatar" aria-label="User menu">
                        {getInitials(user.email)}
                      </div>

                      {showDropdown && (
                        <div className="profile__dropdown">
                          <p className="dropdown__item email">
                            <>
                              <i className="ri-mail-check-line icon"></i>
                              <span>{user.email}</span>
                            </>
                          </p>

                          <p className="dropdown__item email">
                          {plan === "free" ? <span>Free Access</span> : <span>Premium Access</span>}

                          </p>

                          <button
                            className="dropdown__item logout"
                            onClick={handleLogout}
                          >
                            <i className="ri-logout-box-r-line icon"></i>
                            <span>Logout</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink to="/login">
                      <button className="register__btn">Login</button>
                    </NavLink>
                  )}
                </>
              )}

            {/* Mobile Menu Icon */}
            <span
              className="mobile__menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`ri-${mobileMenuOpen ? "close" : "menu"}-line`}></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
