import React, { useContext, useEffect, useState } from "react";
import "../../../styles/home.css";
import { ReceivedApplicants } from "../../component/receivedapplicants";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { ViewApplicantProfile } from "./viewapplicantprofile";
import CryptoJS from "crypto-js";
export const Applicants = () => {
  const { jobid } = useParams();
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(true);
  const [showallapplicants, setallapplicants] = useState(true);
  const [showssavedapplicants, setsavedapplicants] = useState(false);
  let decryptedJobId = CryptoJS.AES.decrypt(jobid, "secret").toString(
    CryptoJS.enc.Utf8
  );
  let jobIdParam = parseInt(decryptedJobId);
  useEffect(() => {
    // Decrypt and decode jobid from URL
    let decryptedJobId = CryptoJS.AES.decrypt(jobid, "secret").toString(
      CryptoJS.enc.Utf8
    );
    let jobIdParam = parseInt(decryptedJobId);
    console.log(jobIdParam);
    actions.getemployersaveduser(jobIdParam);
    const fetchApplicants = async () => {
      try {
        await actions.getemployersaveduser(jobIdParam);
        await actions.allapplicant(jobIdParam);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [store.employer.id]);

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
      {showallapplicants &&
        (loading ? (
          <p>Loading allapplicants...</p> // Display a loading message or a spinner
        ) : store.allapplicants.length === 0 ? (
          <p>No applicant yet</p>
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
                {Array.isArray(store.allapplicants) &&
                  store.allapplicants.map((item, index) => {
                    return (
                      <ReceivedApplicants
                        key={index}
                        applicantname={item.first_name}
                        applicantemail={item.email}
                        applicantphonenumber={item.phone_number}
                        userid={item.user_id}
                        jobid={item.job.id}
                        employerid={item.job.employer_id}
                        displaysave={displaysave(item.job.id, item.user_id)}
                        displayunsave={displayunsave(item.job.id, item.user_id)}
                        onViewClick={handleViewClick}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        ))}

      {showssavedapplicants &&
        (loading ? (
          <p>Loading applicants...</p> // Display a loading message or a spinner
        ) : store.employersavedusers.length === 0 ? (
          <p>No profile saved yet.</p>
        ) : (
          <div className="list of applicants">
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
                {Array.isArray(store.employersavedusers) &&
                  store.allapplicants
                    .filter((item) =>
                      store.employersavedusers.map(
                        (itemnew) => item.user_id == itemnew.user_id
                      )
                    )
                    .map((item, index) => {
                      return (
                        <ReceivedApplicants
                          key={index}
                          applicantname={item.first_name}
                          applicantemail={item.email}
                          applicantphonenumber={item.phone_number}
                          userid={item.user_id}
                          jobid={item.job_id}
                          employerid={item.employer_id}
                          displaysave={displaysave(item.job_id, item.user_id)}
                          displayunsave={displayunsave(
                            item.job_id,
                            item.user_id
                          )}
                          onViewClick={handleViewClick}
                        />
                      );
                    })}
              </tbody>
            </table>
          </div>
        ))}
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
