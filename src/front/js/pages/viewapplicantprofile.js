import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
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
        <h5 className="card-title">
          <b>first name:{store.viewapplicantprofile.user_bio.first_name}</b>
        </h5>
        <p className="card-text">
          Last NAME:{store.viewapplicantprofile.user_bio.last_name}
        </p>
        <p className="card-text">Education:</p>
        {store.viewapplicantprofile.user_education.map((item, index) => {
          return (
            <div className="education">
              <p>
                <b>{item.collage_name}</b> {item.degree} {item.location} (
                {item.start_year} - {item.end_year})
              </p>
            </div>
          );
        })}
        <p className="card-text">Experience:</p>
        {store.viewapplicantprofile.user_experience.map((item, index) => {
          return (
            <div className="experience">
              <p>
                <b>{item.company_name}</b> {item.job_title} {item.location} (
                {item.start_year} - {item.end_year})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
