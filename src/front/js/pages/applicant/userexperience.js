import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import propTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import "../../../styles/userexperience.css";
import LocationSearchInput from "../locationSearchInput";

export const UserExperience = (props) => {
  const { store, actions } = useContext(Context);
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
    <div className="experience">
      {showexperiencedetails && (
        <div className="experiencedetails">
          <p>
            <b>Job Title</b>:{props.jobtitle}
          </p>
          <p>
            <b>Company Name</b>:{props.companyname}
          </p>
          <p>
            <b>Location</b>:{props.location}
          </p>
          <p>
            <b>Job Type</b>:{props.jobtype}
          </p>
          <p>
            <b>Start Year</b>:{props.startyear}
          </p>
          <p>
            <b>End Year</b>:{props.endyear}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>
            <b>Description</b>:{ReactHtmlParser(props.description)}
          </p>
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
            </>
          )}
        </div>
      )}

      {addexperience && (
        <div className="addform">
          <div className="experience-group">
            <label>Job Title</label>
            <input
              typeof="text"
              value={addvalueJobtitle}
              onChange={(e) => setaddjobtitle(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="experience-group">
            <label>Company Name</label>
            <input
              typeof="text"
              value={addvalueCompanyname}
              onChange={(e) => setaddcompanyname(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="experience-group">
            <label>Job Type</label>
            <select
              onChange={(e) => setaddjobtype(e.target.value)}
              onFocus={() => setError("")}
              value={addvaluejobtype}
            >
              <option value="">Select job type</option>
              {jobtype.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <div className="experience-group">
            <label>Start Year</label>
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
          <div className="experience-group">
            {!addisWorking && (
              <>
                <label>End Year</label>
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
          <div className="experience-group">
            <label>Currently Working Here</label>
            <input
              type="checkbox"
              checked={addisWorking}
              onChange={(e) => setaddIsWorking(e.target.checked)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="experience-group">
            <label>Address:</label>
            <LocationSearchInput
              setLocation={setaddLocation}
              location={addvalueLocation}
            />
          </div>
          <div>
            <label>Description</label>
          </div>
          <ReactQuill
            theme="snow"
            value={addvalueDescription}
            onChange={setadddescription}
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
          <div className="experience-group">
            <label>Job Title</label>
            <input
              typeof="text"
              value={valueJobtitle}
              onChange={(e) => setJobtitle(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="experience-group">
            <label>Company Name</label>
            <input
              typeof="text"
              value={valueCompanyname}
              onChange={(e) => setCompanyname(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="experience-group">
            <label>Job Type</label>
            <select value={valuejobtype}>
              <option
                value=""
                onClick={() => setJobtype("")}
                onFocus={() => setError("")}
              >
                Select a job type
              </option>
              {jobtype.map((job) => (
                <option key={job} value={job} onClick={() => setJobtype(job)}>
                  {job}
                </option>
              ))}
            </select>
          </div>
          <div className="experience-group">
            <label>Start Year</label>
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
          <div className="experience-group">
            {!addisWorking && (
              <>
                <label>End Year</label>
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
          <div className="experience-group">
            <label>Currently working here</label>
            <input
              type="checkbox"
              checked={valueisWorking}
              onChange={(e) => setvalueIsWorking(e.target.checked)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="experience-group">
            {/* <label>Location</label>
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
            </select> */}
            <label>Address:</label>
            <LocationSearchInput
              setLocation={setLocation}
              location={valueLocation}
            />
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
