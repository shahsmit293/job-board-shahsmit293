import React from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";

export const UserPreference = () => {
  return (
    <div className="preference">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="details">
        <h2>Your Preferences</h2>
      </div>
    </div>
  );
};
