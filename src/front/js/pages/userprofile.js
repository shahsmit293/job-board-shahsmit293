import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";
import { Context } from "../store/appContext"; // Import your Flux context
import { useNavigate } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { UserContactInfo } from "./usercontactinfo";
import { UserQualification } from "./userqualification";
import { UserPreference } from "./userpreference";
import { UserAdditionalInfo } from "./useradditionalinfo";
import { UserExperience } from "./userexperience";
import { Userskill } from "./userskill";

export const UserProfile = () => {
  const [viewContact, SetViewContact] = useState(true);
  const [viewResume, SetViewResume] = useState(false);
  const [viewQualification, SetViewQualification] = useState(false);
  const [viewExperience, SetViewExperience] = useState(false);
  const [viewPreference, SetViewPreference] = useState(false);
  const [viewAdditional, SetViewAdditional] = useState(false);
  const [viewSkill, SetViewSkill] = useState(false);

  const [file, setFile] = useState(null); // Create a state variable for the file
  const { store, actions } = useContext(Context); // Access your Flux actions
  const navigate = useNavigate("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the file state when a file is selected
  };

  useEffect(() => {
    actions.downloadResume(store.user.id);
    actions.getresumedetail(store.user.id);
    actions.getusereducation(store.user.id);
    actions.getuserexperience(store.user.id);
    actions.getuserskill(store.user.id);
  }, [store.user.id]);

  return (
    <div className="profile">
      <div className="sidebar">
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(true);
            SetViewQualification(false);
            SetViewExperience(false);
            SetViewPreference(false);
            SetViewAdditional(false);
            SetViewSkill(false);
          }}
        >
          Contact Information
        </button>
        <button
          onClick={() => {
            SetViewResume(true);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewExperience(false);
            SetViewPreference(false);
            SetViewAdditional(false);
            SetViewSkill(false);
          }}
        >
          My Reume
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(true);
            SetViewExperience(false);
            SetViewPreference(false);
            SetViewAdditional(false);
            SetViewSkill(false);
          }}
        >
          Qualification
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewExperience(true);
            SetViewPreference(false);
            SetViewAdditional(false);
            SetViewSkill(false);
          }}
        >
          My Experience
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewExperience(false);
            SetViewPreference(false);
            SetViewAdditional(false);
            SetViewSkill(true);
          }}
        >
          My Skill
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewExperience(false);
            SetViewPreference(true);
            SetViewAdditional(false);
            SetViewSkill(false);
          }}
        >
          My preference
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewExperience(false);
            SetViewPreference(false);
            SetViewAdditional(true);
            SetViewSkill(false);
          }}
        >
          Additional Information
        </button>
      </div>
      <div className="details">
        {viewResume && (
          <div className="resume">
            {!store.resume_detail ? (
              <>
                <label>Resume</label>
                <input type="file" onChange={handleFileChange}></input>
                <button
                  onClick={() => {
                    actions
                      .adduserresume(store.user.id, file)
                      .then(navigate("/"));
                  }}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                {store.resume_detail.map((item) => {
                  return (
                    <div key={item.id}>
                      <h4>{item.resume_name}</h4>
                      <button onClick={() => window.open(store.resumeUrl)}>
                        Download
                      </button>
                      <button
                        onClick={() => {
                          actions.deleteresume(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
        {viewContact && (
          <UserContactInfo
            firstname={store.userbio && store.userbio.first_name}
            lastname={store.userbio && store.userbio.last_name}
            location={store.userbio && store.userbio.location}
            phonenumber={store.userbio && store.userbio.phone_number}
          />
        )}
        {viewQualification &&
          (!Array.isArray(store.usereducation) ||
          store.usereducation.length === 0 ? (
            <UserQualification />
          ) : (
            store.usereducation.map((education, index) => (
              <UserQualification
                key={index}
                collagename={education.collage_name}
                startyear={education.start_year}
                endyear={education.end_year}
                gpa={education.gpa}
                major={education.major}
                degree={education.degree}
                location={education.location}
                id={education.id}
                track={index}
                deleteid={education.id}
              />
            ))
          ))}
        {viewExperience &&
          (!Array.isArray(store.userexperience) ||
          store.userexperience.length === 0 ? (
            <UserExperience />
          ) : (
            store.userexperience.map((education, index) => (
              <UserExperience
                key={index}
                jobtitle={education.job_title}
                companyname={education.company_name}
                jobtype={education.job_type}
                startyear={education.start_year}
                endyear={education.end_year}
                description={education.description}
                location={education.location}
                id={education.id}
                track={index}
                deleteid={education.id}
              />
            ))
          ))}
        {viewSkill &&
          (!Array.isArray(store.userskill) || store.userskill.length === 0 ? (
            <Userskill />
          ) : (
            store.userskill.map((skills, index) => (
              <Userskill
                key={index}
                skillname={skills.skill}
                skillyear={skills.skill_year}
                id={skills.id}
                track={index}
                deleteid={skills.id}
              />
            ))
          ))}
        {viewPreference && <UserPreference />}
        {viewAdditional && <UserAdditionalInfo />}
      </div>
    </div>
  );
};
