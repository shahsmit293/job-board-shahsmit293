import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/usercontactinfo.css";
import LocationSearchInput from "../locationSearchInput";

import propTypes from "prop-types";
export const UserContactInfo = (props) => {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState("");

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
        <div className="contactdetails">
          <p>
            <b>First Name</b>: {props.firstname}
          </p>
          <p>
            <b>Last Name</b>: {props.lastname}
          </p>
          <p>
            <b>Location</b>: {props.location}{" "}
          </p>
          <p>
            <b>Contact Number</b>: {props.phonenumber}{" "}
          </p>
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
          <div className="contact-group">
            <label>First Name</label>
            <input
              typeof="text"
              value={valueFirstname}
              onChange={(e) => setFirstname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="contact-group">
            <label>
              <b>Last Name</b>
            </label>
            <input
              typeof="text"
              value={valueLastname}
              onChange={(e) => setLastname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="contact-group">
            {/* <label>
              <b>Location</b>
            </label>
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
            </select> */}
            <label>Address:</label>
            <LocationSearchInput
              setLocation={setLocation}
              location={valueLocation}
            />
          </div>
          <div className="contact-group">
            <label>
              <b>Contact Number</b>
            </label>
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
          <div className="contact-group">
            <label>
              <b>First Name</b>
            </label>
            <input
              typeof="text"
              value={valueFirstname}
              onChange={(e) => setFirstname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="contact-group">
            <label>
              <b>Last Name</b>
            </label>
            <input
              typeof="text"
              value={valueLastname}
              onChange={(e) => setLastname(e.target.value)}
              onFocus={() => setError("")}
              required
            ></input>
          </div>
          <div className="contact-group">
            <label>
              <b>Address</b>
            </label>
            <LocationSearchInput
              setLocation={setLocation}
              location={valueLocation}
            />
          </div>
          <div className="contact-group">
            <label>
              <b>Contact Number</b>
            </label>
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
