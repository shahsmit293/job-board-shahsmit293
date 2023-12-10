import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const ViewJobPost = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="main">
      {store.seepostjobs
        .filter((item) => {
          return item.id == props.viewid;
        })
        .map((item) => {
          return (
            <div className="container">
              <h5 className="card-title">
                <b>JOB TITITLE:{item.job_title}</b>
              </h5>
              <p className="card-text">COMPANY NAME:</p>
              <p className="card-text">LOCATION:</p>
              <p className="card-text">JOBTYPE</p>
            </div>
          );
        })}
    </div>
  );
};

ViewJobPost.PropTypes = {
  viewid: PropTypes.number,
};
