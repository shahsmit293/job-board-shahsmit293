import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import propTypes from "prop-types";
import "../../../styles/userqualification.css";

export const UserQualification = (props) => {
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
  const degrees = [
    "High School Degree",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
  ];
  const [showeducationdetails, setshoweducationdetails] = useState(true);
  const [addeducationform, setaddeducationform] = useState(false);
  const [editeducationform, setediteducationform] = useState(false);
  const [error, setError] = useState("");
  const [valueCollagename, setCollagename] = useState(
    props.collagename ? props.collagename : ""
  );
  const [valuestartyear, setStartyear] = useState(
    props.startyear ? props.startyear : ""
  );
  const [valueEndyear, setEndyear] = useState(
    props.endyear ? props.endyear : ""
  );
  const [valuegpa, setGpa] = useState(props.gpa ? props.gpa : "");
  const [valueMajor, setMajor] = useState(props.major ? props.major : "");
  const [valueDegree, setDegree] = useState(props.degree ? props.degree : "");
  const [valueLocation, setLocation] = useState(
    props.location ? props.location : ""
  );

  const [addvalueCollagename, setaddCollagename] = useState("");
  const [addvaluestartyear, setaddStartyear] = useState("");
  const [addvalueEndyear, setaddEndyear] = useState("");
  const [addvaluegpa, setaddGpa] = useState("");
  const [addvalueMajor, setaddMajor] = useState("");
  const [addvalueDegree, setaddDegree] = useState("");
  const [addvalueLocation, setaddLocation] = useState("");
  return (
    <div className="qualification">
      {showeducationdetails && (
        <div className="educationdetails">
          <p>
            <b>Collage Name</b>: {props.collagename}
          </p>
          <p>
            <b>Start Year</b>: {props.startyear}
          </p>
          <p>
            <b>End Year</b>: {props.endyear}{" "}
          </p>
          <p>
            <b>GPA</b>: {props.gpa}{" "}
          </p>
          <p>
            <b>Major</b>: {props.major}{" "}
          </p>
          <p>
            <b>Degree</b>: {props.degree}{" "}
          </p>
          <p>
            <b>Location</b>: {props.location}{" "}
          </p>
          {props.track == 0 ? (
            <button
              onClick={() => {
                setshoweducationdetails(false);
                setaddeducationform(true);
              }}
            >
              Add
            </button>
          ) : null}
          {!props.collagename &&
          !props.startyear &&
          !props.endyear &&
          !props.gpa &&
          !props.major &&
          !props.degree &&
          !props.location ? (
            <button
              onClick={() => {
                setshoweducationdetails(false);
                setaddeducationform(true);
              }}
            >
              Add
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setshoweducationdetails(false);
                  setediteducationform(true);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  actions.deleteusereducation(props.deleteid);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}

      {addeducationform && (
        <div className="addform">
          <div className="qualification-group">
            <label>Collage Name</label>
            <input
              typeof="text"
              value={addvalueCollagename}
              onChange={(e) => setaddCollagename(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="qualification-group">
            <label>Start Year</label>
            <input
              id="startyear"
              name="startyear"
              value={addvaluestartyear}
              onChange={(e) => setaddStartyear(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="qualification-group">
            <label>End Year</label>
            <input
              id="endyear"
              name="endyear"
              min={addvaluestartyear}
              value={addvalueEndyear}
              onChange={(e) => setaddEndyear(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="qualification-group">
            <label>GPA</label>
            <input
              typeof="number"
              step="any"
              value={addvaluegpa}
              onChange={(e) => setaddGpa(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="qualification-group">
            <label>Major</label>
            <input
              typeof="text"
              value={addvalueMajor}
              onChange={(e) => setaddMajor(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="qualification-group">
            <label>Degree</label>
            <select>
              <option
                value=""
                onClick={() => setaddDegree("")}
                onFocus={() => setError("")}
              >
                Select a state
              </option>
              {degrees.map((degree) => (
                <option
                  key={degree}
                  value={degree}
                  onClick={() => setaddDegree(degree)}
                >
                  {degree}
                </option>
              ))}
            </select>
          </div>
          <div className="qualification-group">
            <label>Location</label>
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
          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              const isStartYearNum = /^\d+$/.test(addvaluestartyear);
              const isEndYearNum = /^\d+$/.test(addvalueEndyear);
              const isGpaNum = /^\d+(\.\d{1,2})?$/.test(addvaluegpa);
              if (!isStartYearNum || !isEndYearNum) {
                setError("Start year and end year must be positive numbers");
              } else if (
                parseInt(addvalueEndyear) < parseInt(addvaluestartyear)
              ) {
                setError("End year cannot be less than start year");
              } else if (!isGpaNum || addvaluegpa < 0 || addvaluegpa > 4) {
                setError("GPA must be a number between 0 and 4");
              } else if (
                !addvalueCollagename ||
                !addvaluestartyear ||
                !addvalueEndyear ||
                !addvaluegpa ||
                !addvalueMajor ||
                !addvalueDegree ||
                !addvalueLocation
              ) {
                setError("All fields are required");
              } else {
                actions.addusereducation(
                  addvalueCollagename,
                  addvaluestartyear,
                  addvalueEndyear,
                  addvaluegpa,
                  addvalueMajor,
                  addvalueDegree,
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
              setshoweducationdetails(true);
              setaddeducationform(false);
            }}
          >
            Close
          </button>
        </div>
      )}
      {editeducationform && (
        <div className="editform">
          <div className="qualification-group">
            <label>Collage Name</label>
            <input
              typeof="text"
              value={valueCollagename}
              onChange={(e) => setCollagename(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="qualification-group">
            <label>Start Year</label>
            <input
              id="startyear"
              name="startyear"
              value={valuestartyear}
              onChange={(e) => setStartyear(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="qualification-group">
            <label>End Year</label>
            <input
              id="endyear"
              name="endyear"
              min={valuestartyear}
              value={valueEndyear}
              onChange={(e) => setEndyear(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div className="qualification-group">
            <label>GPA</label>
            <input
              typeof="number"
              step="any"
              value={valuegpa}
              onChange={(e) => setGpa(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="qualification-group">
            <label>Major</label>
            <input
              typeof="text"
              value={valueMajor}
              onChange={(e) => setMajor(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="qualification-group">
            <label>Degree</label>
            <select value={valueDegree}>
              <option
                value=""
                onClick={() => setDegree("")}
                onFocus={() => setError("")}
              >
                Select a state
              </option>
              {degrees.map((degree) => (
                <option
                  key={degree}
                  value={degree}
                  onClick={() => setDegree(degree)}
                >
                  {degree}
                </option>
              ))}
            </select>
          </div>
          <div className="qualification-group">
            <label>Location</label>
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
                >
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              const isStartYearNum = /^\d+$/.test(valuestartyear);
              const isEndYearNum = /^\d+$/.test(valueEndyear);
              const isGpaNum = /^\d+(\.\d{1,2})?$/.test(valuegpa);
              if (!isStartYearNum || !isEndYearNum) {
                setError("Start year and end year must be a positive numbers");
              } else if (parseInt(valueEndyear) < parseInt(valuestartyear)) {
                setError("End year cannot be less than start year");
              } else if (!isGpaNum || valuegpa < 0 || valuegpa > 4) {
                setError("GPA must be a number between 0 and 4");
              } else if (
                !valueCollagename ||
                !valuestartyear ||
                !valueEndyear ||
                !valuegpa ||
                !valueMajor ||
                !valueDegree ||
                !valueLocation
              ) {
                setError("All fields are required");
              } else {
                actions
                  .editusereducation(
                    props.id,
                    valueCollagename,
                    valuestartyear,
                    valueEndyear,
                    valuegpa,
                    valueMajor,
                    valueDegree,
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
              setshoweducationdetails(true);
              setediteducationform(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

UserQualification.propTypes = {
  collagename: propTypes.string,
  startyear: propTypes.number,
  endyear: propTypes.number,
  gpa: propTypes.number,
  major: propTypes.string,
  degree: propTypes.string,
  location: propTypes.string,
  id: propTypes.number,
  track: propTypes.number,
  deleteid: propTypes.number,
};
