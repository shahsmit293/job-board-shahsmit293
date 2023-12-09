import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Sidebar = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      {store.useraccessToken && (
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="nav-link active">Applied Jobs</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Saved Jobs</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Search History</button>
          </li>
        </ul>
      )}
    </div>
  );
};
