import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

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
              actions.viewjob(props.viewid).then(() => props.onViewClick());
            }}
          >
            View
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
                style={{
                  backgroundColor: "green",
                  display: props.displayapplied,
                }}
              >
                Applied <i class="far fa-check-circle"></i>
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
};
