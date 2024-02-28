import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/jobcard.css";
import CryptoJS from "crypto-js";

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
    <div className="grid-item">
      <div className="card-body">
        <div className="companylogo">
          <p
            className="correctsign"
            style={{
              display: props.displayapplied,
              color: "green",
            }}
          >
            <i class="fa-solid fa-check"></i>
          </p>
          <img
            src={props.logo}
            style={{
              height: "25px",
              width: "25px",
              borderRadius: "50%",
              marginLeft: "40%",
            }}
          ></img>
        </div>
        <div className="jobtitle">
          <h5>
            <b>{props.jobtitlename}</b>
          </h5>
        </div>

        <div className="compaanylocation">
          <h5 style={{ marginRight: "5px" }}>{props.Company}</h5>
          <p>
            <i class="fa-solid fa-location-dot"></i>
            {"  "}
            {props.Location}
          </p>
        </div>
        <div className="salary">
          <p>
            <i class="fa-solid fa-money-bill-trend-up"></i>
            {"    "}$ {props.salary.min}-{props.salary.max} / Year
          </p>
        </div>
        <div className="category">
          <p className="jobtype">{props.Jobtype}</p>
          <p className="worktype">{props.worktype}</p>
          <p className="shift">{props.shift}</p>
          <p className="experiencelevel">{props.experiencelevel}</p>
        </div>
        <div className="timeapplicants">
          <p className="posted">{props.dateposted}</p>
          <p className="applicants">{props.totalapplicants} Applicants</p>
        </div>
      </div>
      <div className="postjobsbuttons">
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
          onClick={() => {
            // Encrypt element.id before navigating
            const encryptedJobId = CryptoJS.AES.encrypt(
              props.jobid.toString(),
              "secret"
            ).toString();
            const encodedJobId = encodeURIComponent(encryptedJobId);
            navigate(`/userchat/${encodedJobId}`);
          }}
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

JobCard.PropTypes = {
  jobtitlename: PropTypes.string,
  Company: PropTypes.string,
  logo: PropTypes.string,
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
  totalapplicants: PropTypes.string,
};
