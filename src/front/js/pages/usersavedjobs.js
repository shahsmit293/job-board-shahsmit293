import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { Sidebar } from "../component/sidebar";
import { ViewJobPage } from "./viewjobpage";

export const UserSavedJobs = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    actions.alljobsdata();
    actions.getapplicant(store.user.id);
    if (store.user) {
      actions.getusersavedjob(store.user.id);
    }
  }, [store.user.id]);

  const handleViewClick = (jobId) => {
    setSelectedJob(jobId);
    setShowPopup(true);
  };
  console.log(store.applliedapplicants);
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
    <div className="text-center mt-5">
      <div className="row gy-3 mt-4">
        {store.alljobs && store.alljobs.length > 0 ? (
          Array.isArray(store.usersaved) && store.usersaved.length > 0 ? (
            store.alljobs
              .filter(
                (item) =>
                  Array.isArray(store.usersaved) &&
                  store.usersaved.some((b) => b.job_id === item.id)
              )
              .map((element, index) => {
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
                    display="none"
                    displayunsave="inline"
                    displayapplied={displayapplied(element.id)}
                  />
                );
              })
          ) : (
            <p>No jobs saved yet.</p>
          )
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
