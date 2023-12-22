import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ReceivedApplicants = (props) => {
  const { store, actions } = useContext(Context);
  const [viewsave, setsave] = useState("");
  const [viewunsave, setunsave] = useState("");
  const handleSave = async () => {
    await actions.addemployersaveduser(
      props.employerid,
      props.userid,
      props.jobid
    );
    window.location.reload();
    setsave("none");
    setunsave("inline");
  };

  const handleUnsave = async () => {
    await actions.deleteemployersaveduser(props.userid, props.jobid);
    setunsave("none");
    setsave("inline");
  };
  return (
    <div>
      <div className="applicants">
        <p>name: {props.applicantname}</p>
        <p>email: {props.applicantemail}</p>
        <p>phone number: {props.applicantphonenumber}</p>
        <button
          onClick={() => {
            props.onViewClick();
            actions.getviewapplicantprofile(props.userid);
          }}
        >
          view profile
        </button>
        <button onClick={() => actions.downloadResumeForEmployer(props.userid)}>
          download resume
        </button>
        <button
          style={{ display: viewsave || props.displaysave }}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          style={{ display: viewunsave || props.displayunsave }}
          onClick={handleUnsave}
        >
          Unsave
        </button>
        <button>chat</button>
      </div>
    </div>
  );
};

ReceivedApplicants.PropTypes = {
  applicantname: PropTypes.string,
  applicantemail: PropTypes.string,
  applicantphonenumber: PropTypes.string,
  userid: PropTypes.number,
  jobid: PropTypes.number,
  employerid: PropTypes.number,
  displaysave: PropTypes.string,
  displayunsave: PropTypes.string,
  onViewClick: PropTypes.func,
};
