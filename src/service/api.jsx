import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',   
});

// Auth
export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);

// Posts
export const createPost = (formData, token) =>
  API.post('/posts/create', formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',    // For image upload!
    },
  });

export const getPosts = () => API.get('/posts');    // public posts (homepage)

export const getUserPosts = (token) =>
  API.get('/posts/myposts', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deletePost = (id, token) =>
  API.delete(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updatePost = (id, data, token) =>
  API.put(`/posts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Admin - Get All Users
export const getAllUsers = (token) =>
  API.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });

 export const getPostById = (id, token) => {
  return API.get(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};