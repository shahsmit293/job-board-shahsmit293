import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import propTypes from "prop-types";
import "../../../styles/userskill.css";

export const Userskill = (props) => {
  const { store, actions } = useContext(Context);

  const [showskilldetails, setshowskilldetails] = useState(true);
  const [addskillform, setaddskillform] = useState(false);
  const [editskillinfo, seteditskillinfo] = useState(false);
  const [error, setError] = useState("");

  const [valueSkillname, setSkillname] = useState(
    props.skillname ? props.skillname : ""
  );
  const [valueskillyear, setSkillyear] = useState(
    props.skillyear ? props.skillyear : ""
  );

  const [addvalueSkillname, setaddSkillname] = useState("");
  const [addvalueskillyear, setaddSkillyear] = useState("");

  return (
    <div className="skill">
      {showskilldetails && (
        <div className="skilldetails">
          <p>
            <b>Skill</b>:{props.skillname}
          </p>
          <p>
            <b>Year Of Experience</b>:{props.skillyear}
          </p>
          {props.track == 0 ? (
            <button
              onClick={() => {
                setshowskilldetails(false);
                setaddskillform(true);
              }}
            >
              Add
            </button>
          ) : null}
          {!props.skillname && !props.skillyear ? (
            <button
              onClick={() => {
                setshowskilldetails(false);
                setaddskillform(true);
              }}
            >
              Add
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setshowskilldetails(false);
                  seteditskillinfo(true);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  actions.deleteskill(props.deleteid);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}

      {addskillform && (
        <div className="addform">
          <div className="skill-group">
            <label>Skill</label>
            <input
              typeof="text"
              value={addvalueSkillname}
              onChange={(e) => setaddSkillname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="skill-group">
            <label>Year Of Experience</label>
            <input
              value={addvalueskillyear}
              onChange={(e) => setaddSkillyear(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>{" "}
          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              if (!addvalueSkillname || !addvalueskillyear) {
                setError("All fields are required");
              } else if (isNaN(addvalueskillyear) || addvalueskillyear < 0) {
                setError("Skill year must be a positive number");
              } else {
                actions.adduserskill(
                  addvalueSkillname,
                  addvalueskillyear,
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
              setshowskilldetails(true);
              setaddskillform(false);
            }}
          >
            Close
          </button>
        </div>
      )}
      {editskillinfo && (
        <div className="editform">
          <div className="skill-group">
            <label>Skill</label>
            <input
              typeof="text"
              value={valueSkillname}
              onChange={(e) => setSkillname(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="skill-group">
            <label>Year Of Experience</label>
            <input
              typeof="number"
              value={valueskillyear}
              onChange={(e) => setSkillyear(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              if (!valueSkillname || !valueskillyear) {
                setError("All fields are required");
              } else if (isNaN(valueskillyear) || valueskillyear < 0) {
                setError("Skill year must be a positive number");
              } else {
                actions
                  .editskill(props.id, valueSkillname, valueskillyear)
                  .then(() => window.location.reload());
                setError("");
              }
            }}
          >
            Update
          </button>

          <button
            onClick={() => {
              setshowskilldetails(true);
              seteditskillinfo(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

Userskill.propTypes = {
  skillname: propTypes.string,
  skillyear: propTypes.number,
  id: propTypes.number,
  track: propTypes.number,
  deleteid: propTypes.number,
};
