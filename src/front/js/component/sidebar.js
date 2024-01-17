import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Sidebar = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");
  return (
    <div className="sidebar">
      {store.useraccessToken && (
        <ul className="nav flex-column">
          <li onClick={() => navigate("/userappliedjobs")}>Applied Jobs</li>
          <li onClick={() => navigate("/usersavedjobs")}>Saved Jobs</li>
          <li onClick={() => navigate("/userprofile")}>Profile</li>
        </ul>
      )}
    </div>
  );
};
