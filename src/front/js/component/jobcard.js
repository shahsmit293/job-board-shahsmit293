import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ViewJobPage } from "../pages/viewjobpage";
import { Context } from "../store/appContext";

export const JobCard = (props) => {
  const navigate = useNavigate("");
  const { store, actions } = useContext(Context);
  // const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div className="card">
        <img
          className="card-img-top"
          src={props.image}
          alt="Card image cap"
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
        <div className="container">
          <h5 className="card-title">
            <b>{props.jobtitlename}</b>
          </h5>
          <p className="card-text">{props.Company}</p>
          <p className="card-text">{props.Location}</p>
          <p className="card-text">{props.Jobtype}</p>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              actions
                .viewjob(props.viewid)
                .then(() => props.onViewClick(props.viewid));
            }}
          >
            View
          </button>
          {/* {showPopup && (
            <div className="popup">
              <button onClick={() => setShowPopup(false)}>Close</button>
              <ViewJobPage viewid={props.viewid} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

JobCard.PropTypes = {
  jobtitlename: PropTypes.string,
  Company: PropTypes.string,
  Location: PropTypes.string,
  Jobtype: PropTypes.number,
  viewid: PropTypes.number,
};
