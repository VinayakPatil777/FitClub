import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Signin/Signup.css"; // Changed filename to avoid overrides

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/");
      }, 3000);
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

        <Link to="/forgot-password" style={{color:"white", margin:"10px"}}>Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
