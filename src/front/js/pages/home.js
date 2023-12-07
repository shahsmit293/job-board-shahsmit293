import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { Sidebar } from "../component/sidebar";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <div className="recenthistory">
        <button>recent search history</button>
      </div>
      <div className="search">
        <input placeholder="search here for job title,company name"></input>
        <input placeholder="enter location"></input>
        <button>Search</button>
      </div>
      <div className="location"></div>
      <div className="row gy-3 mt-4">
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
};
