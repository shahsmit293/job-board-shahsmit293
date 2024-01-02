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
    <div>
      <div className="applicants">
        <div className="jobtitle">
          <p>{props.name}</p>
        </div>
        <div className="experience">
          {props.experience &&
            props.experience.map((item, index) => {
              return <p key={index}>{item.company_name}</p>;
            })}
        </div>
        <div className="education">
          {props.education &&
            props.education.map((item, index) => {
              return <p key={index}>{item.collage_name}</p>;
            })}
        </div>
        <button
          onClick={() => {
            props.onViewClick();
            actions.getprofile(props.userid);
          }}
        >
          view profile
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
        <hr />
      </div>
    </div>
  );
};

Usersearchprofilecard.PropTypes = {
  name: PropTypes.string,
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
