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

const Header = () => {
  const headerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sticky Header Function
  const headerFunc = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
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

  // Function to get initials for avatar
  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

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

          {/* Navigation Menu */}
          <div className="navigation">
            <ul className="menu">
              {nav__links.map((item) => (
                <NavLink className="nav__item" key={item.path} to={item.path}>
                  {item.display}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* Right Side - Profile & Login */}
          <div className="nav__right">
            {location.pathname !== "/login" && location.pathname !== "/signup" && (
              <>
                {user ? (
                  <div className="profile__container">
                    {/* Profile Avatar */}
                    <div
                      className="avatar"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {getInitials(user.email)}
                    </div>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                      <div className="profile__dropdown">
                        <p className="dropdown__item">{user.email}</p>
                        <button className="dropdown__item logout" onClick={handleLogout}>
                          Logout
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
            <span className="mobile__menu">
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
