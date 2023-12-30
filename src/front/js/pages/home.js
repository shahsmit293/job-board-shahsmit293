import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { Sidebar } from "../component/sidebar";
import { ViewJobPage } from "./viewjobpage";

export const Home = () => {
  let states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const workLocationTypes = ["Remote", "Hybrid", "Onsite"];
  const jobTypes = ["Full Time", "Part Time", "Temporary", "Contract"];
  const workingTimes = ["Day Shift", "Night Shift", "Afternoon Shift"];
  const experienceLevels = [
    "Internship",
    "Entry level",
    "Associate",
    "Mid-Senior level",
    "Director",
    "Executive",
  ];
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState("");
  const [valueJobtitle, setValueJobtitile] = useState("");
  const [valueworklocation, setworklocation] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [experiencelevel, setexperiencelevel] = useState("");
  const [workingtimes, setworkingtimes] = useState("");
  useEffect(() => {
    actions.alljobsdata();
    actions.getresumedetail(store.user.id);
    actions.getapplicant(store.user.id);
    if (store.user) {
      actions.getusersavedjob(store.user.id);
    }
  }, [store.user.id]);

  const handleViewClick = () => {
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
  useEffect(() => {
    actions.searchjobsdata(valueJobtitle);
  }, [valueJobtitle]);
  return (
    <div className="text-center mt-5">
      <div className="search">
        <input
          placeholder="search here for job title,company name"
          value={valueJobtitle}
          onChange={(e) => setValueJobtitile(e.target.value)}
        ></input>
        <label>Address:</label>
        <select>
          <option value="" onClick={() => setLocation("")}>
            Select a state
          </option>
          {states.map((state) => (
            <option
              key={state}
              value={state}
              onClick={() => setLocation(state)}
            >
              {state}
            </option>
          ))}
        </select>
        <select id="workLocationType" name="workLocationType">
          <option value="" onClick={() => setworklocation("")}>
            Select...
          </option>
          {workLocationTypes.map((type) => (
            <option
              key={type}
              value={type}
              onClick={() => setworklocation(type)}
            >
              {type}
            </option>
          ))}
        </select>
        <label htmlFor="jobType">Job Type</label>
        <select id="jobType" name="jobType">
          <option value="" onClick={() => setjobtype("")}>
            Select...
          </option>
          {jobTypes.map((type) => (
            <option key={type} value={type} onClick={() => setjobtype(type)}>
              {type}
            </option>
          ))}
        </select>
        <label htmlFor="experienceLevel">Experience Level</label>
        <select id="experienceLevel" name="experienceLevel">
          <option value="" onClick={() => setexperiencelevel("")}>
            Select...
          </option>
          {experienceLevels.map((level) => (
            <option
              key={level}
              value={level}
              onClick={() => setexperiencelevel(level)}
            >
              {level}
            </option>
          ))}
        </select>
        <label htmlFor="workingTimes">Working Times</label>
        <select id="workingTimes" name="workingTimes">
          <option value="" onClick={() => setworkingtimes("")}>
            Select...
          </option>
          {workingTimes.map((time) => (
            <option
              key={time}
              value={time}
              onClick={() => setworkingtimes(time)}
            >
              {time}
            </option>
          ))}
        </select>
        <button onClick={() => actions.searchjobsdata(valueJobtitle)}>
          Search
        </button>
      </div>
      <div className="location"></div>
      <div className="row gy-3 mt-4">
        {store.searchjobs && store.searchjobs.length > 0 ? (
          store.searchjobs.map((element, index) => {
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
                displayapplied={displayapplied(element.id)}
              />
            );
          })
        ) : (
          <p>No jobs posted yet.</p>
        )}
        {showPopup && (
          <div className="popup">
            <button onClick={() => setShowPopup(false)}>Close</button>
            <ViewJobPage />
          </div>
        )}
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
};
