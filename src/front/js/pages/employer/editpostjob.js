import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import CryptoJS from "crypto-js";
import "../../../styles/editjobposts.css";
import LocationSearchInput from "../locationSearchInput";

export const EditPostJob = () => {
  const { post_id } = useParams();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [location, setLocation] = useState("");

  let decryptedJobId = CryptoJS.AES.decrypt(post_id, "secret").toString(
    CryptoJS.enc.Utf8
  );
  let jobIdParam = parseInt(decryptedJobId);
  useEffect(() => {
    let decryptedJobId = CryptoJS.AES.decrypt(post_id, "secret").toString(
      CryptoJS.enc.Utf8
    );
    let jobIdParam = parseInt(decryptedJobId);
    // Fetch the book details when the component mounts
    actions.geteditjobs(
      jobIdParam,
      setCompanyNameValue,
      setCompanyLogo,
      setFirstNameValue,
      setLastNameValue,
      setPhoneNumberValue,
      setCompanyEmailValue,
      setJobTitleValue,
      setNumberHiringValue,
      setWorkLocationTypeValue,
      setJobTypeValue,
      setLocation,
      setWorkingHoursValue,
      setExperienceLevelValue,
      setEducationValue,
      setMinExperienceValue,
      setMaxExperienceValue,
      setMinSalaryValue,
      setMaxSalaryValue,
      setWorkingTimesValue,
      setWeekendRequiredValue,
      setLanguageValue,
      setDescriptionValue
    );

    return () => {
      // Clear all state values when component unmounts
      setCompanyNameValue("");
      setCompanyLogo("");
      setFirstNameValue("");
      setLastNameValue("");
      setPhoneNumberValue("");
      setCompanyEmailValue("");
      setJobTitleValue("");
      setNumberHiringValue("");
      setWorkLocationTypeValue("");
      setJobTypeValue("");
      setLocation("");
      setWorkingHoursValue("");
      setExperienceLevelValue("");
      setMinExperienceValue("");
      setMaxExperienceValue("");
      setMinSalaryValue("");
      setMaxSalaryValue("");
      setWorkingTimesValue("");
      setWeekendRequiredValue("");
      setLanguageValue("");
      setDescriptionValue("");
      setEducationValue("");
    };
  }, [jobIdParam]);

  const [companyNameValue, setCompanyNameValue] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
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
  const [showimagefile, setshowimagefile] = useState(false);
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
    <div className="editjobpostpage">
      {store.accessToken ? (
        <div className="editjob">
          <div className="title">
            <h3>Edit Post Form</h3>
          </div>
          <div className="text-center mt-5">
            <form>
              <div className="label">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={companyNameValue}
                  onChange={(e) => setCompanyNameValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label>Image:</label>
                {showimagefile ? (
                  <input
                    className="form-control"
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={(e) => setCompanyLogo(e.target.files[0])}
                  />
                ) : (
                  <span>
                    {companyLogo && companyLogo.includes(".com/")
                      ? companyLogo.split(".com/")[1].split("?")[0] ==
                        "defaultlogo.png"
                        ? "default logo uploaded"
                        : companyLogo.split(".com/")[1].split("?")[0]
                      : "No file selected"}
                  </span>
                )}

                <i
                  className="fa-solid fa-trash"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setshowimagefile(true);
                    setCompanyLogo("");
                    setLocation("defaultlogo.png");
                    document.getElementById("logo").value = "";
                  }}
                ></i>
              </div>
              <div className="label">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={firstNameValue}
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={lastNameValue}
                  onChange={(e) => setLastNameValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  maxlength="20"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumberValue}
                  onChange={(e) => setPhoneNumberValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="companyEmail">Company Email</label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  required
                  value={companyEmailValue}
                  onChange={(e) => setCompanyEmailValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  required
                  value={jobTitleValue}
                  onChange={(e) => setJobTitleValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="numberHiring">Number Hiring</label>
                <input
                  id="numberHiring"
                  name="numberHiring"
                  required
                  value={numberHiringValue}
                  onChange={(e) => setNumberHiringValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="workLocationType">Work Location Type</label>
                <select
                  id="workLocationType"
                  name="workLocationType"
                  value={workLocationTypeValue}
                  style={{ margin: "0px" }}
                  onChange={sorted}
                  onFocus={() => setError("")}
                >
                  <option value="">Select...</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
                <br />
              </div>
              <div className="label">
                <label htmlFor="jobType">Job Type</label>
                <select
                  id="jobType"
                  name="jobType"
                  onChange={sorted}
                  style={{ margin: "0px" }}
                  onFocus={() => setError("")}
                  value={jobTypeValue}
                >
                  <option value="">Select...</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Contract">Contract</option>
                </select>
                <br />
              </div>

              <div className="label">
                <label>Address:</label>
                <LocationSearchInput
                  setLocation={setLocation}
                  location={location}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="workingHours">Working Hours:</label>
                <input
                  id="workingHours"
                  name="workingHours"
                  value={workingHoursValue}
                  onChange={(e) => setWorkingHoursValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="experienceLevel">Experience Level</label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={experienceLevelsValue}
                  onChange={sorted}
                  style={{ margin: "0px" }}
                  onFocus={() => setError("")}
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
                  value={educationdegreeValue}
                  onChange={sorted}
                  style={{ margin: "0px" }}
                  onFocus={() => setError("")}
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
                <label htmlFor="minExperience">Minimum Year Experience:</label>
                <input
                  id="minExperience"
                  name="minExperience"
                  required
                  value={minExperienceValue}
                  onChange={(e) => setMinExperienceValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="maxExperience">Maximum Year Experience:</label>
                <input
                  id="maxExperience"
                  name="maxExperience"
                  value={maxExperiencesValue}
                  onChange={(e) => setMaxExperienceValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="minSalary">Minimum Salary:</label>
                <input
                  id="minSalary"
                  name="minSalary"
                  value={minSalaryValue}
                  onChange={(e) => setMinSalaryValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="maxSalary">Maximum Salary:</label>
                <input
                  id="maxSalary"
                  name="maxSalary"
                  value={maxSalaryValue}
                  onChange={(e) => setMaxSalaryValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <div className="label">
                <label htmlFor="workingTimes">Working Times</label>
                <select
                  id="workingTimes"
                  name="workingTimes"
                  onChange={sorted}
                  style={{ margin: "0px" }}
                  onFocus={() => setError("")}
                  value={workingTimesValue}
                >
                  <option value="">Select...</option>
                  <option value="Day Shift">Day Shift</option>
                  <option value="Night Shift">Night Shift</option>
                  <option value="Afternoon Shift">Afternoon Shift</option>
                </select>
                <br />
              </div>
              <div className="label">
                <label htmlFor="weekendRequired">Weekend Required</label>
                <select
                  id="weekendRequired"
                  name="weekendRequired"
                  onChange={sorted}
                  style={{ margin: "0px" }}
                  onFocus={() => setError("")}
                  value={weekendRequiredValue}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Occasionaly">Occasionaly</option>
                </select>
                <br />
              </div>
              <div className="label">
                <label htmlFor="language">Language:</label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={languageValue}
                  onChange={(e) => setLanguageValue(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
              </div>
              <ReactQuill
                theme="snow"
                value={descriptionValue}
                onChange={setDescriptionValue}
                style={{ margin: "0px" }}
                onFocus={() => setError("")}
              />
              <div style={{ color: "red" }}>{error}</div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const isPhoneNumberNum = /^\d+$/.test(phoneNumberValue);
                  const isNumberHiringNum = /^\d+$/.test(numberHiringValue);
                  const isWorkingHoursNum = /^\d+$/.test(workingHoursValue);
                  const isMinExperienceNum = /^\d+$/.test(minExperienceValue);
                  const isMaxExperiencesNum = /^\d+$/.test(maxExperiencesValue);
                  const isMinSalaryNum = /^\d+$/.test(minSalaryValue);
                  const isMaxSalaryNum = /^\d+$/.test(maxSalaryValue);

                  if (
                    !companyNameValue ||
                    !firstNameValue ||
                    !lastNameValue ||
                    !jobTitleValue ||
                    !companyEmailValue ||
                    !phoneNumberValue ||
                    !numberHiringValue ||
                    !workLocationTypeValue ||
                    !location ||
                    !jobTypeValue ||
                    !workingHoursValue ||
                    !experienceLevelsValue ||
                    !educationdegreeValue ||
                    !minExperienceValue ||
                    !maxExperiencesValue ||
                    !minSalaryValue ||
                    !maxSalaryValue ||
                    !workingTimesValue ||
                    !descriptionValue ||
                    !weekendRequiredValue ||
                    !languageValue
                  ) {
                    setError("All fields are required");
                  } else if (!isPhoneNumberNum || phoneNumberValue < 0) {
                    setError("Phone number must be a positive number");
                  } else if (!isNumberHiringNum || numberHiringValue < 0) {
                    setError("Number of hiring must be a positive number");
                  } else if (!isWorkingHoursNum || workingHoursValue < 0) {
                    setError("Minimum working hours must be a positive number");
                  } else if (
                    !isMinExperienceNum ||
                    !isMaxExperiencesNum ||
                    minExperienceValue < 0 ||
                    maxExperiencesValue < 0
                  ) {
                    setError(
                      "Minimum and maximum years of experience must be positive numbers"
                    );
                  } else if (
                    parseInt(maxExperiencesValue) <=
                    parseInt(minExperienceValue)
                  ) {
                    setError(
                      "Maximum years of experience cannot be less than minimum years of experience"
                    );
                  } else if (
                    !isMinSalaryNum ||
                    !isMaxSalaryNum ||
                    minSalaryValue < 0 ||
                    maxSalaryValue < 0
                  ) {
                    setError(
                      "Minimum and maximum salary must be positive numbers"
                    );
                  } else if (
                    parseInt(maxSalaryValue) <= parseInt(minSalaryValue)
                  ) {
                    setError(
                      "Maximum salary cannot be less than minimum salary"
                    );
                  } else {
                    actions
                      .editjobs(
                        jobIdParam,
                        companyNameValue,
                        companyLogo,
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
                    setError("");
                  }
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        "please log in to"
      )}
    </div>
  );
};
