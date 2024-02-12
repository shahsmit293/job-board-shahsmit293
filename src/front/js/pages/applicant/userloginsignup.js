import React, { useContext, useState } from "react";
import "../../../styles/loginsignup.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./forgotPassword";
export const UserLoginSignup = () => {
  const [showsignup, setsignup] = useState(true);
  const [loginEmailValue, setloginEmailValue] = useState("");
  const [loginPasswordValue, setloginPasswordValue] = useState("");
  const [signupEmailValue, setsignupEmailValue] = useState("");
  const [signupPasswordValue, setsignupPasswordValue] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [signupRetypePasswordValue, setsignupRetypePasswordValue] =
    useState("");
  const [matchpassword, setmatchpassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");
  return (
    <div className="account">
      <div className="account-right"></div>
      <div className="account-left">
        {showsignup ? (
          <div className="jobseeker-login">
            <div className="selectloginsignup">
              <button onClick={() => setsignup(true)}>Log In</button>
              <button onClick={() => setsignup(false)}>Sign Up</button>
            </div>
            <div className="form">
              <h1>Job Seeker Log In</h1>
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
                  if (
                    store.error_message_login === "Password is not correct!"
                  ) {
                    store.error_message_login = "";
                  }
                }}
              />
              {store.error_message_login === "Password is not correct!" && (
                <div style={{ color: "red" }}>Password is not correct!</div>
              )}

              <p
                className="forgotpassword"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </p>
              {showForgotPassword && (
                <ForgotPassword onClose={() => setShowForgotPassword(false)} />
              )}

              <button
                onClick={async (event) => {
                  event.preventDefault();
                  const data = await actions.jobseekerlogin(
                    loginEmailValue,
                    loginPasswordValue
                  );
                  if (!store.error_message_login) {
                    navigate("/");
                  } else {
                    console.log(store.error_message_login);
                  }
                }}
              >
                Log In
              </button>
              <div className="changetosignup">
                <h6>Don't have an account?</h6>
                {"    "}{" "}
                <h6
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setsignup(false)}
                >
                  Sign Up
                </h6>
              </div>
            </div>
          </div>
        ) : (
          <div className="jobseeker-signup">
            <div className="selectloginsignup">
              <button onClick={() => setsignup(true)}>Log In</button>
              <button onClick={() => setsignup(false)}>Sign Up</button>
            </div>
            <div className="form">
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
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  if (signupPasswordValue !== signupRetypePasswordValue) {
                    setmatchpassword("password not matching");
                  } else {
                    setmatchpassword("");
                    const data = await actions.jobseekersignup(
                      signupEmailValue,
                      signupPasswordValue
                    );
                    if (!store.error_message_signup) navigate("/");
                  }
                }}
              >
                SignUp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
