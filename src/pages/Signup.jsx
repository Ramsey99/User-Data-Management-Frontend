import React, { useState } from "react";
import { signup } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
  });

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await signup(formData);
      setAlertType("success");
      setMessage(response.message || "Signup successful!");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      setAlertType("danger");
      setMessage(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4 text-primary">Sign Up</h3>

        {message && (
          <div className={`alert alert-${alertType}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              name="pass"
              className="form-control"
              placeholder="Enter password"
              value={formData.pass}
              onChange={handleChange}
              required
            />
            <small className="form-text text-muted">
              Password must include uppercase, lowercase, number, and special
              character.
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
