import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  users: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;



// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";

// // Thunk action
// export const fetchUsers = () => {
//   return async (dispatch) => {
//     const controller = new AbortController();

//     dispatch({ type: "FETCH_USERS_LOADING" });

//     try {
//       const res = await fetch("https://jsonplaceholder.typicode.com/users", {
//         signal: controller.signal,
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error: ${res.status}`);
//       }

//       const data = await res.json();
//       dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
//     } catch (error) {
//       if (error.name === "AbortError") {
//         console.log("Manually cancelled API call");
//       } else {
//         dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
//       }
//     }

//     // return abort function so caller can cancel
//     return () => controller.abort();
//   };
// };

// // Reducer
// const initial = {
//   loading: false,
//   data: [],
//   error: null,
// };

// export const userReducer = (state = initial, action) => {
//   switch (action.type) {
//     case "FETCH_USERS_LOADING":
//       return { ...state, loading: true, error: null };
//     case "FETCH_USERS_SUCCESS":
//       return { ...state, loading: false, data: action.payload };
//     case "FETCH_USERS_FAILURE":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// // Root reducer
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // Store
// export const store = createStore(rootReducer, applyMiddleware(thunk));
