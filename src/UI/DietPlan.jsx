import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Import Supabase client
import "../styles/dietplan.css"; // Import CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";

const DietPlan = () => {
  const [plan, setPlan] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Fetch user plan from Supabase
  useEffect(() => {
    const fetchUserPlan = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const userId = session.user.id;
        const { data, error } = await supabase
          .from("users")
          .select("plan")
          .eq("id", userId)
          .single();

        if (!error && data) {
          setPlan(data.plan.toLowerCase());
        } else {
          console.error("Error fetching user plan:", error);
        }
      } else {
        setPlan("free"); // Default to free if not logged in
      }
    };

    fetchUserPlan();
  }, []);

  const prompts = [
    "Suggest a high-protein diet",
    "What is the best diet for weight loss?",
    "Give me a 7-day vegetarian diet plan",
  ];

  return (
    <>
      {plan !== "standard" && plan !== "gold" ? (
        <div className="restricted-access">
          <h2>Upgrade Required</h2>
          <p>The AI Health Assistant is only available for Standard and Gold members.</p>
          <a href="/membership" className="upgrade-button">
            Upgrade Plan
          </a>
        </div>
      ) : (
        <div className="chat-container">
          <h2 className="chat-title">AI Health Assistant</h2>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your diet..."
            />
            <button onClick={() => handleSend(input)}>Send</button>
          </div>

          {!clicked && (
            <div className="prompt-buttons">
              {prompts.map((prompt, index) => (
                <button key={index} onClick={() => handleSend(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {clicked && messages.length > 0 && (
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.sender === "bot" && (
                    <img
                      src="https://as2.ftcdn.net/v2/jpg/02/23/38/61/1000_F_223386120_OMJd0gW045lI3TGy4UfUDOzOKvcrDWLR.jpg"
                      alt="Bot"
                      className="bot-avatar"
                    />
                  )}
                  <div className="message-text">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="bot-typing">
                  <img src="/bot-icon.png" alt="Bot" className="bot-avatar" />
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default DietPlan;
