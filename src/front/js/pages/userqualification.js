import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
export const UserQualification = (props) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getusereducation(
      store.activejobseeker,
      setCollagename,
      setStartyear,
      setEndyear,
      setGpa,
      setMajor,
      setDegree,
      setLocation
    );
  }, [store.activejobseeker]);
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
  return (
    <div className="educationinfo">
      {showeducationdetails && (
        <div className="details">
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
            <button
              onClick={() => {
                setshoweducationdetails(false);
                setediteducationform(true);
              }}
            >
              edit
            </button>
          )}
        </div>
      )}

      {addeducationform && (
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
            typeof="number"
            value={valuestartyear}
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
          <label>GPA:</label>
          <input
            typeof="number"
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
          <label>DEGREE:</label>
          <input
            typeof="text"
            value={valueDegree}
            onChange={(e) => setDegree(e.target.value)}
          ></input>
          <label>LOCATION:</label>
          <input
            typeof="text"
            value={valueLocation}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <button
            onClick={() => {
              actions.addusereducation(
                valueCollagename,
                valuestartyear,
                valueEndyear,
                valuegpa,
                valueMajor,
                valueDegree,
                valueLocation,
                store.activejobseeker
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
            typeof="number"
            value={valuestartyear}
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
          <label>GPA:</label>
          <input
            typeof="number"
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
          <label>DEGREE:</label>
          <input
            typeof="text"
            value={valueDegree}
            onChange={(e) => setDegree(e.target.value)}
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
                .editusereducation(
                  store.activejobseeker,
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
};
