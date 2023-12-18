import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const ViewJobPage = (props) => {
  // const {viewid} = useParams();
  // let id = parseInt(viewid);
  const { store, actions } = useContext(Context);
  // useEffect(() => {
  //   actions.viewjob(props.id);
  // }, []);
  console.log(store.currentviewjobpost);
  if (!store.currentviewjobpost) {
    return <div>Loading...</div>; // or some other placeholder
  }
  return (
    <div className="main">
      <div className="container">
        <h5 className="card-title">
          <b>JOB TITITLE:{store.currentviewjobpost.job_title}</b>
        </h5>
        <p className="card-text">COMPANY NAME:</p>
        <p className="card-text">LOCATION:</p>
        <p className="card-text">JOBTYPE</p>
        <button
          style={{
            display:
              Array.isArray(store.userappliedjobs) &&
              store.userappliedjobs.some(
                (item) => item.job_id === store.currentviewjobpost.id
              )
                ? "none"
                : "inline",
          }}
          onClick={() =>
            actions.adduserappliedjob(
              store.user.id,
              store.currentviewjobpost.id,
              store.currentviewjobpost.employer_id
            )
          }
        >
          Apply now
        </button>
      </div>
    </div>
  );
};

ViewJobPage.PropTypes = {
  id: PropTypes.number,
  displayapply: PropTypes.string,
};
