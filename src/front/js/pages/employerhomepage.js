import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { EmployerSidebar } from "../component/employersidebar";

export const EmployerHome = () => {
  return (
    <div className="text-center mt-5">
      <div className="sidebar">
        <EmployerSidebar />
      </div>
      <h2>
        All jobs here we can delete and edit here <button>View</button>
        <button>edit</button>
        <button>delete</button>
        <button>pause</button>
        <button>hide</button>
      </h2>
    </div>
  );
};
