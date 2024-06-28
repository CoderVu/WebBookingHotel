import React, { useState } from 'react';
import { resetPassword } from '../utils/ApiFunctions';
import { useHistory } from 'react-router-dom'; // Import useHistory
import '../styles/index.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); // Tạo instance của useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            setMessage('A link to reset your password has been sent to your email');
            history.push('/confirm-reset-password'); // Chuyển hướng sau khi gửi email thành công
        } catch (error) {
            setMessage('Failed to send reset password email. Please try again.');
        }
    };

    return (
        <div className="container reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ResetPassword;