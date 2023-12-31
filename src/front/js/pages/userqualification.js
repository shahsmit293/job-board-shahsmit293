import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";

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
    <div className="educationinfo">
      {showeducationdetails && (
        <div className="details">
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
          <h4>COLLAGE NAME{props.collagename}</h4>
          <h4>START YEAR:{props.startyear}</h4>
          <h4>END YEAR:{props.endyear} </h4>
          <h4>GPA:{props.gpa} </h4>
          <h4>MAJOR:{props.major} </h4>
          <h4>DEGREE:{props.degree} </h4>
          <h4>LOCATION:{props.location} </h4>
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
        <div className="form">
          <label>COLLAGE NAME:</label>
          <input
            typeof="text"
            value={addvalueCollagename}
            onChange={(e) => setaddCollagename(e.target.value)}
            required
          ></input>
          <label>START YEAR::</label>
          <input
            type="number"
            min="0"
            id="startyear"
            name="startyear"
            required
            value={addvaluestartyear}
            onChange={(e) => setaddStartyear(e.target.value)}
          />
          <label>END YEAR::</label>
          <input
            type="number"
            id="endyear"
            name="endyear"
            min={addvaluestartyear}
            value={addvalueEndyear}
            onChange={(e) => setaddEndyear(e.target.value)}
          />
          <label>GPA:</label>
          <input
            typeof="number"
            step="any"
            value={addvaluegpa}
            onChange={(e) => setaddGpa(e.target.value)}
            required
          ></input>
          <label>MAJOR:</label>
          <input
            typeof="text"
            value={addvalueMajor}
            onChange={(e) => setaddMajor(e.target.value)}
          ></input>
          <label>Degree::</label>
          <select>
            <option value="" onClick={() => setaddDegree("")}>
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
          <label>Location::</label>
          <select>
            <option value="" onClick={() => setaddLocation("")}>
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
          <button
            onClick={() => {
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
        <div className="form">
          <label>COLLAGE NAME:</label>
          <input
            typeof="text"
            value={valueCollagename}
            onChange={(e) => setCollagename(e.target.value)}
            required
          ></input>
          <label>START YEAR::</label>
          <input
            type="number"
            min="0"
            id="startyear"
            name="startyear"
            required
            value={valuestartyear}
            onChange={(e) => setStartyear(e.target.value)}
          />
          <label>END YEAR::</label>
          <input
            type="number"
            id="endyear"
            name="endyear"
            min={valuestartyear}
            value={valueEndyear}
            onChange={(e) => setEndyear(e.target.value)}
          />
          <label>GPA:</label>
          <input
            typeof="number"
            step="any"
            value={valuegpa}
            onChange={(e) => setGpa(e.target.value)}
            required
          ></input>
          <label>MAJOR:</label>
          <input
            typeof="text"
            value={valueMajor}
            onChange={(e) => setMajor(e.target.value)}
          ></input>
          <label>Degree::</label>
          <select value={valueDegree}>
            <option value="" onClick={() => setDegree("")}>
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
          <label>Location::</label>
          <select value={valueLocation}>
            <option value="" onClick={() => setLocation("")}>
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
          <button
            onClick={() => {
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
