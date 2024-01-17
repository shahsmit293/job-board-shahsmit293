import React, { useContext, useState } from "react";
import "../../../styles/createjobposts.css";
import { EmployerSidebar } from "../../component/employersidebar";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const EmployerCreateJobPost = () => {
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

  const [location, setLocation] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");

  const [companyNameValue, setCompanyNameValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [companyEmailValue, setCompanyEmailValue] = useState("");
  const [jobTitleValue, setJobTitleValue] = useState("");
  const [numberHiringValue, setNumberHiringValue] = useState("");
  const [workLocationTypeValue, setWorkLocationTypeValue] = useState("");
  const [jobTypeValue, setJobTypeValue] = useState("");
  const [workingHoursValue, setWorkingHoursValue] = useState("");
  const [experienceLevelsValue, setExperienceLevelValue] = useState("");
  const [minExperienceValue, setMinExperienceValue] = useState("");
  const [maxExperiencesValue, setMaxExperienceValue] = useState("");
  const [minSalaryValue, setMinSalaryValue] = useState("");
  const [maxSalaryValue, setMaxSalaryValue] = useState("");
  const [workingTimesValue, setWorkingTimesValue] = useState("");
  const [weekendRequiredValue, setWeekendRequiredValue] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [educationdegreeValue, setEducationValue] = useState("");
  const sorted = (e) => {
    if (e.target.value === "Remote") {
      setWorkLocationTypeValue("Remote");
    } else if (e.target.value === "Hybrid") {
      setWorkLocationTypeValue("Hybrid");
    } else if (e.target.value === "Onsite") {
      setWorkLocationTypeValue("Onsite");
    } else if (e.target.value === "Full Time") {
      setJobTypeValue("Full Time");
    } else if (e.target.value === "Part Time") {
      setJobTypeValue("Part Time");
    } else if (e.target.value === "Temporary") {
      setJobTypeValue("Temporary");
    } else if (e.target.value === "Contract") {
      setJobTypeValue("Contract");
    } else if (e.target.value === "Internship") {
      setExperienceLevelValue("Internship");
    } else if (e.target.value === "Entry level") {
      setExperienceLevelValue("Entry level");
    } else if (e.target.value === "Associate level") {
      setExperienceLevelValue("Associate");
    } else if (e.target.value === "Mid-Senior level") {
      setExperienceLevelValue("Mid-Senior level");
    } else if (e.target.value === "Director") {
      setExperienceLevelValue("Director");
    } else if (e.target.value === "Executive") {
      setExperienceLevelValue("Executive");
    } else if (e.target.value === "Day Shift") {
      setWorkingTimesValue("Day Shift");
    } else if (e.target.value === "Night Shift") {
      setWorkingTimesValue("Night Shift");
    } else if (e.target.value === "Afternoon Shift") {
      setWorkingTimesValue("Afternoon Shift");
    } else if (e.target.value === "Yes") {
      setWeekendRequiredValue("Yes");
    } else if (e.target.value === "No") {
      setWeekendRequiredValue("No");
    } else if (e.target.value === "Occasionaly") {
      setWeekendRequiredValue("Occasionaly");
    } else if (e.target.value === "High School Degree") {
      setEducationValue("High School Degree");
    } else if (e.target.value === "Associate Degree") {
      setEducationValue("Associate Degree");
    } else if (e.target.value === "Bachelor's Degree") {
      setEducationValue("Bachelor's Degree");
    } else if (e.target.value === "Mid-Senior level") {
      setEducationValue("Mid-Senior level");
    } else if (e.target.value === "Master's Degree") {
      setEducationValue("Master's Degree");
    } else if (e.target.value === "Doctoral Degree") {
      setEducationValue("Doctoral Degree");
    }
  };
  return (
    <div className="text-center mt-5">
      {store.accessToken ? (
        <div>
          <div className="sidebar">
            <EmployerSidebar />
          </div>
          <div className="title">
            <h1>CREATE FORM</h1>
          </div>
          <form>
            <div className="label">
              <label>Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={companyNameValue}
                onChange={(e) => setCompanyNameValue(e.target.value)}
              />
              <br />
            </div>
            <div className="label">
              <label>First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={firstNameValue}
                onChange={(e) => setFirstNameValue(e.target.value)}
              />
              <br />
            </div>
            <div className="label">
              <label>Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={lastNameValue}
                onChange={(e) => setLastNameValue(e.target.value)}
              />
            </div>
            <br />
            <div className="label">
              <label>Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                maxlength="10"
                name="phoneNumber"
                value={phoneNumberValue}
                onChange={(e) => setPhoneNumberValue(e.target.value)}
              />
            </div>
            <br />
            <div className="label">
              <label>Company Email</label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                required
                value={companyEmailValue}
                onChange={(e) => setCompanyEmailValue(e.target.value)}
              />
            </div>
            <br />
            <div className="label">
              <label>Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                required
                value={jobTitleValue}
                onChange={(e) => setJobTitleValue(e.target.value)}
              />
              <br />
            </div>
            <div className="label">
              <label>Number Hiring</label>
              <input
                type="number"
                min={1}
                id="numberHiring"
                name="numberHiring"
                required
                value={numberHiringValue}
                onChange={(e) => setNumberHiringValue(e.target.value)}
              />
            </div>
            <br />
            <div className="label">
              <label>Work Location Type</label>
              <select
                id="workLocationType"
                name="workLocationType"
                required
                onChange={sorted}
              >
                <option value="">Select...</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>
            <br />
            <div className="label">
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
            </div>
            <br />
            <div className="label">
              <label>Job Type</label>
              <select id="jobType" name="jobType" required onChange={sorted}>
                <option value="">Select...</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Temporary">Temporary</option>
                <option value="Contract">Contract</option>
              </select>
              <br />
            </div>
            <div className="label">
              <label>Minimum working Hours Per Week:</label>
              <input
                type="number"
                min={0}
                id="workingHours"
                name="workingHours"
                value={workingHoursValue}
                onChange={(e) => setWorkingHoursValue(e.target.value)}
              />
              <br />
            </div>
            <div className="label">
              <label>Experience Level</label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                required
                onChange={sorted}
              >
                <option value="">Select...</option>
                <option value="Internship">Internship</option>
                <option value="Entry level">Entry level</option>
                <option value="Associate">Associate</option>
                <option value="Mid-Senior level">Mid-Senior level</option>
                <option value="Director">Director</option>
                <option value="Executive">Executive</option>
              </select>
              <br />
            </div>
            <div className="label">
              <label>Education Degree</label>
              <select
                id="educationdegree"
                name="educationdegree"
                required
                onChange={sorted}
              >
                <option value="">Select...</option>
                <option value="High School Degree">High School Degree</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctoral Degree">Doctoral Degree</option>
              </select>
              <br />
            </div>
            <div className="label">
              <label>Minimum Year Experience:</label>
              <input
                type="number"
                min="0"
                id="minExperience"
                name="minExperience"
                required
                value={minExperienceValue}
                onChange={(e) => setMinExperienceValue(e.target.value)}
              />
              <br />
            </div>
            <div className="label">
              <label>Maximum Year Experience:</label>
              <input
                type="number"
                id="maxExperience"
                name="maxExperience"
                min={minExperienceValue}
                value={maxExperiencesValue}
                onChange={(e) => setMaxExperienceValue(e.target.value)}
              />
            </div>
            <br />
            <div className="label">
              <label>Minimum Salary:</label>
              <input
                type="number"
                min={0}
                id="minSalary"
                name="minSalary"
                value={minSalaryValue}
                onChange={(e) => setMinSalaryValue(e.target.value)}
              />
            </div>
            <br />
            <div className="label">
              <label>Maximum Salary:</label>
              <input
                type="number"
                min={minSalaryValue}
                id="maxSalary"
                name="maxSalary"
                value={maxSalaryValue}
                onChange={(e) => setMaxSalaryValue(e.target.value)}
              />
            </div>
            <br />
            <div className="label">
              <label>Working Times</label>
              <select id="workingTimes" name="workingTimes" onChange={sorted}>
                <option value="">Select...</option>
                <option value="Day Shift">Day Shift</option>
                <option value="Night Shift">Night Shift</option>
                <option value="Afternoon Shift">Afternoon Shift</option>
              </select>
              <br />
            </div>
            <div className="label">
              <label>Weekend Required</label>
              <select
                id="weekendRequired"
                name="weekendRequired"
                onChange={sorted}
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Occasionaly">Occasionaly</option>
              </select>
              <br />
            </div>
            <div className="label">
              <label>Language:</label>
              <input
                type="text"
                id="language"
                name="language"
                value={languageValue}
                onChange={(e) => setLanguageValue(e.target.value)}
              />
              <br />
            </div>
            <ReactQuill
              theme="snow"
              value={descriptionValue}
              style={{ color: "whitesmoke" }}
              onChange={setDescriptionValue}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                actions
                  .addjob(
                    store.employer.id,
                    companyNameValue,
                    firstNameValue,
                    lastNameValue,
                    jobTitleValue,
                    companyEmailValue,
                    phoneNumberValue,
                    numberHiringValue,
                    workLocationTypeValue,
                    location,
                    jobTypeValue,
                    workingHoursValue,
                    experienceLevelsValue,
                    educationdegreeValue,
                    minExperienceValue,
                    maxExperiencesValue,
                    minSalaryValue,
                    maxSalaryValue,
                    workingTimesValue,
                    descriptionValue,
                    weekendRequiredValue,
                    languageValue
                  )
                  .then(() => navigate("/employerhome"));
              }}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        "please log in to"
      )}
    </div>
  );
};
