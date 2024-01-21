import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/employersidebar.css";
export const EmployerSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul>
        <button onClick={() => navigate("/employercreatejobpost")}>
          <i class="fa-solid fa-plus"></i> Create Job
        </button>
        <button onClick={() => navigate("/employerhome")}>
          Manage All Jobs
        </button>
        <button onClick={() => navigate("/searchprofiles")}>
          Search Profiles
        </button>
        <button onClick={() => navigate("/contactedprofiles")}>
          Contacted Profiles
        </button>
        <button onClick={() => navigate("/savedprofiles")}>
          Saved Profiles
        </button>
      </ul>
    </div>
  );
};
