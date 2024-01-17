import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/employersidebar.css";
export const EmployerSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate("/employercreatejobpost")}>
          <i class="fa-solid fa-plus"></i>
        </li>
        <li onClick={() => navigate("/employerhome")}>Manage All Jobs</li>
        <li onClick={() => navigate("/searchprofiles")}>Search Profiles</li>
        <li onClick={() => navigate("/contactedprofiles")}>
          Contacted Profiles
        </li>
        <li onClick={() => navigate("/savedprofiles")}>Saved Profiles</li>
      </ul>
    </div>
  );
};
