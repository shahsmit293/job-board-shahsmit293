import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";

export const UserPreference = (props) => {
  const { store, actions } = useContext(Context);
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
    <div className="contactinfo">
      {showdetails && (
        <div className="details">
          <h4>Job Titles:{props.jobtitlepreference}</h4>
          <h4>
            Job Types:{props.fulltimeob}
            {props.parttimejob}
            {props.contractjob}
            {props.temperoryjob}
            {props.internship}
          </h4>
          <h4>
            Work Schedule:{props.mondaytofriday}
            {props.weekendasneeded}
            {props.weekendonly}
            {props.noweekends}
            {props.holidays}
            {props.rotatingweekends}
            {props.weekdays}
            {props.everyweekend}
            {props.fourhourshift}
            {props.eighthourshift}
            {props.tenhourshift}
            {props.twelvehourshift}
            {props.dayshift}
            {props.nightshift}
            {props.eveningshift}
            {props.nonight}
            {props.overnightshift}
            {props.rotatingshift}
            {props.splitshift}
            {props.overtime}{" "}
          </h4>
          <h4>
            Minimum Pay:{props.minsalary}
            {props.salarytype}
          </h4>
          <h4>
            Relocation:{props.relocation}
            {props.relocationplace}{" "}
          </h4>
          <h4>
            Remote:{props.remotejob}
            {props.hybridjob}
            {props.inperson}
            {props.temperoryremotejob}
            {props.temperoryjob}{" "}
          </h4>
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
            <button
              onClick={() => {
                setShowdetails(false);
                setEditform(true);
              }}
            >
              edit
            </button>
          )}
        </div>
      )}

      {addForm && (
        <div className="form">
          <label>JOB PREFERENCE NAME:</label>
          <input
            typeof="text"
            value={valueJobpreferenceName}
            onChange={(e) => setJobpreferenceName(e.target.value)}
            required
          ></input>
          <label>Full-time:</label>
          <input
            type="checkbox"
            name="fulltime"
            onChange={(e) =>
              setValueFulltimeJob(e.target.checked ? "Fulltimejob" : "No")
            }
          />
          <label>Part-time:</label>
          <input
            type="checkbox"
            name="parttime"
            onChange={(e) =>
              setParttimeJob(e.target.checked ? "Parttime" : "No")
            }
          />
          <label>Contract:</label>
          <input
            type="checkbox"
            name="contract"
            onChange={(e) =>
              setValueContractJob(e.target.checked ? "Contractjob" : "No")
            }
          />
          <label>Temporary:</label>
          <input
            type="checkbox"
            name="temperory"
            onChange={(e) =>
              setValueTemperoryJob(e.target.checked ? "Temperoryjob" : "No")
            }
          />
          <label>Internship:</label>
          <input
            type="checkbox"
            name="internship"
            onChange={(e) =>
              setValueInternship(e.target.checked ? "Internship" : "No")
            }
          />
          <label>Monday to Friday:</label>
          <input
            type="checkbox"
            name="mondaytofriday"
            onChange={(e) =>
              setValueMontoFri(e.target.checked ? "Monday-to-Friday" : "No")
            }
          />
          <label>Weekends as needed:</label>
          <input
            type="checkbox"
            name="weekendasneeded"
            onChange={(e) =>
              setValueWeekendasneeded(
                e.target.checked ? "Weekend as needed" : "No"
              )
            }
          />
          <label>Weekends only:</label>
          <input
            type="checkbox"
            name="weekendsonly"
            onChange={(e) =>
              setValueWeekendonly(e.target.checked ? "Weekend Only" : "No")
            }
          />
          <label>No weekends:</label>
          <input
            type="checkbox"
            name="noweekends"
            onChange={(e) =>
              setValueNoweekend(e.target.checked ? "No weekend" : "No")
            }
          />
          <label>Holidays:</label>
          <input
            type="checkbox"
            name="holidays"
            onChange={(e) =>
              setValueHoliday(e.target.checked ? "Holiday" : "No")
            }
          />
          <label>Rotating weekends:</label>
          <input
            type="checkbox"
            name="rotatingweekends"
            onChange={(e) =>
              setValueRotatingweekend(
                e.target.checked ? "Rotating Weekend" : "No"
              )
            }
          />
          <label>Weekdays:</label>
          <input
            type="checkbox"
            name="weekdays"
            onChange={(e) =>
              setValueWeekdays(e.target.checked ? "Weekdays" : "No")
            }
          />
          <label>Every weekend:</label>
          <input
            type="checkbox"
            name="everyweekend"
            onChange={(e) =>
              setValueEveryweekends(e.target.checked ? "Every Weekends" : "No")
            }
          />
          <label>4 hour shift:</label>
          <input
            type="checkbox"
            name="fourhourshift"
            onChange={(e) =>
              setValueFourhourshift(e.target.checked ? "4-Hour shift" : "No")
            }
          />
          <label>8 hour shift:</label>
          <input
            type="checkbox"
            name="eighthourshift"
            onChange={(e) =>
              setValueEighthourshift(e.target.checked ? "8-hour shift" : "No")
            }
          />
          <label>10 hour shift:</label>
          <input
            type="checkbox"
            name="tenhourshift"
            onChange={(e) =>
              setValueTenhourshift(e.target.checked ? "10-hour shift" : "No")
            }
          />
          <label>12 hour shift:</label>
          <input
            type="checkbox"
            name="twelvehourshift"
            onChange={(e) =>
              setValueTwelvehourshift(e.target.checked ? "12-hour shift" : "No")
            }
          />
          <label>Day shift:</label>
          <input
            type="checkbox"
            name="dayshift"
            onChange={(e) =>
              setValueDayshift(e.target.checked ? "Day shift" : "No")
            }
          />
          <label>Night shift:</label>
          <input
            type="checkbox"
            name="nightshift"
            onChange={(e) =>
              setValueNightshift(e.target.checked ? "Night shift" : "No")
            }
          />
          <label>Evening shift:</label>
          <input
            type="checkbox"
            name="eveningshift"
            onChange={(e) =>
              setValueEveningshift(e.target.checked ? "Evening shift" : "No")
            }
          />
          <label>No nights:</label>
          <input
            type="checkbox"
            name="nonights"
            onChange={(e) =>
              setValueNonight(e.target.checked ? "No nights" : "No")
            }
          />
          <label>Overnight shift:</label>
          <input
            type="checkbox"
            name="overnightshift"
            onChange={(e) =>
              setValueOvernightshift(
                e.target.checked ? "Overnight shift" : "No"
              )
            }
          />

          <label>Rotating shift:</label>
          <input
            type="checkbox"
            name="rotatingshift"
            onChange={(e) =>
              setValueRotatingshift(e.target.checked ? "Rotating shift" : "No")
            }
          />
          <label>Split shift:</label>
          <input
            type="checkbox"
            name="splitshift"
            onChange={(e) =>
              setValueSplitshift(e.target.checked ? "Split shift" : "No")
            }
          />
          <label>Overtime:</label>
          <input
            type="checkbox"
            name="overtine"
            onChange={(e) =>
              setValueOvertime(e.target.checked ? "Overtime" : "No")
            }
          />
          <label>MINIMUM SALARY:</label>
          <input
            typeof="number"
            value={valueMinsalary}
            onChange={(e) => setValueMinsalary(e.target.value)}
            required
          ></input>
          <label htmlFor="salary">Choose a salary type:</label>
          <select
            name="salary"
            id="salary"
            value={valueSalarytype}
            onChange={(e) => setValueSalarytype(e.target.value)}
          >
            <option value="per hour">per hour</option>
            <option value="per week">per week</option>
            <option value="per month">per month</option>
            <option value="per year">per year</option>
          </select>
          <label>relocation:</label>
          <input
            type="checkbox"
            name="relocation"
            onChange={(e) => {
              setValueRelocation(e.target.checked ? "Yes" : "No");
              setValueRelocationplace("");
            }}
          />
          {valueRelocation === "Yes" && (
            <>
              <label htmlFor="anywhere">Anywhere</label>
              <input
                type="radio"
                id="anywhere"
                name="relocationOption"
                value="anywhere"
                onChange={(e) => setValueRelocationplace(e.target.value)}
              />
              <br />
              <label htmlFor="chhoselocation">choose location</label>
              <input
                type="radio"
                id="chooselocation"
                name="relocationOption"
                value="chooselocation"
                onChange={(e) => setValueRelocationplace(e.target.value)}
              />
              <br />
              {valueRelocationplace !== "anywhere" &&
                valueRelocationplace !== "" && (
                  <>
                    <label>Choose location</label>
                    <div>
                      <input
                        type="checkbox"
                        id="NJ"
                        name="location"
                        value="NJ"
                        onChange={handleLocationChange}
                      />
                      <label htmlFor="NJ">NJ</label>
                      <br />
                      <input
                        type="checkbox"
                        id="NY"
                        name="location"
                        value="NY"
                        onChange={handleLocationChange}
                      />
                      <label htmlFor="NY">NY</label>
                      <br />
                      <input
                        type="checkbox"
                        id="PA"
                        name="location"
                        value="PA"
                        onChange={handleLocationChange}
                      />
                      <label htmlFor="PA">PA</label>
                      <br />
                      {/* Add all other states here */}
                    </div>
                  </>
                )}
            </>
          )}
          <br />
          <label>remote job:</label>
          <input
            type="checkbox"
            name="remotejob"
            onChange={(e) =>
              setValueRemotejob(e.target.checked ? "Remote job" : "No")
            }
          />
          <label>hybrid job:</label>
          <input
            type="checkbox"
            name="hybridjob"
            onChange={(e) =>
              setValueHybridjob(e.target.checked ? "Hybrid job" : "No")
            }
          />
          <label>In person job::</label>
          <input
            type="checkbox"
            name="inpersonjob"
            onChange={(e) =>
              setValueInperson(e.target.checked ? "In person job" : "No")
            }
          />
          <label>Temperory remote job:</label>
          <input
            type="checkbox"
            name="temperoryremotejob"
            onChange={(e) =>
              setValueTemperoryremotejob(
                e.target.checked ? "Temperory remote job" : "No"
              )
            }
          />
          <button
            onClick={() => {
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
        <div className="form">
          <label>JOB PREFERENCE NAME:</label>
          <input
            typeof="text"
            value={valueJobpreferenceName}
            onChange={(e) => setJobpreferenceName(e.target.value)}
            required
          ></input>
          <label>Full-time:</label>
          <input
            type="checkbox"
            name="fulltime"
            checked={valueFulltimeJob === "Fulltimejob"}
            onChange={(e) =>
              setValueFulltimeJob(e.target.checked ? "Fulltimejob" : "No")
            }
          />
          <label>Part-time:</label>
          <input
            type="checkbox"
            name="parttime"
            checked={valueParttimeJob === "Parttime"}
            onChange={(e) =>
              setParttimeJob(e.target.checked ? "Parttime" : "No")
            }
          />
          <label>Contract:</label>
          <input
            type="checkbox"
            name="contract"
            checked={valueContractJob === "Contractjob"}
            onChange={(e) =>
              setValueContractJob(e.target.checked ? "Contractjob" : "No")
            }
          />
          <label>Temporary:</label>
          <input
            type="checkbox"
            name="temperory"
            checked={valueTemperoryJob === "Temperoryjob"}
            onChange={(e) =>
              setValueTemperoryJob(e.target.checked ? "Temperoryjob" : "No")
            }
          />
          <label>Internship:</label>
          <input
            type="checkbox"
            name="internship"
            checked={valueInternship === "Internship"}
            onChange={(e) =>
              setValueInternship(e.target.checked ? "Internship" : "No")
            }
          />
          <label>Monday to Friday:</label>
          <input
            type="checkbox"
            name="mondaytofriday"
            checked={valueMontoFri === "Monday-to-Friday"}
            onChange={(e) =>
              setValueMontoFri(e.target.checked ? "Monday-to-Friday" : "No")
            }
          />
          <label>Weekends as needed:</label>
          <input
            type="checkbox"
            name="weekendasneeded"
            checked={valueWeekendasneeded === "Weekend as needed"}
            onChange={(e) =>
              setValueWeekendasneeded(
                e.target.checked ? "Weekend as needed" : "No"
              )
            }
          />
          <label>Weekends only:</label>
          <input
            type="checkbox"
            name="weekendsonly"
            checked={valueWeekendonly === "Weekend Only"}
            onChange={(e) =>
              setValueWeekendonly(e.target.checked ? "Weekend Only" : "No")
            }
          />
          <label>No weekends:</label>
          <input
            type="checkbox"
            name="noweekends"
            checked={valueNoweekend === "No weekend"}
            onChange={(e) =>
              setValueNoweekend(e.target.checked ? "No weekend" : "No")
            }
          />
          <label>Holidays:</label>
          <input
            type="checkbox"
            name="holidays"
            checked={valueHoliday === "Holiday"}
            onChange={(e) =>
              setValueHoliday(e.target.checked ? "Holiday" : "No")
            }
          />
          <label>Rotating weekends:</label>
          <input
            type="checkbox"
            name="rotatingweekends"
            checked={valueRotatingweekend === "Rotating Weekend"}
            onChange={(e) =>
              setValueRotatingweekend(
                e.target.checked ? "Rotating Weekend" : "No"
              )
            }
          />
          <label>Weekdays:</label>
          <input
            type="checkbox"
            name="weekdays"
            checked={valueWeekdays === "Weekdays"}
            onChange={(e) =>
              setValueWeekdays(e.target.checked ? "Weekdays" : "No")
            }
          />
          <label>Every weekend:</label>
          <input
            type="checkbox"
            name="everyweekend"
            checked={valueEveryweekends === "Every Weekends"}
            onChange={(e) =>
              setValueEveryweekends(e.target.checked ? "Every Weekends" : "No")
            }
          />
          <label>4 hour shift:</label>
          <input
            type="checkbox"
            name="fourhourshift"
            checked={valueFourhourshift === "4-Hour shift"}
            onChange={(e) =>
              setValueFourhourshift(e.target.checked ? "4-Hour shift" : "No")
            }
          />
          <label>8 hour shift:</label>
          <input
            type="checkbox"
            name="eighthourshift"
            checked={valueEighthourshift === "8-hour shift"}
            onChange={(e) =>
              setValueEighthourshift(e.target.checked ? "8-hour shift" : "No")
            }
          />
          <label>10 hour shift:</label>
          <input
            type="checkbox"
            name="tenhourshift"
            checked={valueTenhourshift === "10-hour shift"}
            onChange={(e) =>
              setValueTenhourshift(e.target.checked ? "10-hour shift" : "No")
            }
          />
          <label>12 hour shift:</label>
          <input
            type="checkbox"
            name="twelvehourshift"
            checked={valueTwelvehourshift === "12-hour shift"}
            onChange={(e) =>
              setValueTwelvehourshift(e.target.checked ? "12-hour shift" : "No")
            }
          />
          <label>Day shift:</label>
          <input
            type="checkbox"
            name="dayshift"
            checked={valueDayshift === "Day shift"}
            onChange={(e) =>
              setValueDayshift(e.target.checked ? "Day shift" : "No")
            }
          />
          <label>Night shift:</label>
          <input
            type="checkbox"
            name="nightshift"
            checked={valueNightshift === "Night shift"}
            onChange={(e) =>
              setValueNightshift(e.target.checked ? "Night shift" : "No")
            }
          />
          <label>Evening shift:</label>
          <input
            type="checkbox"
            name="eveningshift"
            checked={valueEveningshift === "Evening shift"}
            onChange={(e) =>
              setValueEveningshift(e.target.checked ? "Evening shift" : "No")
            }
          />
          <label>No nights:</label>
          <input
            type="checkbox"
            name="nonights"
            checked={valueNonight === "No nights"}
            onChange={(e) =>
              setValueNonight(e.target.checked ? "No nights" : "No")
            }
          />
          <label>Overnight shift:</label>
          <input
            type="checkbox"
            name="overnightshift"
            checked={valueOvernightshift === "overnight shift"}
            onChange={(e) =>
              setValueOvernightshift(
                e.target.checked ? "Overnight shift" : "No"
              )
            }
          />

          <label>Rotating shift:</label>
          <input
            type="checkbox"
            name="rotatingshift"
            checked={valueRotatingshift === "Rotating shift"}
            onChange={(e) =>
              setValueRotatingshift(e.target.checked ? "Rotating shift" : "No")
            }
          />
          <label>Split shift:</label>
          <input
            type="checkbox"
            name="splitshift"
            checked={valueSplitshift === "Split shift"}
            onChange={(e) =>
              setValueSplitshift(e.target.checked ? "Split shift" : "No")
            }
          />
          <label>Overtime:</label>
          <input
            type="checkbox"
            name="overtine"
            checked={valueOvernightshift === "Overtime"}
            onChange={(e) =>
              setValueOvertime(e.target.checked ? "Overtime" : "No")
            }
          />
          <label>MINIMUM SALARY:</label>
          <input
            typeof="number"
            value={valueMinsalary}
            onChange={(e) => setValueMinsalary(e.target.value)}
            required
          ></input>
          <label htmlFor="salary">Choose a salary type:</label>
          <select
            name="salary"
            id="salary"
            value={valueSalarytype}
            onChange={(e) => setValueSalarytype(e.target.value)}
          >
            <option value="per hour">per hour</option>
            <option value="per week">per week</option>
            <option value="per month">per month</option>
            <option value="per year">per year</option>
          </select>
          <label>relocation:</label>
          <input
            type="checkbox"
            name="relocation"
            checked={valueRelocation == "Yes"}
            onChange={(e) => {
              setValueRelocation(e.target.checked ? "Yes" : "No");
              setValueRelocationplace("");
            }}
          />
          {valueRelocation === "Yes" && (
            <>
              <label htmlFor="anywhere">Anywhere</label>
              <input
                type="radio"
                id="anywhere"
                name="relocationOption"
                value="anywhere"
                checked={valueRelocationplace === "anywhere"}
                onChange={(e) => setValueRelocationplace(e.target.value)}
              />
              <br />
              <label htmlFor="chhoselocation">choose location</label>
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
              />
              <br />
              {valueRelocationplace !== "anywhere" &&
                valueRelocationplace !== "" && (
                  <>
                    <label>Choose location</label>
                    <div>
                      <input
                        type="checkbox"
                        id="NJ"
                        name="location"
                        value="NJ"
                        onChange={handleLocationChange}
                      />
                      <label htmlFor="NJ">NJ</label>
                      <br />
                      <input
                        type="checkbox"
                        id="NY"
                        name="location"
                        value="NY"
                        onChange={handleLocationChange}
                      />
                      <label htmlFor="NY">NY</label>
                      <br />
                      <input
                        type="checkbox"
                        id="PA"
                        name="location"
                        value="PA"
                        onChange={handleLocationChange}
                      />
                      <label htmlFor="PA">PA</label>
                      <br />
                      {/* Add all other states here */}
                    </div>
                  </>
                )}
            </>
          )}
          <br />
          <label>remote job:</label>
          <input
            type="checkbox"
            name="remotejob"
            checked={valueRemotejob === "Remote job"}
            onChange={(e) =>
              setValueRemotejob(e.target.checked ? "Remote job" : "No")
            }
          />
          <label>hybrid job:</label>
          <input
            type="checkbox"
            name="hybridjob"
            checked={valueHybridjob === "Hybrid job"}
            onChange={(e) =>
              setValueHybridjob(e.target.checked ? "Hybrid job" : "No")
            }
          />
          <label>In person job::</label>
          <input
            type="checkbox"
            name="inpersonjob"
            checked={valueInperson === "In person job"}
            onChange={(e) =>
              setValueInperson(e.target.checked ? "In person job" : "No")
            }
          />
          <label>Temperory remote job:</label>
          <input
            type="checkbox"
            name="temperoryremotejob"
            checked={valueInperson === "Temperory remote job"}
            onChange={(e) =>
              setValueTemperoryremotejob(
                e.target.checked ? "Temperory remote job" : "No"
              )
            }
          />
          <button
            onClick={() => {
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
