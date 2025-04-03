import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "../Signin/Signup.css";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message, { position: "top-right" });
      return;
    }

    // Fetch user profile from Supabase
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("id, email, plan, profile_picture")
      .eq("email", email)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
    } else {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }

    toast.success("Login Successful!", { position: "top-right" });
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="loginPage2">
      <div className="loginWrapper">
        <h2 className="loginTitle">Login</h2>
        <form className="loginForm" onSubmit={handleLogin}>
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
          <button type="submit" className="loginButton">Login</button>
        </form>
        <p className="signupText">
          New user?
          <NavLink to="/signup" className="signupLink">Sign up here</NavLink>
        </p>
        <Link to="/forgot-password" style={{ color: "white", margin: "10px" }}>
          Forgot Password?
        </Link>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
