import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Usersearchprofilecard = (props) => {
  const { store, actions } = useContext(Context);
  const [viewsave, setsave] = useState("");
  const [viewunsave, setunsave] = useState("");
  const [viewcontact, setcontact] = useState("");
  const [viewuncontact, setuncontact] = useState("");

  const handleSave = async () => {
    await actions.addsaveduserprofiles(store.employer.id, props.userid);
    actions.getsaveduserprofiles(store.employer.id);
    setsave("none");
    setunsave("inline");
  };

  const handleUnsave = async () => {
    await actions.deletesaveduserprofiles(store.employer.id, props.userid);
    actions.getsaveduserprofiles(store.employer.id);
    setunsave("none");
    setsave("inline");
  };
  const handlecontacted = async () => {
    await actions.addcontacteduserprofiles(store.employer.id, props.userid);
    actions.getcontacteduserprofiles(store.employer.id);
    setcontact("none");
    setuncontact("inline");
  };
  const handleuncontacted = async () => {
    await actions.deletecontacteduserprofiles(store.employer.id, props.userid);
    actions.getcontacteduserprofiles(store.employer.id);
    setuncontact("none");
    setcontact("inline");
  };
  return (
    <>
      {props.name && props.experience && props.education ? (
        <tr>
          <td>{props.name}</td>
          <td>
            {props.experience.map((item, index) => (
              <p key={index}>{item.job_title}</p>
            ))}
          </td>
          <td>
            {props.education.map((item, index) => (
              <p key={index}>{item.degree}</p>
            ))}
          </td>
          <td>
            <p>{props.location}</p>
          </td>
          <td>
            <button
              onClick={() => {
                props.onViewClick();
                actions.getuserprofile(props.userid);
              }}
            >
              View Profile
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
              style={{ display: viewcontact || props.displaycontact }}
              onClick={handlecontacted}
            >
              Mark As Contacted
            </button>
            <button
              style={{
                backgroundColor: "green",
                display: viewuncontact || props.displayuncontact,
              }}
              onClick={handleuncontacted}
            >
              Marks As Uncontact
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan="4">No applicant information available.</td>
        </tr>
      )}
    </>
  );
};

Usersearchprofilecard.PropTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  education: PropTypes.array,
  experience: PropTypes.array,
  userid: PropTypes.number,
  employerid: PropTypes.number,
  displaysave: PropTypes.string,
  displayunsave: PropTypes.string,
  displaycontact: PropTypes.string,
  displayuncontact: PropTypes.string,
  onViewClick: PropTypes.func,
};
