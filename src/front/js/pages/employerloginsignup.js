import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import ForgotPasswordEmployer from "./forgotPasswordemployer";
export const EmployerLoginSignup = () => {
  const [loginEmailValue, setloginEmailValue] = useState("");
  const [loginPasswordValue, setloginPasswordValue] = useState("");
  const [signupEmailValue, setsignupEmailValue] = useState("");
  const [signupPasswordValue, setsignupPasswordValue] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");
  return (
    <div className="login">
      <form>
        <div className="mb-3">
          <h1>Log In</h1>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={loginEmailValue}
            onChange={(e) => {
              setloginEmailValue(e.target.value);
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={loginPasswordValue}
            onChange={(e) => {
              setloginPasswordValue(e.target.value);
            }}
          />
        </div>
        <div onClick={() => setShowForgotPassword(true)}>Forgot Password?</div>
        {showForgotPassword && (
          <ForgotPasswordEmployer
            onClose={() => setShowForgotPassword(false)}
          />
        )}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            actions.employerlogin(loginEmailValue, loginPasswordValue);
            navigate("/employerhome");
          }}
        >
          Log In
        </button>
      </form>
      <form>
        <div className="mb-3">
          <h1>Sign Up</h1>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={signupEmailValue}
            onChange={(e) => {
              setsignupEmailValue(e.target.value);
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={signupPasswordValue}
            onChange={(e) => {
              setsignupPasswordValue(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            actions.employersignup(signupEmailValue, signupPasswordValue);
            navigate("/employerhome");
          }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};
