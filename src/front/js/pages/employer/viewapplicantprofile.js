import React, { useEffect, useContext } from "react";
import "../../../styles/home.css";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

export const ViewApplicantProfile = () => {
  const { store, actions } = useContext(Context);
  console.log(store.viewapplicantprofile);
  if (!store.viewapplicantprofile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main">
      <div className="container">
        <h1 className="card-title">
          <b>
            {store.viewapplicantprofile.first_name}{" "}
            {store.viewapplicantprofile.last_name}
          </b>
        </h1>
        <p>
          {store.viewapplicantprofile.email},Tel:
          {store.viewapplicantprofile.phone_number},
        </p>
        <h4 className="card-text">
          <b>Education</b>:
        </h4>
        {store.viewapplicantprofile.user_education ? (
          store.viewapplicantprofile.user_education.map((item, index) => {
            return (
              <div className="education">
                <p>
                  <b>{item.collage_name}</b> {item.degree} {item.location} (
                  {item.start_year} - {item.end_year})
                </p>
              </div>
            );
          })
        ) : (
          <p>No education information available.</p>
        )}

        <h4 className="card-text">
          <b>Experience</b>:
        </h4>
        {store.viewapplicantprofile.user_experience ? (
          store.viewapplicantprofile.user_experience.map((item, index) => {
            return (
              <div className="experience">
                <p>
                  <b>{item.company_name}</b> {item.job_title} {item.location} (
                  {item.start_year} - {item.end_year})
                </p>
              </div>
            );
          })
        ) : (
          <p>No experience information available.</p>
        )}
      </div>
    </div>
  );
};
