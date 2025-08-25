// Home.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AboutPage = React.lazy(() => import('./About'));
const DashboardPage = React.lazy(() => import('./Dashboard'));
const CompanyPage = React.lazy(() => import('./Company'));
const TeamPage = React.lazy(() => import('./Team'));

const Home = () => {
    return (
        <h1>home</h1>
    );
};

export default Home;
