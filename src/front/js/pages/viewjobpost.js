import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
export const ViewJobPost = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="main">
      {store.seepostjobs
        .filter((item) => {
          return item.id == props.viewid;
        })
        .map((item) => {
          return (
            <div className="container" style={{ margin: "20px" }}>
              <h2 className="card-title" style={{ marginBottom: "10px" }}>
                <b>{item.job_title}</b>
              </h2>
              <h5>
                {item.company_name}, {item.location}
              </h5>
              <p className="card-text" style={{ marginBottom: "10px" }}>
                <p>Job Type: {item.job_type}</p>
                <p>Work Type: {item.work_location_type}</p>
                <p>Education:{item.education_degree}</p>
                <p>{item.working_time}</p>
                <p>Minimum working hours per week:{item.working_hours}</p>
                <p>Weekend required:{item.weekend_job}</p>
                <p>
                  Pay:{item.min_salary}-{item.max_salary}
                </p>
                <p>
                  Experience Level:{item.min_experience}-{item.max_experience}{" "}
                  years
                </p>
              </p>
              <h3>Job Details</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {ReactHtmlParser(item.description)}
              </p>
            </div>
          );
        })}
    </div>
  );
};

ViewJobPost.PropTypes = {
  viewid: PropTypes.number,
};
