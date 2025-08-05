// 1. .env File
// REACT_APP_BASE_URL=https://api.example.com

// axiosInstance.js
import axios from 'axios';
import store from '../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useSelector from 'react-redux'



// Base URL from .env
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Track how many requests are in progress
let requestCount = 0;

// Max number of retries for failed requests
const MAX_RETRY = 3;

// Create the custom Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
});

// ======================================
// ✅ REQUEST INTERCEPTOR
// ======================================
axiosInstance.interceptors.request.use(
    (config) => {
        // 🔄 Start loader when the first request starts
        if (requestCount === 0) store.dispatch(showLoader());
        requestCount++;

        // 🔐 Attach Bearer token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 🕓 Add a request timestamp (optional but useful for debugging or caching)
        config.headers['X-Request-Timestamp'] = new Date().toISOString();

        // 🆔 Add a unique request ID (for tracing in logs)
        config.headers['X-Request-ID'] = crypto.randomUUID?.() || Math.random().toString(36).slice(2);

        return config;
    },
    (error) => {
        // 🚫 Request failed before sending (network/config error)
        return Promise.reject(error);
    }
);

// ======================================
// ✅ RESPONSE INTERCEPTOR
// ======================================
axiosInstance.interceptors.response.use(
    (response) => {
        // ✅ Decrement request count and hide loader if no more requests
        requestCount--;
        if (requestCount === 0) store.dispatch(hideLoader());

        return response;
    },
    async (error) => {
        requestCount--;
        if (requestCount === 0) store.dispatch(hideLoader());

        const { config, response } = error;

        // 🌐 Network error (no response from server)
        if (!response) {
            alert('Network error! Please check your internet connection.');
            return Promise.reject(error);
        }

        // 🔐 Unauthorized — Redirect to login
        if (response.status === 401) {
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // 🔁 Retry logic for server errors (5xx) on GET requests
        if (
            config &&
            response.status >= 500 &&
            config.method === 'get'
        ) {
            // Track retries
            config._retryCount = config._retryCount || 0;

            if (config._retryCount < MAX_RETRY) {
                config._retryCount++;
                return axiosInstance(config); // Retry the request
            }
        }

        // ❌ For other errors, return as-is
        return Promise.reject(error);
    }
);

// export default axiosInstance;

// store/userSlice.js
// import axiosInstance from '../api/axiosInstance';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/users');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Fetch failed');
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// export default userSlice.reducer;




// src/store/loaderSlice.js
// import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: { loading: false },
    reducers: {
        showLoader: (state) => { state.loading = true; },
        hideLoader: (state) => { state.loading = false; },
    }
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;


// src/components/Loader.js
// const loading = useSelector((state) => state.loader.loading);
