// Home.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AboutPage = React.lazy(() => import('./About'));
const DashboardPage = React.lazy(() => import('./Dashboard'));
const CompanyPage = React.lazy(() => import('./Company'));
const TeamPage = React.lazy(() => import('./Team'));

const Home = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/about" element={<AboutPage />}>
                        <Route path="team" element={<TeamPage />} />
                        <Route path="company" element={<CompanyPage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default Home;
