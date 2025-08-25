// 1. .env File
// REACT_APP_BASE_URL=https://api.example.com

// axiosInstance.js
import axios from 'axios';
import store from '../store';
import { showLoader, hideLoader } from '../store/loaderSlice';

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

    // 🕓 Add a request timestamp
    config.headers['X-Request-Timestamp'] = new Date().toISOString();

    // 🆔 Add a unique request ID
    config.headers['X-Request-ID'] =
      crypto.randomUUID?.() || Math.random().toString(36).slice(2);

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================================
// ✅ RESPONSE INTERCEPTOR
// ======================================
axiosInstance.interceptors.response.use(
  (response) => {
    requestCount--;
    if (requestCount === 0) store.dispatch(hideLoader());
    return response;
  },
  async (error) => {
    requestCount--;
    if (requestCount === 0) store.dispatch(hideLoader());

    const { config, response } = error;

    // 🌐 Network error
    if (!response) {
      alert('Network error! Please check your internet connection.');
      return Promise.reject(error);
    }

    // 🔐 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 🔁 Retry GET requests on server errors
    if (config && response.status >= 500 && config.method === 'get') {
      config._retryCount = config._retryCount || 0;
      if (config._retryCount < MAX_RETRY) {
        config._retryCount++;
        return axiosInstance(config);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// --------------------------------------------------------------------------------------
// src/store/userSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../api/axiosInstance';

// // Thunk to fetch users
// export const fetchUsers = createAsyncThunk(
//   'users/fetchUsers',
//   async (_, { rejectWithValue, signal }) => {
//     try {
//       // Support for cancellation
//       const controller = new AbortController();
//       signal.addEventListener('abort', () => controller.abort());

//       const res = await axiosInstance.get('/users', { signal: controller.signal });
//       return res.data;
//     } catch (err) {
//       if (err.name === 'CanceledError') {
//         return rejectWithValue('Request canceled');
//       }
//       return rejectWithValue(err.response?.data || 'Fetch failed');
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'users',
//   initialState: {
//     list: [],
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.list = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });
// export default userSlice.reducer;

// --------------------------------------------------------------------------------------------

// src/store/loaderSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const loaderSlice = createSlice({
//   name: 'loader',
//   initialState: { loading: false },
//   reducers: {
//     showLoader: (state) => {
//       state.loading = true;
//     },
//     hideLoader: (state) => {
//       state.loading = false;
//     },
//   },
// });

// export const { showLoader, hideLoader } = loaderSlice.actions;
// export default loaderSlice.reducer;

// -------------------------------------------------------------------------------------

// src/store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import loaderReducer from './loaderSlice';

// const store = configureStore({
//   reducer: {
//     users: userReducer,
//     loader: loaderReducer,
//   },
// });

// export default store;

// ------------------------------------------------------------------------

// src/components/Loader.js
// import React from 'react';
// import { useSelector } from 'react-redux';

// const Loader = () => {
//   const loading = useSelector((state) => state.loader.loading);

//   if (!loading) return null;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0, left: 0, right: 0, bottom: 0,
//       background: 'rgba(0,0,0,0.5)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       color: 'white',
//       fontSize: '24px',
//       zIndex: 1000
//     }}>
//       Loading...
//     </div>
//   );
// };

// export default Loader;

// --------------------------------------------------------------------

// src/App.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from './store/userSlice';
// import Loader from './components/Loader';

// const App = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.users.list);
//   const error = useSelector((state) => state.users.error);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   return (
//     <div>
//       <Loader />
//       <h1>Users</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {users.map((u) => (
//           <li key={u.id}>{u.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default App;

// -------------------------------------------------------------------------
// src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
