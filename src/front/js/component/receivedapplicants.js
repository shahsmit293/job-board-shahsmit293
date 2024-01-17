import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ReceivedApplicants = (props) => {
  const { store, actions } = useContext(Context);
  const [viewsave, setsave] = useState("");
  const [viewunsave, setunsave] = useState("");
  const navigate = useNavigate("");
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
    <div className="row gy-3 mt-4">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.applicantname &&
          props.applicantemail &&
          props.applicantphonenumber ? (
            <tr>
              <td>{props.applicantname}</td>
              <td>{props.applicantemail}</td>
              <td>{props.applicantphonenumber}</td>
              <td>
                <button
                  onClick={() => {
                    props.onViewClick();
                    actions.getprofile(props.userid);
                  }}
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    actions
                      .downloadsentResumeForEmployer(props.userid, props.jobid)
                      .catch((error) => {
                        if (error.message === "HTTP error! status: 400") {
                          actions.downloaddefaultResumeForEmployer(
                            props.userid
                          );
                        }
                      });
                  }}
                >
                  Download Resume
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
                <button
                  onClick={() =>
                    navigate(`/employerchat/${props.userid}/${props.jobid}`)
                  }
                >
                  Chat
                </button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="4">No applicant information available.</td>
            </tr>
          )}
        </tbody>
      </table>
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
