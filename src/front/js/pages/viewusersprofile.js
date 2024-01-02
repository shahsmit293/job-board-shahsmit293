import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Viewusersprofile = () => {
  const { store, actions } = useContext(Context);
  console.log(store.viewuserprofile);
  if (!store.viewuserprofile || !store.viewuserprofile.user_bio) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main">
      <div className="container">
        <h5 className="card-title">
          <b>
            first name:
            {store.viewuserprofile && store.viewuserprofile.user_bio.first_name}
          </b>
        </h5>
        <p className="card-text">
          Last NAME:{store.viewuserprofile.user_bio.last_name}
        </p>
        <p className="card-text">
          Phone number:{store.viewuserprofile.user_bio.phone_number}
        </p>
        <p className="card-text">Email:{store.viewuserprofile.email}</p>
        <p className="card-text">Education:</p>
        {store.viewuserprofile.user_education.map((item, index) => {
          return (
            <div className="education" key={index}>
              <p>
                <b>{item.collage_name}</b> {item.degree} {item.location} (
                {item.start_year} - {item.end_year})
              </p>
            </div>
          );
        })}
        <p className="card-text">Experience:</p>
        {store.viewuserprofile.user_experience.map((item, index) => {
          return (
            <div className="experience" key={index}>
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
