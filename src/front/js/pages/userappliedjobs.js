import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { Sidebar } from "../component/sidebar";
import { ViewJobPage } from "./viewjobpage";

export const UserAppliedJobs = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    actions.alljobsdata();
    if (store.user) {
      actions.getapplicant(store.user.id);
    }
  }, [store.user.id]);

  const handleViewClick = (jobId) => {
    setSelectedJob(jobId);
    setShowPopup(true);
  };

  return (
    <div className="text-center mt-5">
      <div className="row gy-3 mt-4">
        {store.alljobs && store.alljobs.length > 0 ? (
          Array.isArray(store.applliedapplicants) &&
          store.applliedapplicants.length > 0 ? (
            store.alljobs
              .filter(
                (item) =>
                  Array.isArray(store.applliedapplicants) &&
                  store.applliedapplicants.some((b) => b.job.id === item.id)
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
                    displayunsave="none"
                    displayapplied="none"
                  />
                );
              })
          ) : (
            <p>No jobs applied yet.</p>
          )
        ) : (
          <p>No jobs available yet.</p>
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
