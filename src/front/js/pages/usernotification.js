import React from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";

export const UserNotification = () => {
  return (
    <div className="notification">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="notificationlists">
        <p>notification 1: </p>
      </div>
    </div>
  );
};
