import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../styles/dietplan.css"; // Import CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";

const API_KEY = "AIzaSyD_MmGjSOMtP4I_6n5Mh1AX1lM_ohsTLEc"; // Replace with your actual API Key

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const DietPlan = () => {
  const [plan, setPlan] = useState(() => {
    return (localStorage.getItem("userPlan") || "free").trim().toLowerCase();
  });

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("userPlan");
    if (storedPlan) {
      setPlan(storedPlan.trim().toLowerCase());
    }
  }, []);

  // Restrict access based on plan

  console.log(plan);

  const handleSend = async (query) => {
    if (!query.trim()) {
      toast.error("Please enter a prompt before sending!");
      return;
    }

    setClicked(true);

    const newMessages = [...messages, { text: query, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await model.generateContent(query);
      const botReply = result.candidates[0].content.parts[0].text; // Corrected response parsing
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      toast.error("Failed to get a response. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const prompts = [
    "Suggest a high-protein diet",
    "What is the best diet for weight loss?",
    "Give me a 7-day vegetarian diet plan",
  ];

  return (
    <>
      {plan === "free" ? (
        <>
          {" "}
          <div className="restricted-access">
            <h2>Upgrade Required</h2>
            <p>
              The AI Health Assistant is only available for Standard and Gold
              members.
            </p>
            <a href="/membership" className="upgrade-button">
              Upgrade Plan
            </a>
          </div>
        </>
      ) : (
        <>
          {" "}
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
      )}
    </>
  );
};

export default DietPlan;
