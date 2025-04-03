import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password", // Adjust for production
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent! Check your email.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="loginPage3">
      <div className="loginWrapper">
        <h2 className="loginTitle">Forgot Password?</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="loginInput"
            required
          />
          <button type="submit" className="loginButton">
            Reset Password
          </button>
        </form>
        {message && (
          <p style={{ color: "#00f3ff", marginTop: "12px" }}>{message}</p>
        )}
        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}

        {/* Login & Sign Up Links */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            <Link to="/login" style={{ color: "#00f3ff", textDecoration: "none" }}>
              Back to Login
            </Link>
          </p>
          <p style={{padding:"10px", gap:"4px"}}>
            <span>New here? </span>
            <Link to="/signup" style={{ color: "#00f3ff", textDecoration: "none"  }}>
               Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
