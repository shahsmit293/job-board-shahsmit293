import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/viewuserprofile.css";

export const Viewusersprofile = () => {
  const { store, actions } = useContext(Context);
  console.log(store.viewuserprofile);
  if (!store.viewuserprofile || !store.viewuserprofile.user_bio) {
    return <div>Loading...</div>;
  }
  return (
    <div className="viewuserprofilepage">
      <div className="userprofile">
        <h1 className="name">
          <b>
            {store.viewuserprofile && store.viewuserprofile.user_bio.first_name}{" "}
            {store.viewuserprofile.user_bio.last_name}
          </b>
        </h1>
        <p className="card-text">
          {store.viewuserprofile.email} , Tel.:
          {store.viewuserprofile.user_bio.phone_number},
          {store.viewuserprofile.user_bio.location}
        </p>
        <h4 className="card-text">
          <b>Education</b>:
        </h4>
        {store.viewuserprofile.user_education.map((item, index) => {
          return (
            <div className="vieweducation" key={index}>
              <p>
                <h4>{item.collage_name}</h4> {item.major}, {item.degree},
                {item.location}, ({item.start_year} - {item.end_year})
              </p>
            </div>
          );
        })}
        <h4 className="card-text">
          <b>Experience</b>:
        </h4>
        {store.viewuserprofile.user_experience.map((item, index) => {
          return (
            <div className="viewexperience" key={index}>
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
