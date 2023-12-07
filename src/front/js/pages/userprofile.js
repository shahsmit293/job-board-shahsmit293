import React from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";

export const UserProfile = () => {
  return (
    <div className="profile">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="details">
        <div className="email">
          <h2>Email</h2>
          <h4>shahsmit@gmail.com</h4>
          <i class="fas fa-edit"></i>
        </div>
        <div className="password">
          <h2>Password</h2>
          <h4>*********</h4>
          <i class="fas fa-edit"></i>
        </div>
        <div className="phone">
          <h2>Phone Number</h2>
          <h4>1234567890</h4>
          <i class="fas fa-edit"></i>
        </div>
        <div className="visibilityprofile">
          <h2>Visible Profile</h2>
          <h4>add toggle switch here</h4>
        </div>
        <div className="resume">
          <h2>Resume</h2>
          <ul>
            <li>
              Coffee <i class="fas fa-plus"></i> <i class="fas fa-trash"></i>
            </li>
            <li>
              Tea <i class="fas fa-plus"></i> <i class="fas fa-trash"></i>
            </li>
            <li>
              Milk <i class="fas fa-plus"></i> <i class="fas fa-trash"></i>
            </li>
          </ul>
        </div>
        <div className="customresumebuild">
          <button>customresumebuild</button>
        </div>
        <div className="preference">
          <button>My Preference</button>
        </div>
        <div className="deleteuseraccount">
          <button>Delete My Account</button>
        </div>
      </div>
    </div>
  );
};
