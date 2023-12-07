import React from "react";

export const Sidebar = (props) => {
  return (
    <div>
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
    </div>
  );
};
