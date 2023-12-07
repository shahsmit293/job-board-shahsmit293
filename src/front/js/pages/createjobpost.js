import React, { useContext } from "react";
import "../../styles/home.css";
import { EmployerSidebar } from "../component/employersidebar";
import { Context } from "../store/appContext";

export const EmployerCreateJobPost = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="text-center mt-5">
      {store.accessToken ? (
        <div>
          <div className="sidebar">
            <EmployerSidebar />
          </div>
          <form>
            <label htmlFor="companyName">Company Name</label>
            <input type="text" id="companyName" name="companyName" required />
            <br />
            <label htmlFor="companyLogo">Company Logo:</label>
            <input type="file" id="companyLogo" name="companyLogo" />
            <br />
            <label htmlFor="firstName">First Name (mandatory):</label>
            <input type="text" id="firstName" name="firstName" required="" />
            <br />
            <label htmlFor="lastName">Last Name (mandatory):</label>
            <input type="text" id="lastName" name="lastName" required="" />
            <br />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" />
            <br />
            <label htmlFor="companyEmail">Company Email (mandatory):</label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              required=""
            />
            <br />
            <label htmlFor="jobTitle">Job Title (mandatory):</label>
            <input type="text" id="jobTitle" name="jobTitle" required="" />
            <br />
            <label htmlFor="numberHiring">Number Hiring (mandatory):</label>
            <input
              type="number"
              id="numberHiring"
              name="numberHiring"
              required=""
            />
            <br />
            <label htmlFor="workLocationType">Work Location Type</label>
            <select id="workLocationType" name="workLocationType" required>
              <option value="">Select...</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
            <br />
            <label htmlFor="jobType">Job Type</label>
            <select id="jobType" name="jobType" required>
              <option value="">Select...</option>
              <option value="Remote">Full Time</option>
              <option value="Hybrid">Part Time</option>
              <option value="Onsite">Temporary</option>
              <option value="Onsite">Contract</option>
            </select>
            <br />
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" />
            <br />
            <label htmlFor="workingHours">Working Hours:</label>
            <input type="text" id="workingHours" name="workingHours" />
            <br />
            <label htmlFor="Experience Level">Experience Level</label>
            <select id="Experience Level" name="Experience Level" required>
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
            <input type="number" id="minExperience" name="minExperience" />
            <br />
            <label htmlFor="maxExperience">Maximum Year Experience:</label>
            <input type="number" id="maxExperience" name="maxExperience" />
            <br />
            <label htmlFor="minSalary">Minimum Salary:</label>
            <input type="number" id="minSalary" name="minSalary" />
            <br />
            <label htmlFor="maxSalary">Maximum Salary:</label>
            <input type="number" id="maxSalary" name="maxSalary" />
            <br />
            <label htmlFor="Working Times">Working Times</label>
            <select id="Working Times" name="Working Times">
              <option value="">Select...</option>
              <option value="Day Shift">Day Shift</option>
              <option value="Night Shift">Night Shift</option>
              <option value="Afternoon Shift">Afternoon Shift</option>
            </select>
            <br />
            <label htmlFor="resumeRequired">Resume Required:</label>
            <input type="checkbox" id="resumeRequired" name="resumeRequired" />
            <br />
            <label htmlFor="Weekend Required">Weekend Required</label>
            <select id="Weekend Required" name="Weekend Required">
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionaly">Occasionaly</option>
            </select>
            <br />
            <label htmlFor="language">Language:</label>
            <input type="text" id="language" name="language" />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" defaultValue={""} />
            <br />
            <input type="submit" defaultValue="Submit" />
          </form>
        </div>
      ) : (
        "error"
      )}
    </div>
  );
};
