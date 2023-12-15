import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
export const Userskill = (props) => {
  const { store, actions } = useContext(Context);

  const [showskilldetails, setshowskilldetails] = useState(true);
  const [addskillform, setaddskillform] = useState(false);
  const [editskillinfo, seteditskillinfo] = useState(false);

  const [valueSkillname, setSkillname] = useState(
    props.skillname ? props.skillname : ""
  );
  const [valueskillyear, setSkillyear] = useState(
    props.skillyear ? props.skillyear : ""
  );

  const [addvalueSkillname, setaddSkillname] = useState("");
  const [addvalueskillyear, setaddSkillyear] = useState("");

  return (
    <div className="educationinfo">
      {showskilldetails && (
        <div className="details">
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
          <h4>SKILL:{props.skillname}</h4>
          <h4>TOTAL YEAR EXPERIENCE:{props.skillyear}</h4>
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
        <div className="form">
          <label>SKILL:</label>
          <input
            typeof="text"
            value={addvalueSkillname}
            onChange={(e) => setaddSkillname(e.target.value)}
            required
          ></input>
          <label>TOTAL YEAR EXPERIENCE:</label>
          <input
            typeof="number"
            value={addvalueskillyear}
            onChange={(e) => setaddSkillyear(e.target.value)}
            required
          ></input>

          <button
            onClick={() => {
              actions.adduserskill(
                addvalueSkillname,
                addvalueskillyear,
                store.user.id
              );
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
        <div className="form">
          <label>SKILL:</label>
          <input
            typeof="text"
            value={valueSkillname}
            onChange={(e) => setSkillname(e.target.value)}
            required
          ></input>
          <label>TOTAL YEAR EXPERIENCE:</label>
          <input
            typeof="number"
            value={valueskillyear}
            onChange={(e) => setSkillyear(e.target.value)}
            required
          ></input>

          <button
            onClick={() => {
              actions
                .editskill(props.id, valueSkillname, valueskillyear)
                .then(() => window.location.reload());
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
