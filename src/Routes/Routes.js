import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Outlet, useSearchParams, Link } from "react-router-dom";

// Lazy-loaded component
const LazyAbout = lazy(() => import("./About"));

// Components
// import Home from "./Home";
// import NotFound from "./NotFound";
// import DashboardLayout from "./DashboardLayout";
// import Overview from "./Overview";
// import Profile from "./Profile";
// import Settings from "./Settings";
// import Login from "./Login";
// import UserProfile from "./UserProfile";
// import RequireAuth from "./RequireAuth";
// import Search from "./Search";




// Memory Router (for testing)
// import { MemoryRouter } from "react-router-dom";


function RoutesMain() {
    const isLoggedIn = true; // mock authentication check
    const { userId } = useParams(); //extract route parameters from the current URL. /user/:userId
    const [searchParams] = useSearchParams(); //This retrieves the query parameters from the URL /search?q=react


    return (<>
        {/* create navigation links within your React app */}
        <Link to="">Overview</Link> | <Link to="settings">Settings</Link>

        {/* This is part of a protected route. */}
        {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* 1. Basic Routing */}
                    {/* <Route path="/" element={<Home />} /> */}

                    {/* 2. Lazy Loaded Route */}
                    {/* <Route path="/about" element={<LazyAbout />} /> */}

                    {/* 3. Dynamic Routing with Params */}
                    {/* <Route path="/user/:userId" element={<UserProfile />} /> */}

                    {/* 4. Protected Routing with wrapper component */}
                    
                    

                    {/* 5. Dashboard with Nested Routes */}
                    {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
                    {/* 6. Index Route (Default child) */}
                    {/* <Route index element={<Overview />} /> */}

                    {/* 7. Nested Routes */}
                    {/* <Route path="settings" element={<Settings />} /> */}
                    {/* </Route> */}

                    {/* 8. Redirect / Navigate */}
                    {/* <Route path="/old-home" element={<Navigate to="/" />} /> */}

                    {/* 9. Search Params Routing */}
                    {/* <Route path="/search" element={<Search />} /> */}

                    {/* 10. 404 / Catch-all */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Suspense>
        </Router>
    </>);
}

export default RoutesMain;
