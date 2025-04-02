import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [plan, setPlan] = useState("free");

  // Fetch user session
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchUserPlan(session.user.id);
      }
    };
    fetchUser();
  }, []);

  // Fetch user plan from Supabase
  const fetchUserPlan = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("plan")
      .eq("id", userId)
      .single();
    if (!error && data) {
      setPlan(data.plan.toLowerCase());
    }
  };

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

  // Logout Function
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
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
                    onClick={() => setMobileMenuOpen(false)}
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
                      className="profile__container"
                      ref={dropdownRef}
                    >
                      <div className="avatar" aria-label="User menu">
                        {user.email.charAt(0).toUpperCase()}
                      </div>

                      {showDropdown && (
                        <div className="profile__dropdown">
                          <p className="dropdown__item email">
                            <i className="ri-mail-check-line icon"></i>
                            <span>{user.email}</span>
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