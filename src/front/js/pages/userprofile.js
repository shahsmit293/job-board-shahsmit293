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

export const UserProfile = () => {
  const [viewContact, SetViewContact] = useState(true);
  const [viewResume, SetViewResume] = useState(false);
  const [viewQualification, SetViewQualification] = useState(false);
  const [viewPreference, SetViewPreference] = useState(false);
  const [viewAdditional, SetViewAdditional] = useState(false);

  const [file, setFile] = useState(null); // Create a state variable for the file
  const { store, actions } = useContext(Context); // Access your Flux actions
  const navigate = useNavigate("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the file state when a file is selected
  };

  useEffect(() => {
    actions.downloadResume(store.activejobseeker);
    actions.getresumedetail(store.activejobseeker);
    actions.getusereducation(store.activejobseeker);
  }, []);

  return (
    <div className="profile">
      <div className="sidebar">
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(true);
            SetViewQualification(false);
            SetViewPreference(false);
            SetViewAdditional(false);
          }}
        >
          Contact Information
        </button>
        <button
          onClick={() => {
            SetViewResume(true);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewPreference(false);
            SetViewAdditional(false);
          }}
        >
          My Reume
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(true);
            SetViewPreference(false);
            SetViewAdditional(false);
          }}
        >
          Qualification
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewPreference(true);
            SetViewAdditional(false);
          }}
        >
          My preference
        </button>
        <button
          onClick={() => {
            SetViewResume(false);
            SetViewContact(false);
            SetViewQualification(false);
            SetViewPreference(false);
            SetViewAdditional(true);
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
                      .adduserresume(store.activejobseeker, file)
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
          store.usereducation &&
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
            />
          ))}

        {viewPreference && <UserPreference />}
        {viewAdditional && <UserAdditionalInfo />}
      </div>
    </div>
  );
};
