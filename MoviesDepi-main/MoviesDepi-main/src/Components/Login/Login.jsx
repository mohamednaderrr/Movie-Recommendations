import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/netflix-svgrepo-com(2).svg";
import { data, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReelPath from "../../assets/Images/ReelPath.png";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const messagestate = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = signState === "Sign In" ? "/login" : "/signup";
      const payload = { email, password };
      if (signState === "Sign Up") payload.name = name;
      const response = await axios.post(
        `http://localhost:5005${endpoint}`,
        payload
      );
      console.log("Login response:", response.data);
      setMessage(response.data.message);
      setSignState("Sign In");
      if (signState === "Sign In" && response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message)
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error no connection with DB ";
      toast.error(errorMessage);
      // setMessage(errorMessage);
    }
  };

  return (
    <div className="login overflow-hidden">
      <ToastContainer />
      {/* <img src={logo} className='login-logo' alt='' /> */}
      <img src={ReelPath} alt="" className="login-logo" />

      <div className="login-form ">
        <h4>
          {messagestate && (
            <p className="text-danger fw-bold  border border-danger p-2 rounded-3">
              {messagestate}
            </p>
          )}
        </h4>
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">{signState}</button>
          {message && (
            <p className="error-message text-danger fw-bold">{message}</p>
          )}
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help ?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to ReelPath?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already Have an Account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
