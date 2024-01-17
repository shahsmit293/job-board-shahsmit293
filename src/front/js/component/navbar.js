import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-brand btn btn-dark"
          onClick={() => {
            if (store.activeuser) {
              navigate("/employerhome");
            } else if (store.activejobseeker) {
              navigate("/");
            } else {
              navigate("/");
            }
          }}
        >
          Logooo
        </button>
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
          <ul className="navbar-nav ml-auto">
            {!store.accessToken && !store.useraccessToken ? (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link active btn btn-dark"
                    aria-current="page"
                    onClick={() => navigate("/jobseekerloginsignup")}
                  >
                    Job Seeker
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-dark"
                    onClick={() => navigate("/employerloginsignup")}
                  >
                    Employer
                  </button>
                </li>
              </>
            ) : null}

            {store.accessToken ? (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-dark"
                    onClick={actions.handleLogout}
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : store.useraccessToken ? (
              <>
                <button onClick={() => navigate("/userinbox")}>Inbox</button>
                <button onClick={() => navigate("/userappliedjobs")}>
                  Applied Jobs
                </button>
                <button onClick={() => navigate("/usersavedjobs")}>
                  Saved Jobs
                </button>
                <button onClick={() => navigate("/userprofile")}>
                  Profile
                </button>
                <button onClick={actions.handleLogout}>Log Out</button>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};
