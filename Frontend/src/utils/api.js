import axios from 'axios';
import React from 'react';

// Create axios instance with base URL
const api = axios.create({
baseURL: 'http://localhost:3000/api', // ⬅️ The fix is here: Added '/api'
 headers: {
  'Content-Type': 'application/json',
 },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
 (config) => {
 const token = localStorage.getItem('token');
 if (token) {
 config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
 },
 (error) => {
 return Promise.reject(error);
 }
);

export default api;