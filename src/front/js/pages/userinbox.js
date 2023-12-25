import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { JobCard } from "../component/jobcard";
import { Sidebar } from "../component/sidebar";
import { ViewJobPage } from "./viewjobpage";
export const Userinbox = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleViewClick = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    actions
      .applicantinboxchats(store.user.id)
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, [store.user.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const displayapplied = (id) => {
    if (!Array.isArray(store.applliedapplicants)) {
      return "none";
    } else {
      return store.applliedapplicants.some((item) => item.job.id === id)
        ? "inline"
        : "none";
    }
  };
  return (
    <div>
      {store.alljobs &&
        store.alljobs
          .filter(
            (item) =>
              Array.isArray(store.contacted) &&
              store.contacted.some((contact) => contact.job_id === item.id)
          )
          .map((element, index) => (
            <JobCard
              key={index}
              jobtitlename={element.job_title}
              Company={element.company_name}
              Location={element.location}
              Jobtype={element.job_type}
              viewid={element.id}
              onViewClick={handleViewClick}
              jobid={element.id}
              display={"none"}
              displayunsave={"none"}
              displayapplied={displayapplied(element.id)}
            />
          ))}
      {store.contacted && store.contacted.length === 0 && (
        <p>No chat initiated yet</p>
      )}
      {showPopup && (
        <div className="popup">
          <button onClick={() => setShowPopup(false)}>Close</button>
          <ViewJobPage />
        </div>
      )}
      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
};
