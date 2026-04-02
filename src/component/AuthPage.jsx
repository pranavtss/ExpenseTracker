import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const endpoint = mode === "login" ? "auth/login" : "auth/register";
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      if (mode === "register") {
        setMessage("Account created. Please log in.");
        setMode("login");
        setPassword("");
        return;
      }

      localStorage.setItem("expenseTrackerUser", JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (error) {
      setMessage("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="expense-container auth-page">
      <h1>{mode === "login" ? "Login" : "Create Account"}</h1>
      <p className="auth-subtitle">Use a unique username and your password.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-input"
            required
          />
        </div>
        {message ? <p className="auth-message">{message}</p> : null}
        <button type="submit" className="add-amount-btn" disabled={isLoading}>
          {isLoading ? "Please wait..." : mode === "login" ? "Login" : "Create User"}
        </button>
      </form>
      <button
        type="button"
        className="auth-switch-btn"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setMessage("");
        }}
      >
        {mode === "login" ? "New user? Create account" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default AuthPage;
