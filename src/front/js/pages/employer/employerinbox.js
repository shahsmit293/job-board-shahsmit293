import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { ReceivedApplicants } from "../../component/receivedapplicants";
import { ViewApplicantProfile } from "./viewapplicantprofile";
import CryptoJS from "crypto-js";
import "../../../styles/employerinbox.css";

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
    <div className="employerinboxpage">
      {loading ? (
        <p>Loading applicants...</p>
      ) : store.contactedemployer.length === 0 ? (
        <p>No profile contacted yet.</p>
      ) : (
        <div className="employerinboxtable">
          <div className="totalcontacted">
            <p style={{ color: "blue" }}>
              Toatal Contacted:{" "}
              {store.allapplicants &&
                store.allapplicants.filter(
                  (item) =>
                    Array.isArray(store.contactedemployer) &&
                    store.contactedemployer.some(
                      (contact) => contact.user_id === item.user_id
                    )
                ).length}
            </p>
          </div>
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
