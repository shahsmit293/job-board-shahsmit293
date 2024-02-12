import React, { useEffect, useContext, useState } from "react";
import "../../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

export const ViewJobPage = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate("");
  const [replacefile, setReplacefile] = useState("");
  console.log(store.currentviewjobpost);
  if (!store.currentviewjobpost) {
    return <div>Loading...</div>; // or some other placeholder
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0].name);
  };
  const replaceFileChange = (event) => {
    setReplacefile(event.target.files[0]);
  };
  const [valueFirstname, setFirstname] = useState(
    store.user.user_bio == undefined ? "" : `${store.user.user_bio.first_name}`
  );
  const [valueLastname, setLastname] = useState(
    store.user.user_bio == undefined ? "" : `${store.user.user_bio.last_name}`
  );
  const [valueEmail, setEmail] = useState(
    store.user.user_bio == undefined ? "" : `${store.user.email}`
  );
  const [valuePhone, setPhone] = useState(
    store.user.user_bio == undefined
      ? ""
      : `${store.user.user_bio.phone_number}`
  );
  const [viewApply, setApply] = useState(true);
  const [viewContact, setContact] = useState(false);
  const [viewResume, setResume] = useState(false);
  const [viewReplaceresume, setReplaceresume] = useState(false);
  const [viewConfirm, setConfirm] = useState(false);
  const [viewPreview, setPreview] = useState(false);
  const [viewSubmit, setSubmit] = useState(false);
  const [viewconfirmbutton, setconfirmbutton] = useState(false);
  const [viewsubmitted, setsubmitted] = useState(false);
  const [file, setFile] = useState(
    store.resume_detail !== undefined ? store.resume_detail[0].resume_name : ""
  );
  const [showPopup, setShowPopup] = useState(false);
  const handleViewClick = () => {
    setShowPopup(true);
  };

  const timeAgo = (date, time) => {
    const currentDate = new Date();
    const givenDate = new Date(date + "T" + time);
    const diffTime = Math.abs(currentDate - givenDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return "yesterday";
    } else {
      return diffDays + "days ago";
    }
  };
  return (
    <div className="main">
      {viewApply && (
        <div className="applybutton">
          <button
            style={{
              display:
                Array.isArray(store.applliedapplicants) &&
                store.applliedapplicants.some(
                  (item) => item.job.id === store.currentviewjobpost.id
                )
                  ? "none"
                  : "inline",
            }}
            onClick={() => {
              if (!store.useraccessToken) {
                if (window.confirm("Please log in to continue")) {
                  navigate("/jobseekerloginsignup");
                }
              } else {
                (() => {
                  setShowPopup(true);
                  setContact(true);
                  setApply(false);
                  setResume(true);
                  setPreview(true);
                })();
              }
            }}
          >
            Apply now
          </button>
        </div>
      )}
      <div className="container" style={{ margin: "20px" }}>
        <h2 className="card-title" style={{ marginBottom: "10px" }}>
          <b>{store.currentviewjobpost.job_title}</b>
        </h2>
        <h5>
          {store.currentviewjobpost.company_name},{" "}
          {store.currentviewjobpost.location}
        </h5>
        <p className="card-text" style={{ marginBottom: "10px" }}>
          <p>Job Type: {store.currentviewjobpost.job_type}</p>
          <p>Work Type: {store.currentviewjobpost.work_location_type}</p>
          <p>Education:{store.currentviewjobpost.education_degree}</p>
          <p>{store.currentviewjobpost.working_time}</p>
          <p>
            Minimum working hours per week:
            {store.currentviewjobpost.working_hours}
          </p>
          <p>Weekend required:{store.currentviewjobpost.weekend_job}</p>
          <p>
            Pay:{store.currentviewjobpost.min_salary}-
            {store.currentviewjobpost.max_salary}
          </p>
          <p>
            Experience Level:{store.currentviewjobpost.min_experience}-
            {store.currentviewjobpost.max_experience} years
          </p>
          <p>
            Posted:
            {timeAgo(
              store.currentviewjobpost.current_date,
              store.currentviewjobpost.current_time
            )}
          </p>
        </p>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {ReactHtmlParser(store.currentviewjobpost.description)}
        </p>

        {showPopup && (
          <div className="popup">
            <button
              className="styled-button"
              onClick={() => {
                setShowPopup(false);
                setApply(true);
              }}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div className="application">
              {viewContact && (
                <div className="contactinformation">
                  <div>
                    <label>First Name:</label>
                    <input
                      typeof="text"
                      value={valueFirstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div>
                    <label>Last Name:</label>
                    <input
                      typeof="text"
                      value={valueLastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div>
                    <label>Phone Number:</label>
                    <input
                      typeof="number"
                      value={valuePhone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      typeof="email"
                      value={valueEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
              )}
              {viewResume &&
                (!store.resume_detail ? (
                  <div>
                    <label>Resume:</label>
                    <input type="file" onChange={replaceFileChange}></input>
                  </div>
                ) : (
                  <>
                    {store.resume_detail.map((item) => {
                      return (
                        <>
                          <div style={{ display: "flex" }}>
                            <label>Resume:</label>
                            <h5>{item.resume_name}</h5>
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                actions.downloadResume(store.user.id)
                              }
                            >
                              Download Resume
                            </button>
                            <button
                              onClick={() => {
                                setReplaceresume(true);
                                setResume(false);
                              }}
                            >
                              Replace Resume
                            </button>
                          </div>
                        </>
                      );
                    })}
                  </>
                ))}

              {viewReplaceresume && (
                <>
                  <div>
                    <label>Resume</label>
                    <input type="file" onChange={replaceFileChange}></input>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setResume(true);
                        setReplaceresume(false);
                        setReplacefile("");
                      }}
                    >
                      Back
                    </button>
                  </div>
                </>
              )}
              {viewPreview && (
                <div>
                  <button
                    onClick={() => {
                      setConfirm(true);
                      setPreview(false);
                      setContact(false);
                      setResume(false);
                      setReplaceresume(false);
                      setconfirmbutton(true);
                    }}
                  >
                    Preview
                  </button>
                </div>
              )}
              {viewConfirm && (
                <div className="confirm">
                  <h3>Sending Information.....</h3>
                  <h4>
                    <b>First Name</b> {"   "}
                    {valueFirstname}
                  </h4>
                  <h4>
                    <b>Last Name</b>:{"   "} {valueLastname}
                  </h4>
                  <h4>
                    <b>Phone Number</b>:{"   "}
                    {valuePhone}
                  </h4>
                  <h4>
                    <b>Email</b>:{"   "} {valueEmail}
                  </h4>
                  <h4>
                    <b>Resume</b>: {"   "}{" "}
                    {replacefile ? replacefile.name : file}
                  </h4>
                  <button
                    onClick={() => {
                      setPreview(true);
                      setContact(true);
                      setConfirm(false);
                      setResume(true);
                      setSubmit(false);
                      setReplacefile("");
                    }}
                  >
                    Go Back
                  </button>
                  {viewconfirmbutton && (
                    <button
                      onClick={() => {
                        if (
                          valueFirstname &&
                          valueLastname &&
                          valuePhone &&
                          valueEmail &&
                          (replacefile || file)
                        ) {
                          setSubmit(true);
                          setconfirmbutton(false);
                        } else {
                          alert("please fill all the detail");
                        }
                      }}
                    >
                      Confirm
                    </button>
                  )}

                  {viewSubmit && (
                    <button
                      onClick={() => {
                        if (replacefile) {
                          actions.addsentresume(
                            store.user.id,
                            store.currentviewjobpost.id,
                            replacefile
                          );
                        }
                        actions
                          .addapplicant(
                            store.user.id,
                            valueEmail,
                            valueFirstname,
                            valueLastname,
                            valuePhone,
                            store.currentviewjobpost.id,
                            store.currentviewjobpost.employer_id
                          )
                          .then(() => actions.getapplicant(store.user.id));
                        setsubmitted(true);
                        setSubmit(false);
                        setConfirm(false);
                        setShowPopup(false);
                        // actions.sendemailforapply(
                        //   valueEmail,
                        //   store.currentviewjobpost.company_name,
                        //   store.currentviewjobpost.job_title,
                        //   store.currentviewjobpost.location
                        // );
                      }}
                    >
                      Submit
                    </button>
                  )}
                </div>
              )}
              {viewsubmitted && (
                <p style={{ backgroundColor: "green" }}>Submitted</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ViewJobPage.PropTypes = {
  id: PropTypes.number,
  displayapply: PropTypes.string,
};
