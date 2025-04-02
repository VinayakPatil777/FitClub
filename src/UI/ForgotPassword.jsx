import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

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
    <div className="loginPage">
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
      </div>
    </div>
  );
};

export default ForgotPassword;