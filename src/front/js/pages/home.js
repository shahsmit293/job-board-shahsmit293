import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { ViewJobPage } from "./applicant/viewjobpage";

export const Home = () => {
  const states = [
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
  const educationDegrees = [
    "High School Degree",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
  ];
  const salaryPackage = [
    "40000+",
    "60000+",
    "80000+",
    "100000+",
    "120000+",
    "150000+",
    "200000+",
  ];
  const daysposted = ["Last 24 Hours", "Last Week", "Last Month"];
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState("");
  const [valueJobtitle, setValueJobtitile] = useState("");
  const [valueworklocation, setworklocation] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [experiencelevel, setexperiencelevel] = useState("");
  const [education, seteducationValue] = useState("");
  const [workingtimes, setworkingtimes] = useState("");
  const [postdays, setpostdays] = useState("");
  const [salary, setsalary] = useState("");

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
    actions.searchjobsdata(
      valueJobtitle,
      location,
      valueworklocation,
      jobtype,
      experiencelevel,
      education,
      workingtimes,
      postdays,
      salary
    );
  }, [
    valueJobtitle,
    location,
    valueworklocation,
    jobtype,
    experiencelevel,
    education,
    workingtimes,
    postdays,
    salary,
  ]);

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
    <div className="home">
      <div className="select">
        <div>
          <input
            className="form-control"
            placeholder="Search here for job title, company name"
            value={valueJobtitle}
            onChange={(e) => setValueJobtitile(e.target.value)}
          />
        </div>
        <div>
          <label>Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" onClick={() => setLocation("")}>
              Select...
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <i class="fas fa-trash-alt" onClick={() => setLocation("")}></i>
        </div>
        <div>
          <label>Location Type</label>
          <select
            id="workLocationType"
            name="workLocationType"
            value={valueworklocation}
            onChange={(e) => setworklocation(e.target.value)}
          >
            <option value="" onClick={() => setworklocation("")}>
              Select...
            </option>
            {workLocationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <i class="fas fa-trash-alt" onClick={() => setworklocation("")}></i>
        </div>
        <div>
          <label>Job Type</label>
          <select
            id="jobType"
            name="jobType"
            value={jobtype}
            onChange={(e) => setjobtype(e.target.value)}
          >
            <option value="" onClick={() => setjobtype("")}>
              Select...
            </option>
            {jobTypes.map((type) => (
              <option key={type} value={type} onClick={() => setjobtype(type)}>
                {type}
              </option>
            ))}
          </select>
          <i class="fas fa-trash-alt" onClick={() => setjobtype("")}></i>
        </div>
        <div>
          <label>Experience Level</label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={experiencelevel}
            onChange={(e) => setexperiencelevel(e.target.value)}
          >
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
          <i
            class="fas fa-trash-alt"
            onClick={() => setexperiencelevel("")}
          ></i>
        </div>
        <div>
          <label>Degree</label>
          <select
            id="educationdegree"
            name="educationdegree"
            value={education}
            onChange={(e) => seteducationValue(e.target.value)}
          >
            <option value="" onClick={() => seteducationValue("")}>
              Select...
            </option>
            {educationDegrees.map((degree) => (
              <option
                key={degree}
                value={degree}
                onClick={() => seteducationValue(degree)}
              >
                {degree}
              </option>
            ))}
          </select>
          <i class="fas fa-trash-alt" onClick={() => seteducationValue("")}></i>
        </div>
        <div>
          <label>Shifts</label>
          <select
            id="workingTimes"
            name="workingTimes"
            value={workingtimes}
            onChange={(e) => setworkingtimes(e.target.value)}
          >
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
          <i class="fas fa-trash-alt" onClick={() => setworkingtimes("")}></i>
        </div>
        <div>
          <label>Posted Job</label>
          <select
            id="posted"
            name="posted"
            value={postdays}
            onChange={(e) => setpostdays(e.target.value)}
          >
            <option value="" onClick={() => setpostdays("")}>
              Select...
            </option>
            {daysposted.map((day) => (
              <option key={day} value={day} onClick={() => setpostdays(day)}>
                {day}
              </option>
            ))}
          </select>
          <i class="fas fa-trash-alt" onClick={() => setpostdays("")}></i>
        </div>
        <div>
          <label>Salary</label>
          <select
            id="salary"
            name="salary"
            value={salary}
            onChange={(e) => setsalary(e.target.value)}
          >
            <option value="" onClick={() => setsalary("")}>
              Select...
            </option>
            {salaryPackage.map((salary) => (
              <option
                key={salary}
                value={salary}
                onClick={() => setsalary(salary)}
              >
                {salary}
              </option>
            ))}
          </select>
          <i class="fas fa-trash-alt" onClick={() => setsalary("")}></i>
        </div>
        <button
          className="searchbutton"
          onClick={() =>
            actions.searchjobsdata(
              valueJobtitle,
              location,
              valueworklocation,
              jobtype,
              experiencelevel,
              education,
              workingtimes,
              postdays
            )
          }
        >
          Search
        </button>
        <button
          className="searchbutton"
          onClick={() => {
            setValueJobtitile(""),
              setLocation(""),
              setworklocation(""),
              setjobtype(""),
              setexperiencelevel(""),
              seteducationValue(""),
              setworkingtimes(""),
              setpostdays("");
          }}
        >
          Clear
        </button>
      </div>
      <div className="row gy-3" style={{ margin: "5px", flexGrow: "1" }}>
        {store.searchjobs && store.searchjobs.length > 0 ? (
          store.searchjobs.map((element, index) => {
            return (
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
                viewid={element.id}
                onViewClick={handleViewClick}
                jobid={element.id}
                display={displaysave(element.id)}
                displayunsave={displayunsave(element.id)}
                displayapplied={displayapplied(element.id)}
                dateposted={timeAgo(element.current_date, element.current_time)}
              />
            );
          })
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
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
