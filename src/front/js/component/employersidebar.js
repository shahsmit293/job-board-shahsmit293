import React from "react";
import { useNavigate } from "react-router-dom";

export const EmployerSidebar = () => {
  const navigate = useNavigate("");
  return (
    <div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => {
              navigate("/employercreatejobpost");
            }}
          >
            Create a Job Post
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={() => navigate("/employerhome")}
          >
            Managae All Jobs
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Recieved Applicants</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Matched Profiles</button>
        </li>
      </ul>
    </div>
  );
};
