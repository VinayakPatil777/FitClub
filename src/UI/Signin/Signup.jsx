import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup Successful!", { position: "top-right" });
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <div className="loginPage">
      <ToastContainer />
      <div className="loginWrapper">
        <h2 className="loginTitle">Sign Up</h2>
        <form className="loginForm" onSubmit={handleSignup}>
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
          <button type="submit" className="loginButton">Sign Up</button>
        </form>
        <p className="signupText">
          Already have an account? <NavLink to="/login" className="signupLink">Log in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;