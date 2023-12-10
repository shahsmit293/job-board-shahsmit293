import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { EmployerSidebar } from "../component/employersidebar";
import { PostJobCard } from "../component/postjobcard";
import { ViewJobPost } from "./viewjobpost";

export const EmployerHome = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    actions.watchjobpost(store.activeuser);
    actions.alljobsdata();
  }, [store.activeuser]);
  const handleViewClick = (jobId) => {
    setSelectedJob(jobId);
    setShowPopup(true);
  };
  return (
    <div className="text-center mt-5">
      <div className="sidebar">
        <EmployerSidebar />
      </div>
      <div className="row gy-3 mt-4">
        {store.seepostjobs && store.seepostjobs.length > 0 ? (
          store.seepostjobs.map((element, index) => {
            return (
              <PostJobCard
                key={element.id}
                jobtitlename={element.job_title}
                Company={element.company_name}
                Location={element.location}
                Jobtype={element.job_type}
                post_id={element.id}
                onViewClick={handleViewClick}
              />
            );
          })
        ) : (
          <p>No jobs posted yet.</p>
        )}
        {showPopup && (
          <div className="popup">
            <button onClick={() => setShowPopup(false)}>Close</button>
            <ViewJobPost viewid={selectedJob} />
          </div>
        )}
      </div>
    </div>
  );
};
