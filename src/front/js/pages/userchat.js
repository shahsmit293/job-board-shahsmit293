import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Userchat = (props) => {
  const { store, actions } = useContext(Context);
  const { job_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      actions
        .getapplicantchats(store.user.id, job_id)
        .then(() =>
          actions.getemployerchatsforapplicants(store.user.id, job_id)
        ),
    ]).then(() => setLoading(false));
  }, [store.user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Your arrays
  let applicantchats = Array.isArray(store.applicantchats)
    ? store.applicantchats
    : [];
  let employerchatsforapplicant = Array.isArray(store.employerchatsforapplicant)
    ? store.employerchatsforapplicant
    : [];

  // Add a property to identify the source array
  applicantchats = applicantchats.map((item) => ({
    ...item,
    source: "applicantchats",
  }));
  employerchatsforapplicant = employerchatsforapplicant.map((item) => ({
    ...item,
    source: "employerchatsforapplicant",
  }));

  // Merge and sort the arrays
  let merged = [...applicantchats, ...employerchatsforapplicant].sort(
    (a, b) => {
      // Compare dates first
      let dateComparison = a.current_date.localeCompare(b.current_date);
      if (dateComparison !== 0) return dateComparison;

      // If dates are equal, compare times
      return a.current_time.localeCompare(b.current_time);
    }
  );

  return (
    <div className="jumbotron">
      <input
        type="text"
        placeholder="start chat here.............."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></input>
      <button
        onClick={() => {
          actions
            .addapplicantchats(store.user.id, +job_id, message)
            .then(() => actions.getapplicantchats(store.user.id, job_id))
            .then(() => setMessage(""));
        }}
      >
        Send
      </button>
      {merged.map((item, index) => (
        <p
          key={index}
          style={{
            textAlign:
              item.source === "employerchatsforapplicant" ? "left" : "right",
          }}
        >
          {item.message}
        </p>
      ))}
    </div>
  );
};
