import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/employerhomepage.css";
import { EmployerSidebar } from "../component/employersidebar";
import { ViewJobPost } from "./employer/viewjobpost";
import { useNavigate } from "react-router-dom";

export const EmployerHome = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate("");

  useEffect(() => {
    actions.watchjobpost(store.employer.id);
  }, [store.employer.id]);

  const handleViewClick = (jobId) => {
    setSelectedJob(jobId);
    setShowPopup(true);
  };

  return (
    <div className="page">
      <div className="sidebar">
        <EmployerSidebar />
      </div>
      <div className="row gy-3 mt-4">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.seepostjobs && store.seepostjobs.length > 0 ? (
              store.seepostjobs.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <td>{element.job_title}</td>
                    <td>{element.company_name}</td>
                    <td>{element.location}</td>
                    <td>
                      <button
                        className="styled-button"
                        onClick={() => handleViewClick(element.id)}
                      >
                        PreView
                      </button>
                      <button
                        className="styled-button"
                        onClick={() => navigate(`/editpost/${element.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="styled-button"
                        onClick={() => actions.deleteJob(element.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="styled-button"
                        onClick={() => {
                          store.allapplicants = [];
                          actions.getallapplicants(element.id);
                          navigate(`/applicants/${element.id}`);
                          actions.getemployersaveduser(element.id);
                        }}
                      >
                        Applicants
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No jobs posted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
        {showPopup && (
          <div>
            <p className="popup">
              <button
                className="styled-button"
                onClick={() => setShowPopup(false)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
              <ViewJobPost viewid={selectedJob} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
