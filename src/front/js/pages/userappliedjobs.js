import React from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";
import { JobCard } from "../component/jobcard";

export const UserAppliedJobs = () => {
  return (
    <div className="history">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="historylists">
        <JobCard />
      </div>
    </div>
  );
};
