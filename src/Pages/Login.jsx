import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = form.email.trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (isSignup) {
      if (form.name.trim().length < 2) {
        setError("Please enter your name");
        return;
      }

      if (users.some((u) => u.email === email)) {
        setError("This email is already registered");
        return;
      }

      const newUser = { name: form.name.trim(), email, password: form.password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      onLogin({ name: newUser.name, email });
    } else {
      const found = users.find(
        (u) => u.email === email && u.password === form.password
      );

      if (!found) {
        setError("Wrong email or password");
        return;
      }

      onLogin({ name: found.name, email });
    }

    navigate("/");
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
        )}

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <span onClick={() => { setIsSignup(!isSignup); setError(""); }}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;