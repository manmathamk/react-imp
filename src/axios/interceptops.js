// 1. .env File
// REACT_APP_BASE_URL=https://api.example.com

// axiosInstance.js
import axios from 'axios';
import store from '../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useSelector from 'react-redux'



const BASE_URL = process.env.REACT_APP_BASE_URL;
let requestCount = 0;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (requestCount === 0) store.dispatch(showLoader());
        requestCount++;

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        requestCount--;
        if (requestCount === 0) store.dispatch(hideLoader());
        return response;
    },
    (error) => {
        requestCount--;
        if (requestCount === 0) store.dispatch(hideLoader());

        if (error.response?.status === 401) {
            window.location.href = '/login';
        }

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
