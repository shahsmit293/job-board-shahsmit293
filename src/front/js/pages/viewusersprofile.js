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
        <h1 className="name">
          <b>
            <u>
              {store.viewuserprofile &&
                store.viewuserprofile.user_bio.first_name}{" "}
              {store.viewuserprofile.user_bio.last_name}
            </u>
          </b>
        </h1>
        <p className="card-text">
          {store.viewuserprofile.email} , Tel.:
          {store.viewuserprofile.user_bio.phone_number}{" "}
        </p>
        <h4 className="card-text">Education:</h4>
        {store.viewuserprofile.user_education.map((item, index) => {
          return (
            <div className="education" key={index}>
              <p>
                <h4>{item.collage_name}</h4> {item.major}, {item.degree},
                {item.location}, ({item.start_year} - {item.end_year})
              </p>
            </div>
          );
        })}
        <h4 className="card-text">Experience:</h4>
        {store.viewuserprofile.user_experience.map((item, index) => {
          return (
            <div className="experience" key={index}>
              <p>
                <h4>{item.company_name}</h4> {item.job_title}, {item.location},
                ({item.start_year} - {item.end_year})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
