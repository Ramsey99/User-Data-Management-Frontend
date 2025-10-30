import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server.");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const signup = async (userData) => {
  try {
    const res = await api.post("/signup", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const signin = async (credentials) => {
  try {
    const res = await api.post("/signin", credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Signin failed" };
  }
};

export const getUserProfile = async () => {
  try {
    const res = await api.get("/profile");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

export default api;
