import React, { useState } from "react";
import { signin } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await signin(formData);

      if (res?.token) {
        localStorage.setItem("token", res.token);
        setAlertType("success");
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        throw new Error(res?.message || "Signin failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setAlertType("danger");
      setMessage(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Sign In</h3>

        {message && (
          <div className={`alert alert-${alertType} text-center`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              name="pass"
              className="form-control"
              placeholder="Enter your password"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-3 text-center">
            Don’t have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
