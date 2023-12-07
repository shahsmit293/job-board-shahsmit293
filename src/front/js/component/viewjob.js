import React from "react";

export const ViewJob = (props) => {
  return (
    <div className="job">
      <div className="job title">job title: </div>
      <div className="companydetails">
        <h4>company name:</h4>
        <h4>job posted days ago:</h4>
        <h4>job type:</h4>
        <h4>remote or onsite or hybrid</h4>
      </div>
      <div className="job details">
        <h1>About job</h1>
        <p>details here</p>
      </div>
      <div className="button">
        <button>Apply</button>
        <button>Save</button>
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
