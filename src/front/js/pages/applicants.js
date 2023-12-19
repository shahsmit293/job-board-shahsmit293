import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { ReceivedApplicants } from "../component/receivedapplicants";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
export const Applicants = () => {
  const { jobid } = useParams();
  const { store, actions } = useContext(Context);
  let job_id = parseInt(jobid);
  const [loading, setLoading] = useState(true);
  const [showallapplicants, setallapplicants] = useState(true);
  const [showssavedapplicants, setsavedapplicants] = useState(false);
  useEffect(() => {
    actions.getallapplicants(job_id).then(() => {
      setLoading(false);
    });
    console.log(store.applicants);
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
        ) : (
          <div className="list of applicants">
            {store.applicants.map((item, index) => {
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
                  />
                );
              })}
          </div>
        ))}
    </div>
  );
};
