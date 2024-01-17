import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { ReceivedApplicants } from "../../component/receivedapplicants";
import { ViewApplicantProfile } from "./viewapplicantprofile";

export const Employerinbox = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { job_id } = useParams();

  const handleViewClick = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    actions
      .employerinboxchats(job_id)
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, [store.employer.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      {store.contactedemployer && store.contactedemployer.length === 0 && (
        <p>No chat initiated yet</p>
      )}
      {showPopup && (
        <div className="popup">
          <button onClick={() => setShowPopup(false)}>Close</button>
          <ViewApplicantProfile />
        </div>
      )}
    </div>
  );
};
