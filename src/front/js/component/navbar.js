import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-brand">Logo</button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link active"
                aria-current="page"
                onClick={() => navigate("/jobseekerloginsignup")}
              >
                job seeker
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => navigate("/employerloginsignup")}
              >
                employer
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" href="#">
                chat
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" href="#">
                notification
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" href="#">
                profile
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={actions.handleLogout}>
                log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
