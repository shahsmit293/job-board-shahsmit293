import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { ReceivedApplicants } from "../../component/receivedapplicants";
import { ViewApplicantProfile } from "./viewapplicantprofile";
import CryptoJS from "crypto-js";

export const Employerinbox = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const { job_id } = useParams();
  let decryptedJobId = CryptoJS.AES.decrypt(job_id, "secret").toString(
    CryptoJS.enc.Utf8
  );
  let jobIdParam = parseInt(decryptedJobId);
  const handleViewClick = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    let decryptedJobId = CryptoJS.AES.decrypt(job_id, "secret").toString(
      CryptoJS.enc.Utf8
    );
    let jobIdParam = parseInt(decryptedJobId);
    actions
      .employerinboxchats(jobIdParam)
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, [store.employer.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <div className="sidebar">
        <ul>
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
          <button
            onClick={() => {
              // Encrypt jobIdParam before navigating
              const encryptedJobId = CryptoJS.AES.encrypt(
                jobIdParam.toString(),
                "secret"
              ).toString();
              const encodedJobId = encodeURIComponent(encryptedJobId);
              navigate(`/employerinbox/${encodedJobId}`);
            }}
          >
            Inbox
          </button>
        </ul>
      </div>
      {loading ? (
        <p>Loading applicants...</p>
      ) : store.contactedemployer.length === 0 ? (
        <p>No profile saved yet.</p>
      ) : (
        <div className="text-center mt-5">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {store.allapplicants &&
                store.allapplicants
                  .filter(
                    (item) =>
                      Array.isArray(store.contactedemployer) &&
                      store.contactedemployer.some(
                        (contact) => contact.user_id === item.user_id
                      )
                  )
                  .map((item, index) => (
                    <ReceivedApplicants
                      key={index}
                      applicantname={item.user.user_bio.first_name}
                      applicantemail={item.user.email}
                      applicantphonenumber={item.user.user_bio.phone_number}
                      userid={item.user_id}
                      jobid={item.job.id}
                      employerid={item.job.employer_id}
                      displaysave={"none"}
                      displayunsave={"none"}
                      onViewClick={handleViewClick}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      )}
      {showPopup && (
        <div>
          <p className="popup">
            <button onClick={() => setShowPopup(false)}>Close</button>
            <ViewApplicantProfile />
          </p>
        </div>
      )}
    </div>
  );
};
