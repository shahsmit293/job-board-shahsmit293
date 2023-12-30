import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Employerchat = (props) => {
  const { store, actions } = useContext(Context);
  const { user_id, job_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      actions
        .getemployerchats(user_id, job_id)
        .then(() => actions.getapplicantchatsforemployer(user_id, job_id)),
    ]).then(() => setLoading(false));
  }, [store.employer.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Your arrays
  let employerchats = Array.isArray(store.employerchat)
    ? store.employerchat
    : [];
  let applicantchatsforemployers = Array.isArray(
    store.applicantchatsforemployer
  )
    ? store.applicantchatsforemployer
    : [];

  // Add a property to identify the source array
  employerchats = employerchats.map((item) => ({
    ...item,
    source: "employerchats",
  }));
  applicantchatsforemployers = applicantchatsforemployers.map((item) => ({
    ...item,
    source: "applicantchatsforemployers",
  }));

  // Merge and sort the arrays
  let merged = [...employerchats, ...applicantchatsforemployers].sort(
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
        onClick={() =>
          actions
            .addemployerchats(+user_id, job_id, message)
            .then(() => actions.getemployerchats(+user_id, job_id, message))
            .then(() => setMessage(""))
        }
      >
        Send
      </button>
      {merged.map((item, index) => {
        // Create Date objects for the current date and the item's date
        const currentDate = new Date();
        const itemDate = new Date(item.current_date);

        // Calculate the difference in time and convert it to days
        const diffTime = Math.abs(currentDate - itemDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Array of days
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        let displayDate;

        if (diffDays === 0) {
          displayDate = "Today";
        } else if (diffDays === 1) {
          displayDate = "Yesterday";
        } else if (diffDays < 7) {
          displayDate = daysOfWeek[itemDate.getDay()];
        } else {
          displayDate = item.current_date;
        }

        return (
          <p
            key={index}
            style={{
              textAlign: item.source === "employerchats" ? "right" : "left",
            }}
          >
            {item.message} (Posted {displayDate})
          </p>
        );
      })}
    </div>
  );
};
