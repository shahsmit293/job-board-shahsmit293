import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  function closeNav() {
    let navBar = document.querySelector("#navbarNavDropdown");
    navBar.classList.remove("show");
  }
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
                    onClick={() => {
                      navigate("/jobseekerloginsignup");
                      closeNav();
                    }}
                  >
                    Job Seeker
                  </a>
                </div>
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => {
                      navigate("/employerloginsignup");
                      closeNav();
                    }}
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
                  onClick={() => {
                    navigate("/employercreatejobpost");
                    closeNav();
                  }}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Create Job
                  </a>
                </div>
                <div
                  class="nav-item"
                  onClick={() => {
                    navigate("/employerhome");
                    closeNav();
                  }}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Manage All Jobs
                  </a>
                </div>
                <div
                  class="nav-item"
                  onClick={() => {
                    navigate("/searchprofiles");
                    closeNav();
                  }}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Search Profiles
                  </a>
                </div>
                <div
                  class="nav-item"
                  onClick={() => {
                    navigate("/contactedprofiles");
                    closeNav();
                  }}
                >
                  <a class="nav-link" style={{ cursor: "pointer" }}>
                    Contacted Profiles
                  </a>
                </div>
                <div
                  class="nav-item"
                  onClick={() => {
                    navigate("/savedprofiles");
                    closeNav();
                  }}
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
                  <a
                    class="nav-link"
                    onClick={() => {
                      navigate("/userinbox");
                      closeNav();
                    }}
                  >
                    Inbox
                  </a>
                </div>{" "}
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => {
                      navigate("/userappliedjobs");
                      closeNav();
                    }}
                  >
                    Applied Jobs
                  </a>
                </div>{" "}
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => {
                      navigate("/usersavedjobs");
                      closeNav();
                    }}
                  >
                    Saved Jobs
                  </a>
                </div>{" "}
                <div class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => {
                      navigate("/userprofile");
                      closeNav();
                    }}
                  >
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
