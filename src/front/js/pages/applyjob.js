import React from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";

export const ApplyJob = () => {
  return (
    <div>
      <div className="job">
        <div className="job title">job title: </div>
        <div className="companydetails">
          <h4>company name:</h4>
          <h4>job posted days ago:</h4>
          <h4>job type:</h4>
          <h4>remote or onsite or hybrid</h4>
        </div>
        <div className="job details">
          <h1>About job</h1>
          <p>details here</p>
        </div>
        <div className="button">
          <button>Apply</button>
          <button>Save</button>
        </div>
        <div className="button">
          <button>Applied</button>
          <button>Start Chat</button>
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
