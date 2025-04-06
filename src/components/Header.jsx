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
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user and plan
  useEffect(() => {
    const fetchUserAndPlan = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session?.user) {
        const currentUser = session.user;
        setUser(currentUser);

        // Fetch plan
        const { data: userData, error: planError } = await supabase
          .from("users")
          .select("plan")
          .eq("id", currentUser.id)
          .single();

        if (!planError && userData?.plan) {
          setPlan(userData.plan.toLowerCase());
        } else {
          setPlan("free");
        }
      } else {
        setUser(null);
        setPlan(null);
      }
    };

    fetchUserAndPlan();

    // Optional: Listen to auth state change to update user state when login/logout occurs
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          fetchUserAndPlan();
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setPlan(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPlan(null);
    navigate("/login");
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
                            {plan === "free" && <span>Free Access</span>}
                            {plan === "standard" && (
                              <span>Standard Member</span>
                            )}
                            {plan === "gold" && <span>Gold Member</span>}
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
