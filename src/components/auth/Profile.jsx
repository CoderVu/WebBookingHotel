import React, { useEffect, useState } from "react";
import { deleteUser, getUserBookingsByEmail ,getUser } from "../utils/ApiFunctions";
import { useHistory } from "react-router-dom";
import moment from "moment";
import EditProfileForm from "./EditProfileForm";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [editing, setEditing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("token");

                // Fetch user data
                const userData = await getUser(userId, token);
                setUser(userData);

                // Fetch bookings by email
                const email = userData.email;
                if (email) {
                    const bookingData = await getUserBookingsByEmail(email);
                    setBookings(bookingData);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setErrorMessage("Error fetching data: " + error.message);
            }
        };

        fetchData();
    }, []);


    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (confirmed) {
            try {
                const userId = localStorage.getItem("userId");
                await deleteUser(userId);

                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userRole");

                history.push("/", { state: { message: "Your account has been deleted." } });
                window.location.reload();
            } catch (error) {
                console.error("Error deleting account:", error.message);
                setErrorMessage("Error deleting account: " + error.message);
            }
        }
    };

    const handleEditProfile = () => {
        setEditing(true);
    };

    return (
        <div className="container">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-danger">{message}</p>}
            {user ? (
                <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                    <h4 className="card-title text-center">User Information</h4>
                    <div className="card-body">
                        <div className="col-md-10 mx-auto">
                            <div className="card mb-3 shadow">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-flex justify-content-center align-items-center mb-4">
                                            <img
                                                src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                                alt="Profile"
                                                className="rounded-circle"
                                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-10">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">ID:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.id}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">First Name:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.firstName}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Last Name:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.lastName}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Email:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.email}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Roles:</label>
                                                <div className="col-md-10">
                                                    <ul className="list-unstyled">
                                                        {user.roles.map((role) => (
                                                            <li key={role.id} className="card-text">
                                                                {role.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            {!editing ? (
                                                <>
                                                    <hr />
                                                    <div className="d-flex justify-content-end">
                                                        <button className="btn btn-primary btn-sm" onClick={handleEditProfile}>
                                                            Edit Profile
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <EditProfileForm user={user} setUser={setUser} setEditing={setEditing} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}

            <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                <h4 className="card-title text-center">Booking History</h4>
                <div className="card-body">
                    {bookings.length > 0 ? (
                        <table className="table table-bordered table-hover shadow">
                            <thead>
                                <tr>
                                    <th scope="col">Booking ID</th>
                                    <th scope="col">Room ID</th>
                                    <th scope="col">Room Type</th>
                                    <th scope="col">Check In Date</th>
                                    <th scope="col">Check Out Date</th>
                                    <th scope="col">Confirmation Code</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index}>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.room ? booking.room.id : ""}</td>
                                        <td>{booking.room ? booking.room.roomType : ""}</td>
                                        <td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
                                        <td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
                                        <td>{booking.bookingConfirmationCode}</td>
                                        <td className="text-success">On-going</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>You have not made any bookings yet.</p>
                    )}
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                    Close account
                </button>
            </div>
        </div>
    );
};

export default Profile;
