import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { EmployerSidebar } from "../component/employersidebar";
import { ReceivedApplicants } from "../component/receivedapplicants";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { element } from "prop-types";
export const Applicants = () => {
  const { jobid } = useParams();
  const { store, actions } = useContext(Context);
  let job_id = parseInt(jobid);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    actions.getallapplicants(job_id).then(() => {
      setLoading(false);
    });
    console.log(store.applicants);
  }, [store.employer]);
  return (
    <div>
      {loading ? (
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
