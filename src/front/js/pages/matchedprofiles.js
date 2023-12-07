import React, { useContext } from "react";
import "../../styles/home.css";
import { EmployerSidebar } from "../component/employersidebar";

export const MatchedProfiles = () => {
  return (
    <div className="text-center mt-5">
      <div className="sidebar">
        <EmployerSidebar />
      </div>
      <h2>List of all matched profiles</h2>
      <select className="form-select" aria-label="Default select example">
        <option selected="">Filter</option>
        <option value={1}>One</option>
        <option value={2}>Two</option>
        <option value={3}>Three</option>
      </select>
    </div>
  );
};
