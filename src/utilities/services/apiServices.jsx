import axios from "axios";
import { handleApiError } from "../helpers/errorHandler";

// Create a custom axios instance with custom configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Will set url depending on run command
  timeout: 10000, // 10 seconds timeout for requests to prevent hanging
  headers: { "Content-Type": "application/json" }, // Defaults headers to JSON format
});

/*
{ This is the full axios response object
  data: { ... }, <- The actual backend response data from our API
  status: 201,
  statusText: 'Created',
  headers: { ... },
  config: { ... },
  request: { ... }
}
*/

// Setup interceptors (like middleware) for requests and responses to handle auth token automatically

// Request interceptor adds JWT token from localStorage to header if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// NOTE: this shouldn't remove tokens, that happens from the modal (accessible from any page) 401 stuff is fine,
// but need to double check all 401 errors relate to only invalid tokens, not any other token
// errors. Left in for now but needs removal/refactoring.
// Response interceptor for removing JWT token on logout
api.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes("/auth/logout")) {
      localStorage.removeItem("authToken");
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

// ------------------------------------------------------------------------------------------------
// AUTH ROUTES

// Register a new user
export const registerUser = async (userBodyData) => {
  try {
    // Post takes route suffix as first arg and body data as second arg
    const res = await api.post("/auth/register", userBodyData);
    // Automatically parses JSON response. 'Data' contains the actual response body from backend
    return res.data;
    // Catch error, log it and re-throw for further handling
  } catch (err) {
    console.error(`Error registering user: ${err}`);
    throw handleApiError(err);
  }
};

// Login an existing user
export const loginUser = async (userBodyData) => {
  try {
    const res = await api.post("/auth/login", userBodyData);
    return res.data;
  } catch (err) {
    console.error(`Error logging in user: ${err}`);
    throw handleApiError(err);
  }
};

// Logout current user
export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (err) {
    // Shouldn't fail since no controller logic for logout route, but just in case
    console.error(`Error logging out user: ${err}`);
    throw handleApiError(err);
  }
};

// ------------------------------------------------------------------------------------------------
// USER ROUTES

// Get all users
export const getAllUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    console.error(`Error fetching users: ${err}`);
    throw handleApiError(err);
  }
};

// Get current logged-in user details
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/users/my-profile");
    return res.data;
  } catch (err) {
    console.error(`Error fetching current user: ${err}`);
    throw handleApiError(err);
  }
};

// Update current logged-in user details
export const updateCurrentUser = async (updateBodyData) => {
  try {
    const res = await api.put("/users/my-profile", updateBodyData);
    return res.data;
  } catch (err) {
    console.error(`Error updating current user: ${err}`);
    throw handleApiError(err);
  }
};

// Update current logged-in user password
export const updateCurrentUserPassword = async (passwordBodyData) => {
  try {
    const res = await api.put("/users/my-profile/update-password", passwordBodyData);
    return res.data;
  } catch (err) {
    console.error(`Error updating current user password: ${err}`);
    throw handleApiError(err);
  }
};

// Delete current logged-in user
export const deleteCurrentUser = async () => {
  try {
    const res = await api.delete("/users/my-profile");
    return res.data;
  } catch (err) {
    console.error(`Error deleting current user: ${err}`);
    throw handleApiError(err);
  }
};

// ------------------------------------------------------------------------------------------------
// FRIENDSHIP ROUTES

// Get all friendship documents for logged-in user
export const getAllFriendships = async () => {
  try {
    const res = await api.get("/friendships/my-friends");
    return res.data;
  } catch (err) {
    console.error(`Error fetching friendships: ${err}`);
    throw handleApiError(err);
  }
};

// Create new pending friendship document (send friend request)
export const createFriendship = async (recipientUserId) => {
  try {
    const res = await api.post(`/friendships/${encodeURIComponent(recipientUserId)}`);
    return res.data;
  } catch (err) {
    console.error(`Error creating friendship: ${err}`);
    throw handleApiError(err);
  }
};

// Update existing pending friendship document (accept friend request)
export const updateFriendship = async (requesterUserId) => {
  try {
    const res = await api.put(`/friendships/my-friends/${encodeURIComponent(requesterUserId)}`);
    return res.data;
  } catch (err) {
    console.error(`Error updating friendship: ${err}`);
    throw handleApiError(err);
  }
};

// Delete existing friendship document (unfriend or reject friend request)
export const deleteFriendship = async (otherUserId) => {
  try {
    const res = await api.delete(`/friendships/my-friends/${encodeURIComponent(otherUserId)}`);
    return res.data;
  } catch (err) {
    console.error(`Error deleting friendship: ${err}`);
    throw handleApiError(err);
  }
};

// ------------------------------------------------------------------------------------------------
// MOVIES ROUTES

// Get all reel-canon movies
export const getAllMovies = async () => {
  try {
    const res = await api.get("/movies/reel-canon");
    return res.data;
  } catch (err) {
    console.error(`Error fetching movies: ${err}`);
    throw handleApiError(err);
  }
};

// Get a single movie by title query
export const getMovieByTitle = async (title) => {
  try {
    /* Axios params (second argument) safely handles URL encoding. Is equivalent to using
    `/movies/search?title=${encodeURIComponent(title)}` */
    const res = await api.get(`/movies/search`, { params: { title } });
    return res.data;
  } catch (err) {
    console.error(`Error fetching movie by title: ${err}`);
    throw handleApiError(err);
  }
};

// Get a single movie by IMDB ID
export const getMovieByImdbId = async (imdbId) => {
  try {
    const res = await api.get(`/movies/${encodeURIComponent(imdbId)}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching movie by IMDB ID: ${err}`);
    throw handleApiError(err);
  }
};

// ------------------------------------------------------------------------------------------------
// REEL-PROGRESS ROUTES

// Get reel-progress array for logged in user
export const getUserReelProgress = async () => {
  try {
    const res = await api.get("/reel-progress");
    return res.data;
  } catch (err) {
    console.error(`Error fetching user reel-progress: ${err}`);
    throw handleApiError(err);
  }
};

// Update reel-progress by adding a new movie to reel-progress array
export const addMovieToReelProgress = async (movieBodyData) => {
  try {
    const res = await api.post("/reel-progress", movieBodyData);
    return res.data;
  } catch (err) {
    console.error(`Error adding movie to user reel-progress: ${err}`);
    throw handleApiError(err);
  }
};

// Update rating of movie in reel-progress array for logged in user
export const updateReelProgressMovieRating = async ({ movieId, rating }) => {
  try {
    const res = await api.patch(`/reel-progress/${encodeURIComponent(movieId)}`, { rating });
    return res.data;
  } catch (err) {
    console.error(`Error updating movie rating in user reel-progress: ${err}`);
    throw handleApiError(err);
  }
};

// Delete movie from reel-progress array for logged in user
export const deleteMovieFromReelProgress = async ({ movieId }) => {
  try {
    const res = await api.delete(`/reel-progress/${encodeURIComponent(movieId)}`);
    return res.data;
  } catch (err) {
    console.error(`Error deleting movie from user reel-progress: ${err}`);
    throw handleApiError(err);
  }
};

// ------------------------------------------------------------------------------------------------
// LEADERBOARD ROUTE

// Get leaderboard data for all users
export const getLeaderboard = async () => {
  try {
    const res = await api.get("/leaderboard");
    return res.data;
  } catch (err) {
    console.error(`Error fetching leaderboard data: ${err}`);
    throw handleApiError(err);
  }
};
