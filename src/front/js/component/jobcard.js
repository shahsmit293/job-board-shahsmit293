import React from "react";

export const JobCard = (props) => {
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div className="card">
        <img
          className="card-img-top"
          src={props.image}
          alt="Card image cap"
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
        <div className="container">
          <h5 className="card-title">
            <b>{props.jobtitlename}</b>
          </h5>
          <p className="card-text">Company</p>
          <p className="card-text">Location</p>
          <p className="card-text">Salary</p>
          <p className="card-text">Date posted</p>
          <p className="card-text">Job type</p>
        </div>
        <div className="buttons">
          <button>View</button>
          <button>Don't show again</button>
        </div>
      </div>
    </div>
  );
};

// JobCard.propTypes = {
//   jobtitlename: propTypes.string,
//   company: propTypes.string,
//   location: propTypes.string,
//   salary: propTypes.number,
//   dateposted: propTypes.string,
//   jobtype: propTypes.string,
// };
