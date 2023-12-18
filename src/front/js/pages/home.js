import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { Sidebar } from "../component/sidebar";
import { ViewJobPage } from "./viewjobpage";
export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    actions.alljobsdata();
    if (store.user) {
      actions.getusersavedjob(store.user.id);
    }
  }, [store.user.id]);

  const handleViewClick = (jobId) => {
    setSelectedJob(jobId);
    setShowPopup(true);
  };

  const displaysave = (id) => {
    if (Array.isArray(store.usersaved)) {
      return store.usersaved.some((item) => item.job_id === id)
        ? "none"
        : "inline";
    } else {
      console.error("store.usersaved is not an array");
      return "inline"; // or return a default value
    }
  };

  const displayunsave = (id) => {
    if (Array.isArray(store.usersaved)) {
      return store.usersaved.some((item) => item.job_id === id)
        ? "inline"
        : "none";
    } else {
      console.error("store.usersaved is not an array");
      return "none"; // or return a default value
    }
  };

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
        {store.alljobs && store.alljobs.length > 0 ? (
          store.alljobs.map((element, index) => {
            return (
              <JobCard
                key={element.id}
                jobtitlename={element.job_title}
                Company={element.company_name}
                Location={element.location}
                Jobtype={element.job_type}
                viewid={element.id}
                onViewClick={handleViewClick}
                jobid={element.id}
                display={displaysave(element.id)}
                displayunsave={displayunsave(element.id)}
              />
            );
          })
        ) : (
          <p>No jobs posted yet.</p>
        )}
        {showPopup && (
          <div className="popup">
            <button onClick={() => setShowPopup(false)}>Close</button>
            <ViewJobPage viewid={selectedJob} />
          </div>
        )}
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
};
