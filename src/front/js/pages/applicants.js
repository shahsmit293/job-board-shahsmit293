import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { ReceivedApplicants } from "../component/receivedapplicants";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ViewApplicantProfile } from "./viewapplicantprofile";
import "../../styles/home.css";
export const Applicants = () => {
  const { jobid } = useParams();
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);

  let job_id = parseInt(jobid);
  const [loading, setLoading] = useState(true);
  const [showallapplicants, setallapplicants] = useState(true);
  const [showssavedapplicants, setsavedapplicants] = useState(false);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        await actions.getallapplicants(job_id);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchApplicants();
    actions.getemployersaveduser(job_id);
  }, [store.employer]);

  const displaysave = (id, userid) => {
    let employersavedusers = Array.isArray(store.employersavedusers)
      ? store.employersavedusers
      : [];
    return employersavedusers.some((item) => item.user_id === userid)
      ? "none"
      : "inline";
  };

  const displayunsave = (id, userid) => {
    let employersavedusers = Array.isArray(store.employersavedusers)
      ? store.employersavedusers
      : [];
    return employersavedusers.some((item) => item.user_id === userid)
      ? "inline"
      : "none";
  };
  const handleViewClick = () => {
    setShowPopup(true);
  };
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setallapplicants(true);
            setsavedapplicants(false);
          }}
        >
          All Applicants
        </button>
        <button
          onClick={() => {
            setsavedapplicants(true);
            setallapplicants(false);
          }}
        >
          Saved Applicants
        </button>
      </div>
      {showallapplicants &&
        (loading ? (
          <p>Loading applicants...</p> // Display a loading message or a spinner
        ) : store.applicants.length === 0 ? (
          <p>No applicant yet</p>
        ) : (
          <div className="list of applicants">
            {Array.isArray(store.applicants) &&
              store.applicants.map((item, index) => {
                return (
                  <ReceivedApplicants
                    key={index}
                    applicantname={item.user.user_bio.first_name}
                    applicantemail={item.user.user_bio.email}
                    applicantphonenumber={item.user.user_bio.phone_number}
                    userid={item.user_id}
                    jobid={item.job_id}
                    employerid={item.employer_id}
                    displaysave={displaysave(item.job_id, item.user_id)}
                    displayunsave={displayunsave(item.job_id, item.user_id)}
                    onViewClick={handleViewClick}
                  />
                );
              })}
          </div>
        ))}

      {showssavedapplicants &&
        (loading ? (
          <p>Loading applicants...</p> // Display a loading message or a spinner
        ) : store.employersavedusers.length === 0 ? (
          <p>No profile saved yet.</p>
        ) : (
          <div className="list of applicants">
            {Array.isArray(store.employersavedusers) &&
              store.employersavedusers.map((item, index) => {
                return (
                  <ReceivedApplicants
                    key={index}
                    applicantname={item.userbio.first_name}
                    applicantemail={item.userbio.user.email}
                    applicantphonenumber={item.userbio.phone_number}
                    userid={item.user_id}
                    jobid={item.job_id}
                    employerid={item.employer_id}
                    displaysave={displaysave(item.job_id, item.user_id)}
                    displayunsave={displayunsave(item.job_id, item.user_id)}
                    onViewClick={handleViewClick}
                  />
                );
              })}
          </div>
        ))}
      {showPopup && (
        <div className="popup">
          <button onClick={() => setShowPopup(false)}>Close</button>
          <ViewApplicantProfile />
        </div>
      )}
    </div>
  );
};
