import { useState } from "react";
import { auth, db } from "../../firebase"; // Import Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Signin/Signup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user's subscription plan from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("User Plan:", userData.plan); // Debugging
        localStorage.setItem("userPlan", userData.plan); // Store plan in local storage or context
      } else {
        console.warn("No user data found!");
      }

      toast.success("Login Successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <div className="loginPage">
      <ToastContainer />
      <div className="loginWrapper">
        <h2 className="loginTitle">Login</h2>
        <form className="loginForm" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
        <p className="signupText">
          New user?{" "}
          <NavLink to="/signup" className="signupLink">
            Sign up here
          </NavLink>
        </p>
        <Link to="/forgot-password" style={{ color: "white", margin: "10px" }}>
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
