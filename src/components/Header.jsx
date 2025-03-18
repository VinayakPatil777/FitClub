import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth instance
import { signOut } from "firebase/auth";
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
  const [userData, setUserData] = useState({ name: "", profileImg: "" });

  // Sticky Header Function
  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };
    fetchUserData();
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
            <>
              {location.pathname !== "/login" &&
                location.pathname !== "/signup" && (
                  <>
                    {user ? (
                      <div className="profile__container">
                        <button
                          className="register__btn"
                          onClick={handleLogout}
                          // onClick={() => setShowDropdown(!showDropdown)}
                        >
                          LogOut
                          {/* <img src="" alt="" /> */}
                          {/* <img src={userData.profileImg || "/default-avatar.png"} alt="Profile"  /> */}
                          
                        </button>

                        {/* Dropdown Menu */}
                        {/* {showDropdown && (
                          <div className="profile__dropdown">
                            <h2>{userData.name || "User"}</h2>
                            <NavLink to="/settings" className="dropdown__item">
                              Settings
                            </NavLink>
                            <NavLink to="/user-info" className="dropdown__item">
                              User Info
                            </NavLink>
                            <button
                              className="dropdown__item logout"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </div>
                        )} */}
                      </div>
                    ) : (
                      <NavLink to="/login">
                        <button className="register__btn">Login</button>
                      </NavLink>
                    )}
                  </>
                )}
            </>

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
