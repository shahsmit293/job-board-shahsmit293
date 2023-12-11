import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.css";
import { Sidebar } from "../component/sidebar";
import { Context } from "../store/appContext"; // Import your Flux context
import { useNavigate } from "react-router-dom";
import { Document, Page } from "react-pdf";

export const UserProfile = () => {
  const [file, setFile] = useState(null); // Create a state variable for the file
  const { store, actions } = useContext(Context); // Access your Flux actions
  const navigate = useNavigate("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the file state when a file is selected
  };

  useEffect(() => {
    actions.downloadResume(store.activejobseeker);
    actions.getresumedetail(store.activejobseeker);
  }, []);

  return (
    <div className="profile">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="details">
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
      </div>
    </div>
  );
};
