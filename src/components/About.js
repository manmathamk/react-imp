// About.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h2>About Page</h2>
            <nav>
                <Link to="team">Team</Link> |
                <Link to="company">Company</Link> |
                <Link to="dashboard">Dashboard</Link>
            </nav>

            <Outlet />
        </div>
    );
};

export default About;
