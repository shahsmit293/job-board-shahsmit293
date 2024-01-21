import React, { useContext, useState } from "react";
import "../../../styles/loginsignup.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import ForgotPasswordEmployer from "./forgotPasswordemployer";
export const EmployerLoginSignup = () => {
  const [loginEmailValue, setloginEmailValue] = useState("");
  const [loginPasswordValue, setloginPasswordValue] = useState("");
  const [signupEmailValue, setsignupEmailValue] = useState("");
  const [signupPasswordValue, setsignupPasswordValue] = useState("");
  const [signupRetypePasswordValue, setsignupRetypePasswordValue] =
    useState("");
  const [matchpassword, setmatchpassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");
  return (
    <div className="register-form">
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
              onFocus={() => {
                if (store.error_message_login === "Email is not correct!") {
                  store.error_message_login = "";
                }
              }}
            />
            {store.error_message_login === "Email is not correct!" && (
              <div style={{ color: "red" }}>Email is not correct!</div>
            )}
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
              onFocus={() => {
                if (store.error_message_login === "Password is not correct!") {
                  store.error_message_login = "";
                }
              }}
            />
            {store.error_message_login === "Password is not correct!" && (
              <div style={{ color: "red" }}>Password is not correct!</div>
            )}
          </div>
          <div onClick={() => setShowForgotPassword(true)}>
            Forgot Password?
          </div>
          {showForgotPassword && (
            <ForgotPasswordEmployer
              onClose={() => setShowForgotPassword(false)}
            />
          )}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={async (event) => {
              event.preventDefault();
              const data = await actions.employerlogin(
                loginEmailValue,
                loginPasswordValue
              );
              if (!store.error_message_login) {
                navigate("/employerhome");
              }
            }}
          >
            Log In
          </button>
        </form>
      </div>
      <div className="signup">
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
              onFocus={() => {
                if (
                  store.error_message_signup ===
                  "Email already exists. Please use a different email."
                ) {
                  store.error_message_signup = "";
                }
              }}
            />
            {store.error_message_signup ===
              "Email already exists. Please use a different email." && (
              <div style={{ color: "red" }}>
                Email already exists. Please use a different email
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
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
          <div className="mb-3">
            <label className="form-label">Retype Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              value={signupRetypePasswordValue}
              onChange={(e) => {
                setsignupRetypePasswordValue(e.target.value);
              }}
              onFocus={() => setmatchpassword("")}
            />
            <div style={{ color: "red" }}>{matchpassword}</div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={async (event) => {
              event.preventDefault();
              if (signupPasswordValue !== signupRetypePasswordValue) {
                setmatchpassword("password not matching");
              } else {
                setmatchpassword("");
                const data = await actions.employersignup(
                  signupEmailValue,
                  signupPasswordValue
                );
                if (!store.error_message_signup) navigate("/employerhome");
              }
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
