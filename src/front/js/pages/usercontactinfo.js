import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
export const UserContactInfo = (props) => {
  const { store, actions } = useContext(Context);
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
    <div className="contactinfo">
      {showdetails && (
        <div className="details">
          <h4>FIRST NAME:{props.firstname}</h4>
          <h4>LAST NAME:{props.lastname}</h4>
          <h4>LOCATION:{props.location} </h4>
          <h4>PHONEN NUMBER:{props.phonenumber} </h4>
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
        <div className="form">
          <label>FIRST NAME:</label>
          <input
            typeof="text"
            value={valueFirstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          ></input>
          <label>LAST NAME:</label>
          <input
            typeof="text"
            value={valueLastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          ></input>
          <label>Location:</label>
          <input
            typeof="text"
            value={valueLocation}
            onChange={(e) => setLocation(e.target.value)}
            required
          ></input>
          <label>Phone Number:</label>
          <input
            typeof="number"
            value={valuePhone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
          <button
            onClick={() => {
              actions.adduserbio(
                store.user.id,
                valueFirstname,
                valueLastname,
                valueLocation,
                valuePhone
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
          <label>FIRST NAME:</label>
          <input
            typeof="text"
            value={valueFirstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          ></input>
          <label>LAST NAME:</label>
          <input
            typeof="text"
            value={valueLastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          ></input>
          <label>Location:</label>
          <input
            typeof="text"
            value={valueLocation}
            onChange={(e) => setLocation(e.target.value)}
            required
          ></input>
          <label>Phone Number:</label>
          <input
            typeof="number"
            value={valuePhone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
          <button
            onClick={() => {
              actions
                .editbio(
                  store.user.id,
                  valueFirstname,
                  valueLastname,
                  valueLocation,
                  valuePhone
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

UserContactInfo.propTypes = {
  firstname: propTypes.string,
  lastname: propTypes.string,
  location: propTypes.string,
  phonenumber: propTypes.number,
};
