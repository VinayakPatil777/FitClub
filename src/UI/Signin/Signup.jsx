import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({ email, password });
  
      if (error) throw error;
  
      // Get user ID from authentication
      let user = data.user;
      if (!user) {
        const { data: authData } = await supabase.auth.getUser();
        user = authData?.user;
      }
  
      if (user) {
        // Check if user already exists in users table
        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("id")
          .eq("id", user.id)
          .single();
  
        if (!existingUser) {
          // Insert only if user does not exist
          const { error: dbError } = await supabase
            .from("users")
            .insert([{ id: user.id, email: user.email, plan: "Free" }]);
  
          if (dbError) throw dbError;
        }
      }
  
      toast.success("Signup Successful! Redirecting...", { position: "top-right" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error signing up:", error.message);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="loginButton">
            Sign Up
          </button>
        </form>
        <p className="signupText">
          Already have an account?{" "}
          <NavLink to="/login" className="signupLink">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
