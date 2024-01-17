import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { ViewJobPage } from "./viewjobpage";
import "../../styles/home.css";

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
  const timeAgo = (date, time) => {
    const currentDate = new Date();
    const givenDate = new Date(date + "T" + time);
    const diffTime = Math.abs(currentDate - givenDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return "yesterday";
    } else {
      return diffDays + "days ago";
    }
  };
  return (
    <div className="row gy-3" style={{ margin: "5px" }}>
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
                  worktype={element.work_location_type}
                  experiencelevel={element.experience_level_type}
                  shift={element.working_times}
                  salary={{
                    min: element.min_salary,
                    max: element.max_salary,
                  }}
                  viewid={element.id}
                  onViewClick={handleViewClick}
                  jobid={element.id}
                  display="none"
                  displayunsave="none"
                  displayapplied="none"
                  dateposted={timeAgo(
                    element.current_date,
                    element.current_time
                  )}
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
        <div>
          <p className="popup">
            <button
              className="styled-button"
              onClick={() => setShowPopup(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <ViewJobPage />
          </p>
        </div>
      )}
    </div>
  );
};
