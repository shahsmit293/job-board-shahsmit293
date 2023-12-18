import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ReceivedApplicants = (props) => {
  return (
    <div>
      <div className="applicants">
        <p>name: {props.applicantname}</p>
        <p>email: {props.applicantemail}</p>
        <p>phone number: {props.applicantphonenumber}</p>
        <button>view profile</button>
        <button>download resume</button>
        <button>Bookmark</button>
        <button>chat</button>
      </div>
    </div>
  );
};

ReceivedApplicants.PropTypes = {
  applicantname: PropTypes.string,
  applicantemail: PropTypes.string,
  applicantphonenumber: PropTypes.string,
};
