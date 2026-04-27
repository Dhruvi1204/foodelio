import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    setMessages(prev => [...prev, { text: msg, sender: "user" }]);
    setLoading(true);

    try {
      const res = await fetch("https://foodelio.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { text: data.reply, sender: "bot" },
        ...(data.items
          ? [
            {
              sender: "bot",
              items: data.items
            }
          ]
          : [])
      ]);

    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Server error 😔", sender: "bot" }
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="chatbot-container">

      {/* Button */}
      <div className="chatbot-button" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chatbot-box">

          {/* Header */}
          <div className="chatbot-header">
            Foodelio Assistant
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.sender}`}>

                {/* TEXT */}
                {msg.text && msg.text.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}

                {/* ✅ SIMPLE LIST INSTEAD OF CARDS */}
                {msg.items && (
                  <div style={{ marginTop: "6px" }}>
                    {msg.items.map((item, idx) => (
                      <div key={idx}>
                        • {item.name} — ₹{item.price}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}

            {/* Typing */}
            {loading && (
              <div className="chatbot-message bot typing">
                <span></span><span></span><span></span>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Suggestions */}
          <div className="quick-suggestions">
            <span onClick={() => sendMessage("pizza")}>🍕 Pizza</span>
            <span onClick={() => sendMessage("veg food")}>🥗 Veg</span>
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search food..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>
              {loading ? "..." : "Send"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Chatbot;