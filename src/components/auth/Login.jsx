import React, { useState } from "react";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const history = useHistory();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await loginUser(login);

      if (success) {
        const token = success.token;
        auth.handleLogin(token);
        history.push(redirectUrl, { replace: true });
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
        setTimeout(() => {
          setErrorMessage("");
        }, 4000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again later.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={login.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={login.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary" style={{ marginRight: "10px" }}>
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't have an account yet? <Link to={"/register"}>Register</Link>
          </span>
          <span style={{ marginLeft: "10px" }}>
            Forgot your password? <Link to={"/reset-password"}>Reset password</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
