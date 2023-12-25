import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const ViewJobPage = (props) => {
  const { store, actions } = useContext(Context);
  const [replacefile, setReplacefile] = useState("");
  const handleFileChange = (event) => {
    setFile(event.target.files[0].name);
  };
  const replaceFileChange = (event) => {
    setReplacefile(event.target.files[0]);
  };
  const [valueFirstname, setFirstname] = useState(
    `${store.user.user_bio.first_name}`
  );
  const [valueLastname, setLastname] = useState(
    `${store.user.user_bio.last_name}`
  );
  const [valueEmail, setEmail] = useState(`${store.user.email}`);
  const [valuePhone, setPhone] = useState(
    `${store.user.user_bio.phone_number}`
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

  // const {viewid} = useParams();
  // let id = parseInt(viewid);
  // useEffect(() => {
  //   actions.viewjob(props.id);
  // }, []);
  console.log(store.currentviewjobpost);
  if (!store.currentviewjobpost) {
    return <div>Loading...</div>; // or some other placeholder
  }

  const [file, setFile] = useState(
    store.resume_detail !== undefined ? store.resume_detail[0].resume_name : ""
  );

  return (
    <div className="main">
      <div className="container">
        <h5 className="card-title">
          <b>JOB TITITLE:{store.currentviewjobpost.job_title}</b>
        </h5>
        <p className="card-text">COMPANY NAME:</p>
        <p className="card-text">LOCATION:</p>
        <p className="card-text">JOBTYPE</p>
        {viewApply && (
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
              setContact(true);
              setApply(false);
              setResume(true);
              setPreview(true);
            }}
            // onClick={() =>
            //   actions.adduserappliedjob(
            //     store.user.id,
            //     store.currentviewjobpost.id,
            //     store.currentviewjobpost.employer_id
            //   )
            // }
          >
            Apply now
          </button>
        )}

        {viewContact && (
          <div className="contact information">
            <label>First Name:</label>
            <input
              typeof="text"
              value={valueFirstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            ></input>
            <label>Last Name:</label>
            <input
              typeof="text"
              value={valueLastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            ></input>
            <label>Phone Number:</label>
            <input
              typeof="number"
              value={valuePhone}
              onChange={(e) => setPhone(e.target.value)}
              required
            ></input>
            <label>Email:</label>
            <input
              typeof="email"
              value={valueEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
        )}
        {viewResume &&
          (!store.resume_detail ? (
            <>
              <label>Resume</label>
              <input type="file" onChange={handleFileChange}></input>
            </>
          ) : (
            <>
              {store.resume_detail.map((item) => {
                return (
                  <div key={item.id}>
                    <h4>{item.resume_name}</h4>
                    <button
                      onClick={() => actions.downloadResume(store.user.id)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setReplaceresume(true);
                        setResume(false);
                      }}
                    >
                      Replace
                    </button>
                  </div>
                );
              })}
            </>
          ))}

        {viewReplaceresume && (
          <div>
            <label>Resume</label>
            <input type="file" onChange={replaceFileChange}></input>
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
            <p>First Name:{valueFirstname}</p>
            <p>Last Name: {valueLastname}</p>
            <p>Phone Number:{valuePhone}</p>
            <p>Email:{valueEmail}</p>
            <p>Resume: {replacefile ? replacefile.name : file}</p>
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
                  actions.addapplicant(
                    store.user.id,
                    valueEmail,
                    valueFirstname,
                    valueLastname,
                    valuePhone,
                    store.currentviewjobpost.id,
                    store.currentviewjobpost.employer_id
                  );
                  if (replacefile) {
                    actions.addsentresume(
                      store.user.id,
                      store.currentviewjobpost.id,
                      replacefile
                    );
                  }
                  actions.getapplicant(store.user.id);
                  setsubmitted(true);
                  setSubmit(false);
                  setConfirm(false);
                }}
              >
                Submit
              </button>
            )}
          </div>
        )}
        {viewsubmitted && <p style={{ backgroundColor: "green" }}>Submitted</p>}
      </div>
    </div>
  );
};

ViewJobPage.PropTypes = {
  id: PropTypes.number,
  displayapply: PropTypes.string,
};
