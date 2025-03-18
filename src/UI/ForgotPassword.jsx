import { useState } from "react";
import { auth } from "../firebase"; // Make sure Firebase is initialized
import { sendPasswordResetEmail } from "firebase/auth";
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

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Failed to send reset email. Check your email address.");
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
