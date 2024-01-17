import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/jobcard.css";

export const JobCard = (props) => {
  const { store, actions } = useContext(Context);
  const [viewsave, setsave] = useState("");
  const [viewunsave, setunsave] = useState("");
  const handleSave = async () => {
    await actions.addusersavedjob(store.user.id, props.jobid);
    setsave("none");
    setunsave("inline");
  };

  const handleUnsave = async () => {
    await actions.deletesavedjobs(store.user.id, props.jobid);
    setunsave("none");
    setsave("inline");
  };
  const navigate = useNavigate("");
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <b>{props.jobtitlename}</b>
          </h5>
          <p className="card-text">
            {props.Company}, {props.Location}
          </p>
          <p className="card-text">
            {props.Jobtype},{props.worktype},{props.shift}
          </p>
          <p className="card-text">{props.experiencelevel}</p>
          <p className="card-text">
            ${props.salary.min}-{props.salary.max} per Year
          </p>
          <p className="card-text">Posted {props.dateposted}</p>
        </div>
        <div className="jobbuttons">
          <button
            onClick={() => {
              actions.viewjob(props.viewid).then(() => props.onViewClick());
            }}
          >
            View
          </button>
          <button
            style={{
              display: props.displayapplied,
            }}
            onClick={() => navigate(`/userchat/${props.jobid}`)}
          >
            chat
          </button>
          {store.user.id ? (
            <div>
              <button
                style={{
                  display: viewsave || props.display,
                }}
                onClick={handleSave}
              >
                <i class="far fa-bookmark"></i>
              </button>
              <button
                style={{ display: viewunsave || props.displayunsave }}
                onClick={handleUnsave}
              >
                Unsave
              </button>
              <p
                className="correctsign"
                style={{
                  backgroundColor: "#009879",
                  display: props.displayapplied,
                }}
              >
                <i class="far fa-check-circle"></i>
              </p>
            </div>
          ) : null}
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
  onViewClick: PropTypes.func,
  jobid: PropTypes.number,
  display: PropTypes.string,
  displayunsave: PropTypes.string,
  displayapplied: PropTypes.string,
  dateposted: PropTypes.func,
  worktype: PropTypes.string,
  experiencelevel: PropTypes.string,
  shift: PropTypes.string,
  salary: PropTypes.object,
};
