import React, { useState } from "react";
import { registerUser } from "../api/index.js";

function Signup({ onSwitch, onSuccess }) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState({ username: false, email: false, password: false });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      setMessage(data.message);
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const inputStyle = {
    background: "#292929",
    color: "#FFD600",
    border: "1px solid #555",
    borderRadius: "8px",
    padding: "14px 16px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    width: "100%",
    boxSizing: "border-box",
  };

  const inputFocusStyle = {
    borderColor: "#FFD600",
    boxShadow: "0 0 8px #FFD600",
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        borderRadius: "16px",
        boxShadow: "0 10px 36px rgba(0,0,0, 0.5)",
        padding: "32px 28px",
        maxWidth: "400px",
        width: "90%",
        margin: "auto",
        color: "#f0f0f0",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#FFD600",
          fontWeight: 700,
          marginBottom: "24px",
          fontSize: "2rem",
          letterSpacing: "2px",
        }}
      >
        Sign Up for Imagina
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          onFocus={() => setFocus({ ...focus, username: true })}
          onBlur={() => setFocus({ ...focus, username: false })}
          style={{ ...inputStyle, ...(focus.username ? inputFocusStyle : {}) }}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          onFocus={() => setFocus({ ...focus, email: true })}
          onBlur={() => setFocus({ ...focus, email: false })}
          style={{ ...inputStyle, ...(focus.email ? inputFocusStyle : {}) }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          onFocus={() => setFocus({ ...focus, password: true })}
          onBlur={() => setFocus({ ...focus, password: false })}
          style={{ ...inputStyle, ...(focus.password ? inputFocusStyle : {}) }}
        />
        <button
          type="submit"
          style={{
            marginTop: "8px",
            padding: "14px 16px",
            background: "linear-gradient(90deg, #FFD600 40%, #FFC400 100%)",
            color: "#232526",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(67,234,117,0.10)",
            transition: "background 0.3s, box-shadow 0.3s",
            width: "100%",
          }}
           onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(90deg, #ffc107 40%, #eca800 100%)";
            e.target.style.boxShadow = "0 4px 15px rgba(255, 193, 7, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(90deg, #FFD600 40%, #FFC400 100%)";
            e.target.style.boxShadow = "0 2px 12px rgba(255, 214, 0, 0.1)";
          }}
        >
          Register
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: message === "User registered successfully" ? "#00E676" : "#FF1744",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          {message}
        </p>
      )}
      <p
        style={{
          marginTop: "24px",
          textAlign: "center",
          color: "#90caf9",
          cursor: "pointer",
          fontWeight: "bold",
          userSelect: "none",
          transition: "color 0.3s",
        }}
        onClick={onSwitch}
        onMouseEnter={(e) => (e.target.style.color = "#FFD600")}
        onMouseLeave={(e) => (e.target.style.color = "#90caf9")}
      >
        Already have an account? <span style={{ textDecoration: "underline" }}>Log In</span>
      </p>
    </div>
  );
}

export default Signup;
