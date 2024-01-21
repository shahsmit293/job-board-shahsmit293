import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import propTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";

export const UserExperience = (props) => {
  const { store, actions } = useContext(Context);
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const jobtype = ["Full Time", "Part Time", "Temporary", "Contract"];
  const [showexperiencedetails, setshowexperiencedetails] = useState(true);
  const [addexperience, setaddexperience] = useState(false);
  const [editexperienceform, seteditexperienceform] = useState(false);
  const [error, setError] = useState("");

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
  const [valueisWorking, setvalueIsWorking] = useState(
    props.endyear ? false : true
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
  const [addisWorking, setaddIsWorking] = useState(false);
  const [addvalueDescription, setadddescription] = useState("");
  const [addvalueLocation, setaddLocation] = useState("");
  return (
    <div className="experienceinfo">
      {showexperiencedetails && (
        <div className="experiencedetails">
          <h5>
            <b>Job Title</b>:{props.jobtitle}
          </h5>
          <h5>
            <b>Company Name</b>:{props.companyname}
          </h5>
          <h5>
            <b>Job Type</b>:{props.jobtype}
          </h5>
          <h5>
            <b>Start Year</b>:{props.startyear}
          </h5>
          <h5>
            <b>End Year</b>:{props.endyear}
          </h5>
          <h5 style={{ whiteSpace: "pre-wrap" }}>
            <b>Description</b>:{ReactHtmlParser(props.description)}
          </h5>
          <h5>
            <b>Location</b>:{props.location}
          </h5>
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
              <hr />
            </>
          )}
        </div>
      )}

      {addexperience && (
        <div className="addform">
          <div className="form-group">
            <h5>
              <b>Job Title</b>
            </h5>
            <input
              typeof="text"
              value={addvalueJobtitle}
              onChange={(e) => setaddjobtitle(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="form-group">
            <h5>
              <b>Company Name</b>
            </h5>
            <input
              typeof="text"
              value={addvalueCompanyname}
              onChange={(e) => setaddcompanyname(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="form-group">
            <h5>
              <b>Job Type</b>
            </h5>
            <select>
              <option
                value=""
                onClick={() => setaddjobtype("")}
                onFocus={() => setError("")}
              >
                Select a state
              </option>
              {jobtype.map((job) => (
                <option
                  key={job}
                  value={job}
                  onClick={() => setaddjobtype(job)}
                >
                  {job}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <h5>
              <b>Start Year</b>
            </h5>
            <input
              type="date"
              id="startyear"
              name="startyear"
              required
              value={addvalueStartyear}
              onChange={(e) => setaddstartyear(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="form-group">
            {!addisWorking && (
              <>
                <h5>
                  <b>End Year</b>
                </h5>
                <input
                  type="date"
                  id="endyear"
                  name="endyear"
                  min={addvalueStartyear}
                  value={addvalueEndyear}
                  onChange={(e) => setaddendyear(e.target.value)}
                  onFocus={() => setError("")}
                />
              </>
            )}
          </div>
          <div className="form-group">
            <h5>
              <b>Currently Working Here</b>
            </h5>
            <input
              type="checkbox"
              checked={addisWorking}
              onChange={(e) => setaddIsWorking(e.target.checked)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="form-group">
            <h5>
              <b>Location</b>
            </h5>
            <select>
              <option
                value=""
                onClick={() => setaddLocation("")}
                onFocus={() => setError("")}
              >
                Select a state
              </option>
              {states.map((state) => (
                <option
                  key={state}
                  value={state}
                  onClick={() => setaddLocation(state)}
                >
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>
              <b>Description</b>
            </h5>
          </div>
          <ReactQuill
            theme="snow"
            value={addvalueDescription}
            onChange={(e) => setadddescription(e.target.value)}
            onFocus={() => setError("")}
          />

          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              if (
                !addvalueJobtitle ||
                !addvalueCompanyname ||
                !addvaluejobtype ||
                !addvalueStartyear ||
                (!addvalueEndyear && !addisWorking) ||
                !addvalueDescription ||
                !addvalueLocation
              ) {
                setError("All fields are required");
              } else {
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
                setError("");
              }
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
        <div className="editform">
          <div className="form-group">
            <h5>
              <b>Job Title</b>
            </h5>
            <input
              typeof="text"
              value={valueJobtitle}
              onChange={(e) => setJobtitle(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="form-group">
            <h5>
              <b>Company Name</b>
            </h5>
            <input
              typeof="text"
              value={valueCompanyname}
              onChange={(e) => setCompanyname(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="form-group">
            <h5>
              <b>Job Type</b>
            </h5>
            <select value={valuejobtype}>
              <option
                value=""
                onClick={() => setJobtype("")}
                onFocus={() => setError("")}
              >
                Select a state
              </option>
              {jobtype.map((job) => (
                <option key={job} value={job} onClick={() => setJobtype(job)}>
                  {job}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <h5>
              <b>Start Year</b>
            </h5>
            <input
              type="date"
              id="startyear"
              name="startyear"
              required
              value={valueStartyear}
              onChange={(e) => setStartyear(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="form-group">
            {!addisWorking && (
              <>
                <h5>
                  <b>End Year</b>
                </h5>
                <input
                  type="date"
                  id="endyear"
                  name="endyear"
                  min={valueStartyear}
                  value={valueEndyear}
                  onChange={(e) => setEndyear(e.target.value)}
                  onFocus={() => setError("")}
                />
              </>
            )}
          </div>
          <div className="form-group">
            <h5>
              <b>Currently working here</b>
            </h5>
            <input
              type="checkbox"
              checked={valueisWorking}
              onChange={(e) => setvalueIsWorking(e.target.checked)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="form-group">
            <h5>
              <b>Location</b>
            </h5>
            <select value={valueLocation}>
              <option
                value=""
                onClick={() => setLocation("")}
                onFocus={() => setError("")}
              >
                Select a state
              </option>
              {states.map((state) => (
                <option
                  key={state}
                  value={state}
                  onClick={() => setLocation(state)}
                  onFocus={() => setError("")}
                >
                  {state}
                </option>
              ))}
            </select>
          </div>
          <ReactQuill
            theme="snow"
            value={valueDescription}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setError("")}
          />
          <div style={{ color: "red" }}>{error}</div>

          <button
            onClick={() => {
              if (
                !valueJobtitle ||
                !valueCompanyname ||
                !valuejobtype ||
                !valueStartyear ||
                (!valueEndyear && !valueisWorking) ||
                !valueDescription ||
                !valueLocation
              ) {
                setError("All fields are required");
              } else {
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
                setError("");
              }
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
