import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import propTypes from "prop-types";
import "../../../styles/userpreference.css";

export const UserPreference = (props) => {
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
  const handleLocationChange = (event) => {
    let newLocations = valueRelocationplace
      .split(", ")
      .filter((location) => location !== "chooselocation");
    if (event.target.checked) {
      newLocations.push(event.target.value);
    } else {
      newLocations = newLocations.filter(
        (location) => location !== event.target.value
      );
    }
    if (newLocations.length === 0) {
      newLocations.push("chooselocation");
    }
    setValueRelocationplace(newLocations.join(", "));
  };
  const [showdetails, setShowdetails] = useState(true);
  const [addForm, setaddform] = useState(false);
  const [editForm, setEditform] = useState(false);
  const [error, setError] = useState("");

  const [valueJobpreferenceName, setJobpreferenceName] = useState(
    props.jobtitlepreference ? props.jobtitlepreference : ""
  );
  const [valueFulltimeJob, setValueFulltimeJob] = useState(
    props.fulltimeob ? props.fulltimeob : ""
  );
  const [valueParttimeJob, setParttimeJob] = useState(
    props.parttimejob ? props.parttimejob : ""
  );
  const [valueContractJob, setValueContractJob] = useState(
    props.contractjob ? props.contractjob : ""
  );
  const [valueTemperoryJob, setValueTemperoryJob] = useState(
    props.temperoryjob ? props.temperoryjob : ""
  );
  const [valueInternship, setValueInternship] = useState(
    props.internship ? props.internship : ""
  );
  const [valueMontoFri, setValueMontoFri] = useState(
    props.mondaytofriday ? props.mondaytofriday : ""
  );
  const [valueWeekendasneeded, setValueWeekendasneeded] = useState(
    props.weekendasneeded ? props.weekendasneeded : ""
  );
  const [valueWeekendonly, setValueWeekendonly] = useState(
    props.weekendonly ? props.weekendonly : ""
  );
  const [valueNoweekend, setValueNoweekend] = useState(
    props.noweekends ? props.noweekends : ""
  );
  const [valueHoliday, setValueHoliday] = useState(
    props.holidays ? props.holidays : ""
  );
  const [valueRotatingweekend, setValueRotatingweekend] = useState(
    props.rotatingweekends ? props.rotatingweekends : ""
  );
  const [valueWeekdays, setValueWeekdays] = useState(
    props.weekdays ? props.weekdays : ""
  );
  const [valueEveryweekends, setValueEveryweekends] = useState(
    props.everyweekend ? props.everyweekend : ""
  );
  const [valueFourhourshift, setValueFourhourshift] = useState(
    props.fourhourshift ? props.fourhourshift : ""
  );
  const [valueEighthourshift, setValueEighthourshift] = useState(
    props.eighthourshift ? props.eighthourshift : ""
  );
  const [valueTenhourshift, setValueTenhourshift] = useState(
    props.tenhourshift ? props.tenhourshift : ""
  );
  const [valueTwelvehourshift, setValueTwelvehourshift] = useState(
    props.twelvehourshift ? props.twelvehourshift : ""
  );
  const [valueDayshift, setValueDayshift] = useState(
    props.dayshift ? props.dayshift : ""
  );
  const [valueNightshift, setValueNightshift] = useState(
    props.nightshift ? props.nightshift : ""
  );
  const [valueEveningshift, setValueEveningshift] = useState(
    props.eveningshift ? props.eveningshift : ""
  );
  const [valueNonight, setValueNonight] = useState(
    props.nonight ? props.nonight : ""
  );
  const [valueOvernightshift, setValueOvernightshift] = useState(
    props.overnightshift ? props.overnightshift : ""
  );
  const [valueRotatingshift, setValueRotatingshift] = useState(
    props.rotatingshift ? props.rotatingshift : ""
  );
  const [valueSplitshift, setValueSplitshift] = useState(
    props.splitshift ? props.splitshift : ""
  );
  const [valueOvertime, setValueOvertime] = useState(
    props.overtime ? props.overtime : ""
  );
  const [valueMinsalary, setValueMinsalary] = useState(
    props.minsalary ? props.minsalary : ""
  );
  const [valueSalarytype, setValueSalarytype] = useState(
    props.salarytype ? props.salarytype : ""
  );
  const [valueRelocation, setValueRelocation] = useState(
    props.relocation ? props.relocation : ""
  );
  const [valueRelocationplace, setValueRelocationplace] = useState(
    props.relocationplace ? props.relocationplace : ""
  );
  const [valueRemotejob, setValueRemotejob] = useState(
    props.remotejob ? props.remotejob : ""
  );
  const [valueHybridjob, setValueHybridjob] = useState(
    props.hybridjob ? props.hybridjob : ""
  );
  const [valueInperson, setValueInperson] = useState(
    props.inperson ? props.inperson : ""
  );
  const [valueTemperoryremotejob, setValueTemperoryremotejob] = useState(
    props.temperoryremotejob ? props.temperoryremotejob : ""
  );

  return (
    <div className="preference">
      {showdetails && (
        <div className="preferencedetails">
          <p>
            <b>Job Titles</b>:{props.jobtitlepreference}
          </p>
          <p>
            <b>Job Types</b>:{" "}
            <span style={{ color: "lightgrey" }}>{props.fulltimeob}</span>{" "}
            <span style={{ color: "grey" }}>{props.parttimejob}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.contractjob}</span>{" "}
            <span style={{ color: "grey" }}>{props.temperoryjob}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.internship}</span>{" "}
          </p>

          <p>
            <b>Work Schedule</b>:{" "}
            <span style={{ color: "lightgrey" }}>{props.mondaytofriday}</span>{" "}
            <span style={{ color: "grey" }}>{props.weekendasneeded}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.weekendonly}</span>{" "}
            <span style={{ color: "grey" }}>{props.noweekends}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.holidays}</span>{" "}
            <span style={{ color: "grey" }}>{props.rotatingweekends}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.weekdays}</span>{" "}
            <span style={{ color: "grey" }}>{props.everyweekend}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.fourhourshift}</span>{" "}
            <span style={{ color: "grey" }}>{props.eighthourshift}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.tenhourshift}</span>{" "}
            <span style={{ color: "grey" }}>{props.twelvehourshift}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.dayshift}</span>{" "}
            <span style={{ color: "grey" }}>{props.nightshift}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.eveningshift}</span>{" "}
            <span style={{ color: "grey" }}>{props.nonight}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.overnightshift}</span>{" "}
            <span style={{ color: "grey" }}>{props.rotatingshift}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.splitshift}</span>{" "}
            <span style={{ color: "grey" }}>{props.overtime}</span>{" "}
          </p>

          <p>
            <b>Minimum Pay</b>:{props.minsalary} {props.salarytype}
          </p>
          <p>
            <b>Relocation</b>:{props.relocation} {props.relocationplace}
          </p>
          <p>
            <b>Remote</b>:
            <span style={{ color: "lightgrey" }}>{props.remotejob}</span>{" "}
            <span style={{ color: "grey" }}>{props.hybridjob}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.inperson}</span>{" "}
            <span style={{ color: "grey" }}>{props.temperoryremotejob}</span>{" "}
            <span style={{ color: "lightgrey" }}>{props.temperoryjob}</span>{" "}
          </p>
          {!props.jobtitlepreference &&
          !props.fulltimeob &&
          !props.parttimejob &&
          !props.contractjob &&
          !props.temperoryjob &&
          !props.internship &&
          !props.mondaytofriday &&
          !props.weekendasneeded &&
          !props.weekendonly &&
          !props.noweekends &&
          !props.holidays &&
          !props.rotatingweekends &&
          !props.weekdays &&
          !props.everyweekend &&
          !props.fourhourshift &&
          !props.eighthourshift &&
          !props.tenhourshift &&
          !props.twelvehourshift &&
          !props.dayshift &&
          !props.nightshift &&
          !props.eveningshift &&
          !props.nonight &&
          !props.overnightshift &&
          !props.rotatingshift &&
          !props.splitshift &&
          !props.overtime &&
          !props.minsalary &&
          !props.salarytype &&
          !props.relocation &&
          !props.relocationplace &&
          !props.remotejob &&
          !props.hybridjob &&
          !props.inperson &&
          !props.temperoryremotejob ? (
            <button
              onClick={() => {
                setShowdetails(false);
                setaddform(true);
              }}
            >
              Add
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowdetails(false);
                  setEditform(true);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  actions.deletepreference(store.user.id);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}

      {addForm && (
        <div className="addform">
          <h1>
            <b>
              <u>Add Preference</u>
            </b>
          </h1>
          <div className="preference-group">
            <label>
              <b>Job Preference Name</b>:
            </label>
            <input
              typeof="text"
              value={valueJobpreferenceName}
              onChange={(e) => setJobpreferenceName(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="preference-group">
            <label>
              <b>Full Time</b>
            </label>
            <input
              type="checkbox"
              name="fulltime"
              onChange={(e) =>
                setValueFulltimeJob(e.target.checked ? "Fulltimejob" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Part Time</b>
            </label>
            <input
              type="checkbox"
              name="parttime"
              onChange={(e) =>
                setParttimeJob(e.target.checked ? "Parttime" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Contract</b>
            </label>
            <input
              type="checkbox"
              name="contract"
              onChange={(e) =>
                setValueContractJob(e.target.checked ? "Contractjob" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Temporary</b>
            </label>
            <input
              type="checkbox"
              name="temperory"
              onChange={(e) =>
                setValueTemperoryJob(e.target.checked ? "Temperoryjob" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Internship</b>
            </label>
            <input
              type="checkbox"
              name="internship"
              onChange={(e) =>
                setValueInternship(e.target.checked ? "Internship" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Monday to Friday</b>
            </label>
            <input
              type="checkbox"
              name="mondaytofriday"
              onChange={(e) =>
                setValueMontoFri(e.target.checked ? "Monday-to-Friday" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Weekends As Needed</b>
            </label>
            <input
              type="checkbox"
              name="weekendasneeded"
              onChange={(e) =>
                setValueWeekendasneeded(
                  e.target.checked ? "Weekend as needed" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Weekends Only</b>
            </label>
            <input
              type="checkbox"
              name="weekendsonly"
              onChange={(e) =>
                setValueWeekendonly(e.target.checked ? "Weekend Only" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>No Weekends</b>
            </label>
            <input
              type="checkbox"
              name="noweekends"
              onChange={(e) =>
                setValueNoweekend(e.target.checked ? "No weekend" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Holidays</b>
            </label>
            <input
              type="checkbox"
              name="holidays"
              onChange={(e) =>
                setValueHoliday(e.target.checked ? "Holiday" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Rotating Weekends</b>
            </label>
            <input
              type="checkbox"
              name="rotatingweekends"
              onChange={(e) =>
                setValueRotatingweekend(
                  e.target.checked ? "Rotating Weekend" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Weekdays</b>
            </label>
            <input
              type="checkbox"
              name="weekdays"
              onChange={(e) =>
                setValueWeekdays(e.target.checked ? "Weekdays" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Every Weekend</b>
            </label>
            <input
              type="checkbox"
              name="everyweekend"
              onChange={(e) =>
                setValueEveryweekends(e.target.checked ? "Every Weekends" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>4 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="fourhourshift"
              onChange={(e) =>
                setValueFourhourshift(e.target.checked ? "4-Hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>8 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="eighthourshift"
              onChange={(e) =>
                setValueEighthourshift(e.target.checked ? "8-hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>10 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="tenhourshift"
              onChange={(e) =>
                setValueTenhourshift(e.target.checked ? "10-hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>12 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="twelvehourshift"
              onChange={(e) =>
                setValueTwelvehourshift(e.target.checked ? "12-hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Day Shift</b>
            </label>
            <input
              type="checkbox"
              name="dayshift"
              onChange={(e) =>
                setValueDayshift(e.target.checked ? "Day shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Night Shift</b>
            </label>
            <input
              type="checkbox"
              name="nightshift"
              onChange={(e) =>
                setValueNightshift(e.target.checked ? "Night shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Evening Shift</b>
            </label>
            <input
              type="checkbox"
              name="eveningshift"
              onChange={(e) =>
                setValueEveningshift(e.target.checked ? "Evening shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>No Night Shift</b>
            </label>
            <input
              type="checkbox"
              name="nonights"
              onChange={(e) =>
                setValueNonight(e.target.checked ? "No nights" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Overnight Shift</b>
            </label>
            <input
              type="checkbox"
              name="overnightshift"
              onChange={(e) =>
                setValueOvernightshift(
                  e.target.checked ? "Overnight shift" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Rotating Shift</b>
            </label>
            <input
              type="checkbox"
              name="rotatingshift"
              onChange={(e) =>
                setValueRotatingshift(e.target.checked ? "Rotating shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Split Shift</b>
            </label>
            <input
              type="checkbox"
              name="splitshift"
              onChange={(e) =>
                setValueSplitshift(e.target.checked ? "Split shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Overtime</b>
            </label>
            <input
              type="checkbox"
              name="overtime"
              onChange={(e) =>
                setValueOvertime(e.target.checked ? "Overtime" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Minimum Salary</b>
            </label>
            <input
              typeof="number"
              value={valueMinsalary}
              onChange={(e) => setValueMinsalary(e.target.value)}
              onFocus={() => setError("")}
            ></input>
          </div>
          <div className="preference-group">
            <label htmlFor="salary">
              <b>Choose Salary Type</b>
            </label>
            <select
              name="salary"
              id="salary"
              value={valueSalarytype}
              onChange={(e) => setValueSalarytype(e.target.value)}
              onFocus={() => setError("")}
            >
              <option
                value=""
                onClick={() => setValueSalarytype("")}
                onFocus={() => setError("")}
              >
                Select Salary Type
              </option>
              <option value="per hour">per hour</option>
              <option value="per week">per week</option>
              <option value="per month">per month</option>
              <option value="per year">per year</option>
            </select>
          </div>
          <div className="preference-group">
            <label>
              <b>Relocation</b>
            </label>
            <input
              type="checkbox"
              name="relocation"
              onChange={(e) => {
                setValueRelocation(e.target.checked ? "Yes" : "");
                setValueRelocationplace("");
              }}
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            {valueRelocation === "Yes" && (
              <>
                <h5>
                  <b>Anywhere</b>
                </h5>
                <input
                  type="radio"
                  id="anywhere"
                  name="relocationOption"
                  value="anywhere"
                  onChange={(e) => setValueRelocationplace(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
                <h5>
                  <b>Choose Location</b>
                </h5>
                <input
                  type="radio"
                  id="chooselocation"
                  name="relocationOption"
                  value="chooselocation"
                  onChange={(e) => setValueRelocationplace(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
                {valueRelocationplace !== "anywhere" &&
                  valueRelocationplace !== "" && (
                    <>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-light dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Choose Location
                        </button>
                        <ul
                          className="dropdown-menu"
                          style={{ height: "100px", overflowY: "auto" }}
                        >
                          <li>
                            {states.map((location) => (
                              <div key={location} className="checklocation">
                                <h6>
                                  <b>{location}</b>
                                </h6>
                                <input
                                  type="checkbox"
                                  id={location}
                                  name="location"
                                  value={location}
                                  onChange={handleLocationChange}
                                />
                              </div>
                            ))}
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
              </>
            )}
          </div>
          <div className="preference-group">
            <label>
              <b>Remote Job</b>
            </label>
            <input
              type="checkbox"
              name="remotejob"
              onChange={(e) =>
                setValueRemotejob(e.target.checked ? "Remote job" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Hybrid Job</b>
            </label>
            <input
              type="checkbox"
              name="hybridjob"
              onChange={(e) =>
                setValueHybridjob(e.target.checked ? "Hybrid job" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>In Person Job</b>
            </label>
            <input
              type="checkbox"
              name="inpersonjob"
              onChange={(e) =>
                setValueInperson(e.target.checked ? "In person job" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Temperory Remote Job</b>
            </label>
            <input
              type="checkbox"
              name="temperoryremotejob"
              onChange={(e) =>
                setValueTemperoryremotejob(
                  e.target.checked ? "Temperory remote job" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div style={{ color: "red" }}>{error}</div>

          <button
            onClick={() => {
              if (!valueJobpreferenceName) {
                setError("Job preference name is required");
              } else if (
                !valueMinsalary ||
                isNaN(valueMinsalary) ||
                valueMinsalary <= 0
              ) {
                setError("Minimum salary must be a positive number");
              } else if (!valueSalarytype) {
                setError("Salary type required");
              } else {
                actions.adduserpreference(
                  valueJobpreferenceName,
                  valueFulltimeJob,
                  valueParttimeJob,
                  valueContractJob,
                  valueTemperoryJob,
                  valueInternship,
                  valueMontoFri,
                  valueWeekendasneeded,
                  valueWeekendonly,
                  valueNoweekend,
                  valueHoliday,
                  valueRotatingweekend,
                  valueWeekdays,
                  valueEveryweekends,
                  valueFourhourshift,
                  valueEighthourshift,
                  valueTenhourshift,
                  valueTwelvehourshift,
                  valueDayshift,
                  valueNightshift,
                  valueEveningshift,
                  valueNonight,
                  valueOvernightshift,
                  valueRotatingshift,
                  valueSplitshift,
                  valueOvertime,
                  valueMinsalary,
                  valueSalarytype,
                  valueRelocation,
                  valueRelocationplace,
                  valueRemotejob,
                  valueHybridjob,
                  valueInperson,
                  valueTemperoryremotejob,
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
              setShowdetails(true);
              setaddform(false);
            }}
          >
            Close
          </button>
        </div>
      )}
      {editForm && (
        <div className="editform">
          <div className="preference-group">
            <label>
              <b>Job Preference Name</b>:
            </label>
            <input
              typeof="text"
              value={valueJobpreferenceName}
              onChange={(e) => setJobpreferenceName(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="preference-group">
            <label>
              <b>Full Time</b>
            </label>
            <input
              type="checkbox"
              name="fulltime"
              checked={valueFulltimeJob === "Fulltimejob"}
              onChange={(e) =>
                setValueFulltimeJob(e.target.checked ? "Fulltimejob" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Part Time</b>
            </label>
            <input
              type="checkbox"
              name="parttime"
              checked={valueParttimeJob === "Parttime"}
              onChange={(e) =>
                setParttimeJob(e.target.checked ? "Parttime" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Contract</b>
            </label>
            <input
              type="checkbox"
              name="contract"
              checked={valueContractJob === "Contractjob"}
              onChange={(e) =>
                setValueContractJob(e.target.checked ? "Contractjob" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Temporary</b>
            </label>
            <input
              type="checkbox"
              name="temperory"
              checked={valueTemperoryJob === "Temperoryjob"}
              onChange={(e) =>
                setValueTemperoryJob(e.target.checked ? "Temperoryjob" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Internship</b>
            </label>
            <input
              type="checkbox"
              name="internship"
              checked={valueInternship === "Internship"}
              onChange={(e) =>
                setValueInternship(e.target.checked ? "Internship" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Monday to Friday</b>
            </label>
            <input
              type="checkbox"
              name="mondaytofriday"
              checked={valueMontoFri === "Monday-to-Friday"}
              onChange={(e) =>
                setValueMontoFri(e.target.checked ? "Monday-to-Friday" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Weekends As Needed</b>:
            </label>
            <input
              type="checkbox"
              name="weekendasneeded"
              checked={valueWeekendasneeded === "Weekend as needed"}
              onChange={(e) =>
                setValueWeekendasneeded(
                  e.target.checked ? "Weekend as needed" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Weekends Only</b>
            </label>
            <input
              type="checkbox"
              name="weekendsonly"
              checked={valueWeekendonly === "Weekend Only"}
              onChange={(e) =>
                setValueWeekendonly(e.target.checked ? "Weekend Only" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>No Weekends</b>:
            </label>
            <input
              type="checkbox"
              name="noweekends"
              checked={valueNoweekend === "No weekend"}
              onChange={(e) =>
                setValueNoweekend(e.target.checked ? "No weekend" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Holidays</b>
            </label>
            <input
              type="checkbox"
              name="holidays"
              checked={valueHoliday === "Holiday"}
              onChange={(e) =>
                setValueHoliday(e.target.checked ? "Holiday" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Rotating Weekends</b>
            </label>
            <input
              type="checkbox"
              name="rotatingweekends"
              checked={valueRotatingweekend === "Rotating Weekend"}
              onChange={(e) =>
                setValueRotatingweekend(
                  e.target.checked ? "Rotating Weekend" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Weekdays</b>
            </label>
            <input
              type="checkbox"
              name="weekdays"
              checked={valueWeekdays === "Weekdays"}
              onChange={(e) =>
                setValueWeekdays(e.target.checked ? "Weekdays" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Every Weekends</b>
            </label>
            <input
              type="checkbox"
              name="everyweekend"
              checked={valueEveryweekends === "Every Weekends"}
              onChange={(e) =>
                setValueEveryweekends(e.target.checked ? "Every Weekends" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>4 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="fourhourshift"
              checked={valueFourhourshift === "4-Hour shift"}
              onChange={(e) =>
                setValueFourhourshift(e.target.checked ? "4-Hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>8 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="eighthourshift"
              checked={valueEighthourshift === "8-hour shift"}
              onChange={(e) =>
                setValueEighthourshift(e.target.checked ? "8-hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>10 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="tenhourshift"
              checked={valueTenhourshift === "10-hour shift"}
              onChange={(e) =>
                setValueTenhourshift(e.target.checked ? "10-hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>12 Hour Shift</b>
            </label>
            <input
              type="checkbox"
              name="twelvehourshift"
              checked={valueTwelvehourshift === "12-hour shift"}
              onChange={(e) =>
                setValueTwelvehourshift(e.target.checked ? "12-hour shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Day Shift</b>
            </label>
            <input
              type="checkbox"
              name="dayshift"
              checked={valueDayshift === "Day shift"}
              onChange={(e) =>
                setValueDayshift(e.target.checked ? "Day shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Night Shift</b>
            </label>
            <input
              type="checkbox"
              name="nightshift"
              checked={valueNightshift === "Night shift"}
              onChange={(e) =>
                setValueNightshift(e.target.checked ? "Night shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Evening Shift</b>
            </label>
            <input
              type="checkbox"
              name="eveningshift"
              checked={valueEveningshift === "Evening shift"}
              onChange={(e) =>
                setValueEveningshift(e.target.checked ? "Evening shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>No Nights</b>
            </label>
            <input
              type="checkbox"
              name="nonights"
              checked={valueNonight === "No nights"}
              onChange={(e) =>
                setValueNonight(e.target.checked ? "No nights" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Overnight Shift</b>:
            </label>
            <input
              type="checkbox"
              name="overnightshift"
              checked={valueOvernightshift === "Overnight shift"}
              onChange={(e) =>
                setValueOvernightshift(
                  e.target.checked ? "Overnight shift" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Rotating Shift</b>
            </label>
            <input
              type="checkbox"
              name="rotatingshift"
              checked={valueRotatingshift === "Rotating shift"}
              onChange={(e) =>
                setValueRotatingshift(e.target.checked ? "Rotating shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Split Shift</b>
            </label>
            <input
              type="checkbox"
              name="splitshift"
              checked={valueSplitshift === "Split shift"}
              onChange={(e) =>
                setValueSplitshift(e.target.checked ? "Split shift" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Overtime</b>
            </label>
            <input
              type="checkbox"
              name="overtine"
              checked={valueOvertime === "Overtime"}
              onChange={(e) =>
                setValueOvertime(e.target.checked ? "Overtime" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Minimum Salary</b>
            </label>
            <input
              typeof="number"
              value={valueMinsalary}
              onChange={(e) => setValueMinsalary(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="preference-group">
            <label htmlFor="salary">
              <b>Choose a Salary Type</b>
            </label>
            <select
              name="salary"
              id="salary"
              value={valueSalarytype}
              onChange={(e) => setValueSalarytype(e.target.value)}
              onFocus={() => setError("")}
            >
              <option
                value=""
                onClick={() => setValueSalarytype("")}
                onFocus={() => setError("")}
              >
                Select Salary Type
              </option>
              <option value="per hour">per hour</option>
              <option value="per week">per week</option>
              <option value="per month">per month</option>
              <option value="per year">per year</option>
            </select>
          </div>
          <div className="preference-group">
            <label>
              <b>Relocation</b>
            </label>
            <input
              type="checkbox"
              name="relocation"
              checked={valueRelocation == "Yes"}
              onChange={(e) => {
                setValueRelocation(e.target.checked ? "Yes" : "");
                setValueRelocationplace("");
              }}
              onFocus={() => setError("")}
            />
          </div>
          <div className="btn-group">
            {valueRelocation === "Yes" && (
              <>
                <label>
                  <b>Anywhere</b>
                </label>
                <input
                  type="radio"
                  id="anywhere"
                  name="relocationOption"
                  value="anywhere"
                  checked={valueRelocationplace === "anywhere"}
                  onChange={(e) => setValueRelocationplace(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
                <label>
                  <b>Choose Location</b>
                </label>
                <input
                  type="radio"
                  id="chooselocation"
                  name="relocationOption"
                  checked={
                    valueRelocationplace !== "anywhere" &&
                    valueRelocationplace !== ""
                  }
                  value="chooselocation"
                  onChange={(e) => setValueRelocationplace(e.target.value)}
                  onFocus={() => setError("")}
                />
                <br />
                {valueRelocationplace !== "anywhere" &&
                  valueRelocationplace !== "" && (
                    <>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-light dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Choose Location
                        </button>
                        <ul
                          className="dropdown-menu"
                          style={{ height: "100px", overflowY: "auto" }}
                        >
                          <li>
                            {states.map((location) => (
                              <div
                                key={location}
                                className="checklocation"
                                style={{ display: "flex" }}
                              >
                                <h6>
                                  <b>{location}</b>
                                </h6>
                                <input
                                  type="checkbox"
                                  id={location}
                                  name="location"
                                  value={location}
                                  onChange={handleLocationChange}
                                  checked={valueRelocationplace
                                    .split(", ")
                                    .includes(location)}
                                />
                              </div>
                            ))}
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
              </>
            )}
          </div>
          <br />
          <div className="preference-group">
            <label>
              <b>Remote Job</b>
            </label>
            <input
              type="checkbox"
              name="remotejob"
              checked={valueRemotejob === "Remote job"}
              onChange={(e) =>
                setValueRemotejob(e.target.checked ? "Remote job" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Hybrid Job</b>
            </label>
            <input
              type="checkbox"
              name="hybridjob"
              checked={valueHybridjob === "Hybrid job"}
              onChange={(e) =>
                setValueHybridjob(e.target.checked ? "Hybrid job" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>In Person Job</b>
            </label>
            <input
              type="checkbox"
              name="inpersonjob"
              checked={valueInperson === "In person job"}
              onChange={(e) =>
                setValueInperson(e.target.checked ? "In person job" : "")
              }
              onFocus={() => setError("")}
            />
          </div>
          <div className="preference-group">
            <label>
              <b>Temperory Remote Job</b>
            </label>
            <input
              type="checkbox"
              name="valueTemperoryremotejob"
              checked={valueTemperoryremotejob === "Temperory remote job"}
              onChange={(e) =>
                setValueTemperoryremotejob(
                  e.target.checked ? "Temperory remote job" : ""
                )
              }
              onFocus={() => setError("")}
            />
          </div>
          <div style={{ color: "red" }}>{error}</div>

          <button
            onClick={() => {
              if (!valueJobpreferenceName) {
                setError("Job preference name is required");
              } else if (
                !valueMinsalary ||
                isNaN(valueMinsalary) ||
                valueMinsalary <= 0
              ) {
                setError("Minimum salary must be a positive number");
              } else {
                actions
                  .editpreference(
                    store.user.id,
                    valueJobpreferenceName,
                    valueFulltimeJob,
                    valueParttimeJob,
                    valueContractJob,
                    valueTemperoryJob,
                    valueInternship,
                    valueMontoFri,
                    valueWeekendasneeded,
                    valueWeekendonly,
                    valueNoweekend,
                    valueHoliday,
                    valueRotatingweekend,
                    valueWeekdays,
                    valueEveryweekends,
                    valueFourhourshift,
                    valueEighthourshift,
                    valueTenhourshift,
                    valueTwelvehourshift,
                    valueDayshift,
                    valueNightshift,
                    valueEveningshift,
                    valueNonight,
                    valueOvernightshift,
                    valueRotatingshift,
                    valueSplitshift,
                    valueOvertime,
                    valueMinsalary,
                    valueSalarytype,
                    valueRelocation,
                    valueRelocationplace,
                    valueRemotejob,
                    valueHybridjob,
                    valueInperson,
                    valueTemperoryremotejob
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
              setShowdetails(true);
              setEditform(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

UserPreference.propTypes = {
  jobtitlepreference: propTypes.string,
  fulltimeob: propTypes.string,
  parttimejob: propTypes.string,
  contractjob: propTypes.string,
  temperoryjob: propTypes.string,
  internship: propTypes.string,
  mondaytofriday: propTypes.string,
  weekendasneeded: propTypes.string,
  weekendonly: propTypes.string,
  noweekends: propTypes.string,
  holidays: propTypes.string,
  rotatingweekends: propTypes.string,
  weekdays: propTypes.string,
  everyweekend: propTypes.string,
  fourhourshift: propTypes.string,
  eighthourshift: propTypes.string,
  tenhourshift: propTypes.string,
  twelvehourshift: propTypes.string,
  dayshift: propTypes.string,
  nightshift: propTypes.string,
  eveningshift: propTypes.string,
  nonight: propTypes.string,
  overnightshift: propTypes.string,
  rotatingshift: propTypes.string,
  splitshift: propTypes.string,
  overtime: propTypes.string,
  minsalary: propTypes.number,
  salarytype: propTypes.string,
  relocation: propTypes.string,
  relocationplace: propTypes.string,
  remotejob: propTypes.string,
  hybridjob: propTypes.string,
  inperson: propTypes.string,
  temperoryremotejob: propTypes.string,
};
