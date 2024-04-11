import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);

    const handleShowAccountClick = () => {
        setShowAccount(!showAccount);
    };

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
            <div className='container-fluid'> {/* Corrected the class name 'continaer-fluid' to 'container-fluid' */}
                <NavLink to='/' className='navbar-brand'> {/* Changed Link to NavLink */}
                    <span className='hotel-color'>Khach San ABC</span>
                </NavLink>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarScroll">
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' aria-current="page" to="/browse-all-room">
                                Browse all rooms
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' aria-current="page" to="/admin">
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/find-booking">
                                Find My booking
                            </NavLink>
                        </li>
                        <li className='nav-item dropdown'>
                            <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleShowAccountClick}>
                                Account
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                <li>
                                    <NavLink className='dropdown-item' to="/login">Login</NavLink> {/* Changed Link to NavLink */}
                                </li>
                                <li>
                                    <NavLink className='dropdown-item' to="/profile">Profile</NavLink> {/* Changed Link to NavLink */}
                                </li>
                                <li>
                                    <hr className='dropdown-divider'></hr> {/* Changed 'to' attribute to 'className' */}
                                </li>
                                <li>
                                    <NavLink className='dropdown-item' to="/logout">Logout</NavLink> {/* Changed Link to NavLink */}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
