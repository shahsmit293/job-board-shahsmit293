import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a
          class="navbar-brand"
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
          <img
            src="https://www.shutterstock.com/shutterstock/photos/405401863/display_1500/stock-vector-business-handshake-contract-agreement-flat-vector-icon-for-apps-and-websites-405401863.jpg"
            alt="home image"
            width="30"
            height="30"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <div class="navbar-nav ml-auto">
            {!store.accessToken && !store.useraccessToken ? (
              <>
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => navigate("/jobseekerloginsignup")}
                  >
                    Job Seeker
                  </a>
                </div>
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => navigate("/employerloginsignup")}
                  >
                    Employer
                  </a>
                </div>
              </>
            ) : null}

            {store.accessToken ? (
              <>
                <div
                  class="nav-item"
                  onClick={() => navigate("/employercreatejobpost")}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Create Job
                  </a>
                </div>
                <div class="nav-item" onClick={() => navigate("/employerhome")}>
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Manage All Jobs
                  </a>
                </div>
                <div
                  class="nav-item"
                  onClick={() => navigate("/searchprofiles")}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Search Profiles
                  </a>
                </div>
                <div
                  class="nav-item"
                  onClick={() => navigate("/contactedprofiles")}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Contacted Profiles
                  </a>
                </div>
                <div
                  class="nav-item"
                  onClick={() => navigate("/savedprofiles")}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Saved Profiles
                  </a>
                </div>
                <div class="nav-item" onClick={actions.handleLogout}>
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Log Out
                  </a>
                </div>
              </>
            ) : store.useraccessToken ? (
              <>
                <div class="nav-item">
                  <a class="nav-link" onClick={() => navigate("/userinbox")}>
                    Inbox
                  </a>
                </div>{" "}
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => navigate("/userappliedjobs")}
                  >
                    Applied Jobs
                  </a>
                </div>{" "}
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => navigate("/usersavedjobs")}
                  >
                    Saved Jobs
                  </a>
                </div>{" "}
                <div class="nav-item">
                  <a class="nav-link" onClick={() => navigate("/userprofile")}>
                    Profile
                  </a>
                </div>{" "}
                <div class="nav-item">
                  <a class="nav-link" onClick={actions.handleLogout}>
                    Log Out
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};
