import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { JobCard } from "../component/jobcard";
import { ViewJobPage } from "./applicant/viewjobpage";
import { useNavigate } from "react-router-dom";
import LocationSearchInput from "./locationSearchInput";

export const Home = () => {
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
  const navigate = useNavigate("");
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
    const fetchData = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const valueJobtitle = searchParams.get("valueJobtitle") || "";
      const location = searchParams.get("location") || "";
      const valueworklocation = searchParams.get("valueworklocation") || "";
      const jobtype = searchParams.get("jobtype") || "";
      const experiencelevel = searchParams.get("experiencelevel") || "";
      const education = searchParams.get("education") || "";
      const workingtimes = searchParams.get("workingtimes") || "";
      const postdays = searchParams.get("postdays") || "";
      const salary = searchParams.get("salary") || "";

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
    };

    // Fetch data when the component mounts
    fetchData();

    const popstateListener = () => {
      // Wait for 1 millisecond before fetching data
      setTimeout(fetchData, 100);
    };

    // Fetch data when the URL changes
    window.addEventListener("popstate", popstateListener);

    return () => {
      window.removeEventListener("popstate", popstateListener);
    };
  }, []);

  useEffect(() => {
    // Event listener for popstate event
    const handlePopstate = () => {
      const searchParams = new URLSearchParams(window.location.search);
      setValueJobtitile(searchParams.get("valueJobtitle") || "");
      setLocation(searchParams.get("location") || "");
      setworklocation(searchParams.get("valueworklocation") || "");
      setjobtype(searchParams.get("jobtype") || "");
      setexperiencelevel(searchParams.get("experiencelevel") || "");
      seteducationValue(searchParams.get("education") || "");
      setworkingtimes(searchParams.get("workingtimes") || "");
      setpostdays(searchParams.get("postdays") || "");
      setsalary(searchParams.get("salary") || "");

      // If all search parameters are empty, set the URL to "/"
      if (
        !searchParams.get("valueJobtitle") &&
        !searchParams.get("location") &&
        !searchParams.get("valueworklocation") &&
        !searchParams.get("jobtype") &&
        !searchParams.get("experiencelevel") &&
        !searchParams.get("education") &&
        !searchParams.get("workingtimes") &&
        !searchParams.get("postdays") &&
        !searchParams.get("salary")
      ) {
        window.history.replaceState(null, "", "/");
      }
    };

    // Add event listener for popstate
    window.addEventListener("popstate", handlePopstate);

    // Call the handler once to update the state when the component mounts
    handlePopstate();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

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
      <div className="searchdetails">
        <div className="searchbar">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={valueJobtitle}
            onChange={(e) => setValueJobtitile(e.target.value)}
          />
          <LocationSearchInput setLocation={setLocation} location={location} />
          <button
            className="searchbutton"
            onClick={() => {
              actions.searchjobsdata(
                valueJobtitle,
                location,
                valueworklocation,
                jobtype,
                experiencelevel,
                education,
                workingtimes,
                postdays
              );
              navigate(
                `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
              );
            }}
          >
            Search
          </button>
          <button
            className="searchbutton"
            onClick={() => {
              setValueJobtitile("");
              setLocation("");
              setworklocation("");
              setjobtype("");
              setexperiencelevel("");
              seteducationValue("");
              setworkingtimes("");
              setpostdays("");
              navigate("/");

              // Fetch data with empty values
              actions.searchjobsdata("", "", "", "", "", "", "", "", "");
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="actions">
        <div className="select">
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setworklocation("")}
            >
              {valueworklocation || "Type..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {workLocationTypes.map((type) => (
                <li>
                  <a
                    key={type}
                    class="dropdown-item"
                    onClick={() => setworklocation(type)}
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays
                  );
                  navigate(
                    `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                style={{ marginLeft: "5px", marginRight: "10px" }}
                onClick={() => {
                  setworklocation("");
                  // Fetch data with the updated state values
                  actions.searchjobsdata(
                    valueJobtitle,
                    location, // location is cleared
                    "",
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays,
                    salary
                  ); // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("valueworklocation");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setjobtype("")}
            >
              {jobtype || "Job Type..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {jobTypes.map((type) => (
                <li>
                  <a
                    key={type}
                    class="dropdown-item"
                    onClick={() => setjobtype(type)}
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays
                  );
                  navigate(
                    `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                style={{ marginLeft: "5px", marginRight: "10px" }}
                onClick={() => {
                  setjobtype("");
                  // Fetch data with the updated state values
                  actions.searchjobsdata(
                    valueJobtitle,
                    location, // location is cleared
                    valueworklocation,
                    "",
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays,
                    salary
                  ); // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("jobtype");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setexperiencelevel("")}
            >
              {experiencelevel || "Experience..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {experienceLevels.map((level) => (
                <li>
                  <a
                    key={level}
                    class="dropdown-item"
                    onClick={() => setexperiencelevel(level)}
                  >
                    {level}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays
                  );
                  navigate(
                    `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                style={{ marginLeft: "5px", marginRight: "10px" }}
                onClick={() => {
                  setexperiencelevel("");
                  // Fetch data with the updated state values
                  actions.searchjobsdata(
                    valueJobtitle,
                    location, // location is cleared
                    valueworklocation,
                    jobtype,
                    "",
                    education,
                    workingtimes,
                    postdays,
                    salary
                  ); // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("experiencelevel");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => seteducationValue("")}
            >
              {education || "Degree..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {educationDegrees.map((degree) => (
                <li>
                  <a
                    key={degree}
                    class="dropdown-item"
                    onClick={() => seteducationValue(degree)}
                  >
                    {degree}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays
                  );
                  navigate(
                    `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                style={{ marginLeft: "5px", marginRight: "10px" }}
                onClick={() => {
                  seteducationValue("");
                  // Fetch data with the updated state values
                  actions.searchjobsdata(
                    valueJobtitle,
                    location, // location is cleared
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    "",
                    workingtimes,
                    postdays,
                    salary
                  ); // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("education");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setworkingtimes("")}
            >
              {workingtimes || "Shifts..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {workingTimes.map((time) => (
                <li>
                  <a
                    key={time}
                    class="dropdown-item"
                    onClick={() => setworkingtimes(time)}
                  >
                    {time}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays
                  );
                  navigate(
                    `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                style={{ marginLeft: "5px", marginRight: "10px" }}
                onClick={() => {
                  setworkingtimes("");
                  // Fetch data with the updated state values
                  actions.searchjobsdata(
                    valueJobtitle,
                    location, // location is cleared
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    "",
                    postdays,
                    salary
                  ); // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("workingtimes");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setpostdays("")}
            >
              {postdays || "Posted Job..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {daysposted.map((day) => (
                <li>
                  <a
                    key={day}
                    class="dropdown-item"
                    onClick={() => setpostdays(day)}
                  >
                    {day}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays
                  );
                  navigate(
                    `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                style={{ marginLeft: "5px", marginRight: "10px" }}
                onClick={() => {
                  setpostdays("");
                  // Fetch data with the updated state values
                  actions.searchjobsdata(
                    valueJobtitle,
                    location, // location is cleared
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    "",
                    salary
                  ); // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("postdays");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setsalary("")}
            >
              {salary || "Salary..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {salaryPackage.map((salary) => (
                <li>
                  <a
                    key={salary}
                    class="dropdown-item"
                    onClick={() => setsalary(salary)}
                  >
                    {salary}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays
                  );
                  navigate(
                    `/?valueJobtitle=${valueJobtitle}&location=${location}&valueworklocation=${valueworklocation}&jobtype=${jobtype}&experiencelevel=${experiencelevel}&education=${education}&workingtimes=${workingtimes}&postdays=${postdays}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                style={{ marginLeft: "5px", marginRight: "10px" }}
                onClick={() => {
                  setsalary("");
                  // Fetch data with the updated state values
                  actions.searchjobsdata(
                    valueJobtitle,
                    location,
                    valueworklocation,
                    jobtype,
                    experiencelevel,
                    education,
                    workingtimes,
                    postdays,
                    ""
                  ); // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("salary");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className="grid-container">
          {store.searchjobs && store.searchjobs.length > 0 ? (
            store.searchjobs.map((element, index) => (
              <JobCard
                key={index}
                jobtitlename={element.job_title}
                Company={element.company_name}
                logo={element.company_logo}
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
                display={displaysave(element.id)}
                displayunsave={displayunsave(element.id)}
                displayapplied={displayapplied(element.id)}
                dateposted={timeAgo(element.current_date, element.current_time)}
              />
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
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
