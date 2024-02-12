import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { JobCard } from "../../component/jobcard";
import { ViewJobPage } from "./viewjobpage";
import "../../../styles/userinbox.css";

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
    <div className="userinbox">
      <div className="countinbox" style={{ color: "blue" }}>
        <b>Total Contacted Jobs: </b>
        {store.alljobs &&
          store.alljobs.filter(
            (item) =>
              Array.isArray(store.contacted) &&
              store.contacted.some((contact) => contact.job_id === item.id)
          ).length}
      </div>
      <div className="grid-container">
        {Array.isArray(store.contacted) && store.contacted.length > 0 ? (
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
                worktype={element.work_location_type}
                experiencelevel={element.experience_level_type}
                shift={element.working_times}
                salary={{ min: element.min_salary, max: element.max_salary }}
                totalapplicants={element.total_applicants}
                viewid={element.id}
                onViewClick={handleViewClick}
                jobid={element.id}
                display={"none"}
                displayunsave={"none"}
                displayapplied={displayapplied(element.id)}
                dateposted={timeAgo(element.current_date, element.current_time)}
              />
            ))
        ) : (
          <p>
            <p>No chat initiated yet</p>
          </p>
        )}

        {showPopup && (
          <div>
            <p className="popup">
              <button onClick={() => setShowPopup(false)}>Close</button>
              <ViewJobPage />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
