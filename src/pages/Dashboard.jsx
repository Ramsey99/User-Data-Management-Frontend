import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUsers(Array.isArray(data.user) ? data.user : [data.user]);
        console.log(data.user);
      } catch (err) {
        alert(err.message || "Failed to fetch user profiles");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">User Dashboard</h3>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Fetching user profiles...</p>
        </div>
      ) : (
        <>
          <div className="alert alert-success text-center">
            Welcome, {users[0]?.firstName || "User"}!
          </div>

          {users.length === 0 ? (
            <div className="alert alert-warning text-center">
              No users found.
            </div>
          ) : (
            <div className="row">
              {users.map((user) => (
                <div className="col-md-6 mb-3" key={user._id || user.email}>
                  <div className="card shadow-sm">
                    <div className="card-body text-center">
                      <h5 className="card-title">
                        {user.firstName} {user.lastName}
                      </h5>
                      <p className="card-text">{user.email}</p>
                      <small className="text-muted">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
