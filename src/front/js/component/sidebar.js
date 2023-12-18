import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Sidebar = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");
  return (
    <div>
      {store.useraccessToken && (
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className="nav-link active"
              onClick={() => navigate("/userappliedjobs")}
            >
              Applied Jobs
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => navigate("/usersavedjobs")}
            >
              Saved Jobs
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Search History</button>
          </li>
        </ul>
      )}
    </div>
  );
};
