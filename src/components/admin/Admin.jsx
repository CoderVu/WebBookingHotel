import React from "react";
import { Link } from "react-router-dom";
import { FaHotel, FaBook } from "react-icons/fa";
import "../styles/index.css";

const Admin = () => {
    return (
        <section className="admin-container">
            <h2>Welcome to Admin Page</h2>
            <hr/>
            <div className="admin-links">
                <Link to="/existing-rooms" className="admin-link">
                    <FaHotel className="admin-icon" />
                    Manage Rooms
                </Link>
                <Link to="/existing-bookings" className="admin-link">
                    <FaBook className="admin-icon" />
                    Manage Bookings
                </Link>
            </div>
        </section>
    )
}

export default Admin;
