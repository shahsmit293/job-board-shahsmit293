import React from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";

export const UserCustomResume = () => {
  return (
    <div className="profile">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="details">
        <h2>Build Your Resume style Data</h2>
        <div className="fullname">
          <h2>First Name</h2>
          <i class="fas fa-edit"></i>
          <h4>Last Name</h4>
          <i class="fas fa-edit"></i>
        </div>
        <div className="Education">
          <h2>Education</h2>
          <i class="fas fa-edit"></i>
        </div>
        <div className="experience">
          <h2>Expereince</h2>
          <i class="fas fa-edit"></i>
        </div>
      </div>
    </div>
  );
};
