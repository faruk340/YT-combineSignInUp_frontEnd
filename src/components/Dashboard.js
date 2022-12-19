import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Outlet, NavLink } from "react-router-dom";
import '../css/navbar.css'
const Dashboard = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact="true" to="/" className="nav-logo">
                        NodejsApi
                        <i className="fas fa-code"></i>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/blog"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Blog
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact="true"
                                to="/contact"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                        <Button color='primary' style={{ color: "#fff", fontWeight: "bold", textTransform: "capitalize" }}>Logout</Button>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default Dashboard