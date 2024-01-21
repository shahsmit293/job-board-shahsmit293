import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import propTypes from "prop-types";
export const UserContactInfo = (props) => {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState("");
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
  useEffect(() => {
    actions.getuserbio(
      store.user.id,
      setFirstname,
      setLastname,
      setLocation,
      setPhone
    );
  }, [store.user.id]);
  const [showdetails, setShowdetails] = useState(true);
  const [addForm, setaddform] = useState(false);
  const [editForm, setEditform] = useState(false);
  const [valueFirstname, setFirstname] = useState(
    props.firstname ? props.firstname : ""
  );
  const [valueLastname, setLastname] = useState(
    props.lastname ? props.lastname : ""
  );
  const [valueLocation, setLocation] = useState(
    props.location ? props.location : ""
  );
  const [valuePhone, setPhone] = useState(
    props.phonenumber ? props.phonenumber : ""
  );
  return (
    <div className="contacts">
      {showdetails && (
        <div className="showdetails">
          <h4>
            <b>First Name</b>: {props.firstname}
          </h4>
          <h4>
            <b>Last Name</b>: {props.lastname}
          </h4>
          <h4>
            <b>Location</b>: {props.location}{" "}
          </h4>
          <h4>
            <b>Contact Number</b>: {props.phonenumber}{" "}
          </h4>
          {!props.firstname &&
          !props.lastname &&
          !props.location &&
          !props.phonenumber ? (
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
        <div className="addform">
          <div className="form-group">
            <h4>
              <b>First Name</b>
            </h4>
            <input
              typeof="text"
              value={valueFirstname}
              onChange={(e) => setFirstname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="form-group">
            <h4>
              <b>Last Name</b>
            </h4>
            <input
              typeof="text"
              value={valueLastname}
              onChange={(e) => setLastname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="form-group">
            <h4>
              <b>Location</b>
            </h4>
            <select>
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
          <div className="form-group">
            <h4>
              <b>Contact Number</b>
            </h4>
            <input
              type="tel"
              id="phoneNumber"
              maxlength="20"
              name="phoneNumber"
              value={valuePhone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              const isNum = /^\d+$/.test(valuePhone);
              if (
                !valueFirstname ||
                !valueLastname ||
                !valueLocation ||
                !valuePhone
              ) {
                setError("All fields are required");
              } else if (!isNum) {
                setError("Contact number must be a positive number");
              } else {
                actions.adduserbio(
                  store.user.id,
                  valueFirstname,
                  valueLastname,
                  valueLocation,
                  valuePhone
                );
                setError("");
              }
            }}
          >
            Add
          </button>
        </div>
      )}
      {editForm && (
        <div className="editform">
          <div className="form-group">
            <h4>
              <b>First Name</b>
            </h4>
            <input
              typeof="text"
              value={valueFirstname}
              onChange={(e) => setFirstname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="form-group">
            <h4>
              <b>Last Name</b>
            </h4>
            <input
              typeof="text"
              value={valueLastname}
              onChange={(e) => setLastname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="form-group">
            <h4>
              <b>Location</b>
            </h4>
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
          <div className="form-group">
            <h4>
              <b>Contact Number</b>
            </h4>
            <input
              type="tel"
              id="phoneNumber"
              maxlength="20"
              name="phoneNumber"
              value={valuePhone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setError("")}
            />
          </div>
          <div style={{ color: "red" }}>{error}</div>
          <button
            onClick={() => {
              const isNum = /^\d+$/.test(valuePhone);
              if (
                !valueFirstname ||
                !valueLastname ||
                !valueLocation ||
                !valuePhone
              ) {
                setError("All fields are required");
              } else if (!isNum) {
                setError("Contact number must be a number");
              } else {
                actions
                  .editbio(
                    store.user.id,
                    valueFirstname,
                    valueLastname,
                    valueLocation,
                    valuePhone
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

UserContactInfo.propTypes = {
  firstname: propTypes.string,
  lastname: propTypes.string,
  location: propTypes.string,
  phonenumber: propTypes.number,
};
