import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { EmployerSidebar } from "../component/employersidebar";
import { Context } from "../store/appContext";
import QuillEditor from "../component/textarea";
import { useNavigate } from "react-router-dom";

export const EmployerCreateJobPost = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");
  const [editorText, setEditorText] = useState("");

  const handleTextChange = (text) => {
    setEditorText(text);
  };

  const [companyNameValue, setCompanyNameValue] = useState("");
  const [companyLogoValue, setCompanyLogoValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [companyEmailValue, setCompanyEmailValue] = useState("");
  const [jobTitleValue, setJobTitleValue] = useState("");
  const [numberHiringValue, setNumberHiringValue] = useState("");
  const [workLocationTypeValue, setWorkLocationTypeValue] = useState("");
  const [jobTypeValue, setJobTypeValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [workingHoursValue, setWorkingHoursValue] = useState("");
  const [experienceLevelsValue, setExperienceLevelValue] = useState("");
  const [minExperienceValue, setMinExperienceValue] = useState("");
  const [maxExperiencesValue, setMaxExperienceValue] = useState("");
  const [minSalaryValue, setMinSalaryValue] = useState("");
  const [maxSalaryValue, setMaxSalaryValue] = useState("");
  const [workingTimesValue, setWorkingTimesValue] = useState("");
  const [weekendRequiredValue, setWeekendRequiredValue] = useState("");
  const [languageValue, setLanguageValue] = useState("");
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
    }
  };
  return (
    <div className="text-center mt-5">
      {store.accessToken ? (
        <div>
          <div className="sidebar">
            <EmployerSidebar />
          </div>
          <form>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={companyNameValue}
              onChange={(e) => setCompanyNameValue(e.target.value)}
            />
            <br />
            <label htmlFor="companyLogo">Company Logo:</label>
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              onChange={(e) => setCompanyLogoValue(e.target.files[0])}
            />
            <br />
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={firstNameValue}
              onChange={(e) => setFirstNameValue(e.target.value)}
            />
            <br />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={lastNameValue}
              onChange={(e) => setLastNameValue(e.target.value)}
            />
            <br />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumberValue}
              onChange={(e) => setPhoneNumberValue(e.target.value)}
            />
            <br />
            <label htmlFor="companyEmail">Company Email</label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              required
              value={companyEmailValue}
              onChange={(e) => setCompanyEmailValue(e.target.value)}
            />
            <br />
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              required
              value={jobTitleValue}
              onChange={(e) => setJobTitleValue(e.target.value)}
            />
            <br />
            <label htmlFor="numberHiring">Number Hiring</label>
            <input
              type="number"
              id="numberHiring"
              name="numberHiring"
              required
              value={numberHiringValue}
              onChange={(e) => setNumberHiringValue(e.target.value)}
            />
            <br />
            <label htmlFor="workLocationType">Work Location Type</label>
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
            <br />
            <label htmlFor="jobType">Job Type</label>
            <select id="jobType" name="jobType" required onChange={sorted}>
              <option value="">Select...</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Temporary">Temporary</option>
              <option value="Contract">Contract</option>
            </select>
            <br />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
            />
            <br />
            <label htmlFor="workingHours">Working Hours:</label>
            <input
              type="text"
              id="workingHours"
              name="workingHours"
              value={workingHoursValue}
              onChange={(e) => setWorkingHoursValue(e.target.value)}
            />
            <br />
            <label htmlFor="experienceLevel">Experience Level</label>
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
            <label htmlFor="minExperience">Minimum Year Experience:</label>
            <input
              type="number"
              id="minExperience"
              name="minExperience"
              required
              value={minExperienceValue}
              onChange={(e) => setMinExperienceValue(e.target.value)}
            />
            <br />
            <label htmlFor="maxExperience">Maximum Year Experience:</label>
            <input
              type="number"
              id="maxExperience"
              name="maxExperience"
              value={maxExperiencesValue}
              onChange={(e) => setMaxExperienceValue(e.target.value)}
            />
            <br />
            <label htmlFor="minSalary">Minimum Salary:</label>
            <input
              type="number"
              id="minSalary"
              name="minSalary"
              value={minSalaryValue}
              onChange={(e) => setMinSalaryValue(e.target.value)}
            />
            <br />
            <label htmlFor="maxSalary">Maximum Salary:</label>
            <input
              type="number"
              id="maxSalary"
              name="maxSalary"
              value={maxSalaryValue}
              onChange={(e) => setMaxSalaryValue(e.target.value)}
            />
            <br />
            <label htmlFor="workingTimes">Working Times</label>
            <select id="workingTimes" name="workingTimes" onChange={sorted}>
              <option value="">Select...</option>
              <option value="Day Shift">Day Shift</option>
              <option value="Night Shift">Night Shift</option>
              <option value="Afternoon Shift">Afternoon Shift</option>
            </select>
            <br />
            <label htmlFor="weekendRequired">Weekend Required</label>
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
            <label htmlFor="language">Language:</label>
            <input
              type="text"
              id="language"
              name="language"
              value={languageValue}
              onChange={(e) => setLanguageValue(e.target.value)}
            />
            <br />
            <QuillEditor handleTextChange={handleTextChange} />
            <button
              type="button"
              onClick={(e) => {
                actions
                  .addjob(
                    store.activeuser,
                    companyNameValue,
                    companyLogoValue,
                    firstNameValue,
                    lastNameValue,
                    jobTitleValue,
                    companyEmailValue,
                    phoneNumberValue,
                    numberHiringValue,
                    workLocationTypeValue,
                    locationValue,
                    jobTypeValue,
                    workingHoursValue,
                    experienceLevelsValue,
                    minExperienceValue,
                    maxExperiencesValue,
                    minSalaryValue,
                    maxSalaryValue,
                    workingTimesValue,
                    editorText,
                    weekendRequiredValue,
                    languageValue
                  )
                  .then(() => navigate("/employerhome"));
              }}
            />
          </form>
        </div>
      ) : (
        "please log in to"
      )}
    </div>
  );
};
