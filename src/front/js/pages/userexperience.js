import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";

export const UserExperience = (props) => {
  const { store, actions } = useContext(Context);

  const [showexperiencedetails, setshowexperiencedetails] = useState(true);
  const [addexperience, setaddexperience] = useState(false);
  const [editexperienceform, seteditexperienceform] = useState(false);

  const [valueJobtitle, setJobtitle] = useState(
    props.jobtitle ? props.jobtitle : ""
  );
  const [valueCompanyname, setCompanyname] = useState(
    props.companyname ? props.companyname : ""
  );
  const [valuejobtype, setJobtype] = useState(
    props.jobtype ? props.jobtype : ""
  );
  const [valueStartyear, setStartyear] = useState(
    props.startyear ? props.startyear : ""
  );
  const [valueEndyear, setEndyear] = useState(
    props.endyear ? props.endyear : ""
  );
  const [valueDescription, setDescription] = useState(
    props.description ? props.description : ""
  );
  const [valueLocation, setLocation] = useState(
    props.location ? props.location : ""
  );

  const [addvalueJobtitle, setaddjobtitle] = useState("");
  const [addvalueCompanyname, setaddcompanyname] = useState("");
  const [addvaluejobtype, setaddjobtype] = useState("");
  const [addvalueStartyear, setaddstartyear] = useState("");
  const [addvalueEndyear, setaddendyear] = useState("");
  const [addvalueDescription, setadddescription] = useState("");
  const [addvalueLocation, setaddLocation] = useState("");
  return (
    <div className="experienceinfo">
      {showexperiencedetails && (
        <div className="details">
          {props.track == 0 ? (
            <button
              onClick={() => {
                setshowexperiencedetails(false);
                setaddexperience(true);
              }}
            >
              Add
            </button>
          ) : null}
          <h4>JOB TITLE{props.jobtitle}</h4>
          <h4>COMPANY NAME:{props.companyname} </h4>
          <h4>JOB TYPE:{props.jobtype}</h4>
          <h4>START YEAR:{props.startyear} </h4>
          <h4>END YEAR:{props.endyear} </h4>
          <h4>DESCRIPTION:{props.description} </h4>
          <h4>LOCATION:{props.location} </h4>
          {!props.jobtitle &&
          !props.companyname &&
          !props.jobtype &&
          !props.startyear &&
          !props.endyear &&
          !props.description &&
          !props.location ? (
            <button
              onClick={() => {
                setshowexperiencedetails(false);
                setaddexperience(true);
              }}
            >
              Add
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setshowexperiencedetails(false);
                  seteditexperienceform(true);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  actions.deleteexperience(props.deleteid);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}

      {addexperience && (
        <div className="form">
          <label>JOB TITILE:</label>
          <input
            typeof="text"
            value={addvalueJobtitle}
            onChange={(e) => setaddjobtitle(e.target.value)}
            required
          ></input>
          <label>COMPANY NAME:</label>
          <input
            typeof="text"
            value={addvalueCompanyname}
            onChange={(e) => setaddcompanyname(e.target.value)}
          ></input>
          <label>JOB TYPE:</label>
          <input
            typeof="text"
            value={addvaluejobtype}
            onChange={(e) => setaddjobtype(e.target.value)}
            required
          ></input>
          <label>START YEAR:</label>
          <input
            typeof="number"
            value={addvalueStartyear}
            onChange={(e) => setaddstartyear(e.target.value)}
            required
          ></input>
          <label>END YEAR::</label>
          <input
            typeof="number"
            value={addvalueEndyear}
            onChange={(e) => setaddendyear(e.target.value)}
            required
          ></input>
          <label>DESCRIPTION:</label>
          <input
            typeof="text"
            value={addvalueDescription}
            onChange={(e) => setadddescription(e.target.value)}
          ></input>
          <label>LOCATION:</label>
          <input
            typeof="text"
            value={addvalueLocation}
            onChange={(e) => setaddLocation(e.target.value)}
          ></input>
          <button
            onClick={() => {
              actions.adduserexperience(
                addvalueJobtitle,
                addvalueCompanyname,
                addvaluejobtype,
                addvalueStartyear,
                addvalueEndyear,
                addvalueDescription,
                addvalueLocation,
                store.user.id
              );
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              setshowexperiencedetails(true);
              setaddexperience(false);
            }}
          >
            Close
          </button>
        </div>
      )}
      {editexperienceform && (
        <div className="form">
          <label>JOB TITILE:</label>
          <input
            typeof="text"
            value={valueJobtitle}
            onChange={(e) => setJobtitle(e.target.value)}
            required
          ></input>
          <label>COMPANY NAME:</label>
          <input
            typeof="text"
            value={valueCompanyname}
            onChange={(e) => setCompanyname(e.target.value)}
          ></input>
          <label>JOB TYPE:</label>
          <input
            typeof="text"
            value={valuejobtype}
            onChange={(e) => setJobtype(e.target.value)}
            required
          ></input>
          <label>START YEAR:</label>
          <input
            typeof="number"
            value={valueStartyear}
            onChange={(e) => setStartyear(e.target.value)}
            required
          ></input>
          <label>END YEAR::</label>
          <input
            typeof="number"
            value={valueEndyear}
            onChange={(e) => setEndyear(e.target.value)}
            required
          ></input>
          <label>DESCRIPTION:</label>
          <input
            typeof="text"
            value={valueDescription}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <label>LOCATION:</label>
          <input
            typeof="text"
            value={valueLocation}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <button
            onClick={() => {
              actions
                .editexperience(
                  props.id,
                  valueJobtitle,
                  valueCompanyname,
                  valuejobtype,
                  valueStartyear,
                  valueEndyear,
                  valueDescription,
                  valueLocation
                )
                .then(() => window.location.reload());
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              setshowexperiencedetails(true);
              seteditexperienceform(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

UserExperience.propTypes = {
  jobtitle: propTypes.string,
  companyname: propTypes.string,
  jobtype: propTypes.number,
  startyear: propTypes.number,
  endyear: propTypes.number,
  description: propTypes.string,
  location: propTypes.string,
  id: propTypes.number,
  track: propTypes.number,
  deleteid: propTypes.number,
};
