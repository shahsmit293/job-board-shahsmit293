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
                  displayunsave="inline"
                  displayapplied={displayapplied(element.id)}
                  dateposted={timeAgo(
                    element.current_date,
                    element.current_time
                  )}
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
