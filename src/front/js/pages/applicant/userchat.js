import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/userchat.css";
import io from "socket.io-client";
import CryptoJS from "crypto-js";
import { JobCard } from "../../component/jobcard";
import { ViewJobPage } from "./viewjobpage";
export const Userchat = (props) => {
  const { store, actions } = useContext(Context);
  const { job_id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const socketRef = useRef();
  let decryptedJobId = CryptoJS.AES.decrypt(job_id, "secret").toString(
    CryptoJS.enc.Utf8
  );
  let jobIdParam = parseInt(decryptedJobId);

  useEffect(() => {
    let decryptedJobId = CryptoJS.AES.decrypt(job_id, "secret").toString(
      CryptoJS.enc.Utf8
    );
    let jobIdParam = parseInt(decryptedJobId);
    // Connect to the Socket.IO server when the component mounts
    socketRef.current = io.connect(process.env.BACKEND_URL, {
      transports: ["websocket"],
    });

    // Join the room for the user (applicant)
    socketRef.current.emit("join", {
      username: store.user.id,
      room: jobIdParam,
    });

    // Listen for incoming messages from the server
    socketRef.current.on("message", (message) => {
      // Check if the message is from the current user
      if (message.senderId === store.user.id) {
        return; // Ignore the message sent by the current user
      }

      const recievemessage = {
        message: message,
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString(),
        source: "employerchatsforapplicant", // Assuming the sender is the applicant
      };

      // Add the received message to local state
      setChats((prevChats) => [...prevChats, recievemessage]);
    });

    // Fetch existing chats
    Promise.all([
      actions.getapplicantchats(store.user.id, jobIdParam),
      actions.getemployerchatsforapplicants(store.user.id, jobIdParam),
    ]).then(() => setLoading(false));

    // Cleanup: disconnect the socket and leave the room when the component unmounts
    return () => {
      socketRef.current.emit("leave", {
        username: store.user.id,
        room: jobIdParam,
      });
      socketRef.current.disconnect();
    };
  }, [store.user.id, jobIdParam]);

  const sendMessage = () => {
    // Emit a message to the server with the correct room
    socketRef.current.emit("message", {
      message: message,
      room: jobIdParam,
      senderId: store.user.id,
    });
    console.log("Sender ID:", store.user.id);
    // Update local state immediately with the new message
    const newMessage = {
      message: message,
      current_date: new Date().toLocaleDateString(),
      current_time: new Date().toLocaleTimeString(),
      source: "applicantchats", // Assuming the sender is the applicant
    };

    setChats((prevChats) => [...prevChats, newMessage]);

    // Add the message to the database
    actions
      .addapplicantchats(store.user.id, jobIdParam, message)
      // .then(() => actions.getapplicantchats(store.user.id, jobIdParam))
      .then(() => setMessage(""));
  };

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
  const displayapplied = (id) => {
    if (!Array.isArray(store.applliedapplicants)) {
      return "none";
    } else {
      return store.applliedapplicants.some((item) => item.job.id === id)
        ? "inline"
        : "none";
    }
  };
  const handleViewClick = (jobId) => {
    setSelectedJob(jobId);
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
    <div className="chatpage">
      <div className="chatjob">
        {store.applliedapplicants
          .filter((item) => item.job.id == jobIdParam)
          .map((element, index) => {
            return (
              <JobCard
                key={index}
                jobtitlename={element.job.job_title}
                Company={element.job.company_name}
                logo={element.company_logo}
                Location={element.job.location}
                Jobtype={element.job.job_type}
                worktype={element.job.work_location_type}
                experiencelevel={element.job.experience_level_type}
                shift={element.job.working_times}
                salary={{
                  min: element.job.min_salary,
                  max: element.job.max_salary,
                }}
                totalapplicants={element.job.total_applicants}
                viewid={element.job.id}
                onViewClick={handleViewClick}
                jobid={element.job.id}
                display="none"
                displayunsave="none"
                displayapplied="none"
                dateposted={timeAgo(
                  element.job.current_date,
                  element.job.current_time
                )}
              />
            );
          })}
        {showPopup && (
          <div>
            <p className="popup">
              <button
                className="styled-button"
                onClick={() => setShowPopup(false)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
              <ViewJobPage />
            </p>
          </div>
        )}
      </div>
      <div className="chatlayout">
        <div className="chattitle">
          <p>
            <b>
              To:
              {
                store.applliedapplicants.filter(
                  (item) => item.job.id == jobIdParam
                )[0].job.job_title
              }
            </b>
          </p>
          {"   "}
          <p style={{ color: "blue" }}>
            {
              store.applliedapplicants.filter(
                (item) => item.job.id == jobIdParam
              )[0].job.company_name
            }
          </p>
        </div>
        <div className="messages">
          {merged.map((item, index) => (
            <div
              className={
                item.source === "applicantchats" ? "setsender" : "setreceiver"
              }
            >
              <p
                className={
                  item.source === "applicantchats" ? "sender" : "receiver"
                }
                key={index}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: "smaller",
                    opacity: ".5",
                    textAlign: "right",
                    margin: "0px",
                  }}
                >
                  {item.current_date} {item.current_time}
                </p>
                <p
                  style={{ fontSize: "larger", padding: "2px", margin: "5px" }}
                >
                  {item.message}{" "}
                </p>
              </p>
            </div>
          ))}
          {chats &&
            chats.map((item, index) =>
              item.source == "applicantchats" ? (
                <div className="setsender">
                  <p
                    className={
                      item.source === "applicantchats" ? "sender" : "receiver"
                    }
                    key={index}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "smaller",
                        opacity: ".5",
                        textAlign: "right",
                        margin: "0px",
                      }}
                    >
                      {item.current_date} {item.current_time}
                    </p>
                    <p
                      style={{
                        fontSize: "larger",
                        padding: "2px",
                        margin: "5px",
                      }}
                    >
                      {item.message}{" "}
                    </p>
                  </p>
                </div>
              ) : (
                <div className="setreceiver">
                  <p
                    className={
                      item.source === "applicantchats" ? "sender" : "receiver"
                    }
                    key={index}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "smaller",
                        opacity: ".5",
                        textAlign: "right",
                        margin: "0px",
                      }}
                    >
                      {item.current_date} {item.current_time}
                    </p>
                    <p
                      style={{
                        fontSize: "larger",
                        padding: "2px",
                        margin: "5px",
                      }}
                    >
                      {item.message.message}
                    </p>
                  </p>
                </div>
              )
            )}
        </div>

        <div className=" typemessage">
          <input
            type="text"
            placeholder="Start Chat Here......................................................"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <i class="fa-solid fa-paper-plane" onClick={sendMessage}></i>
        </div>
      </div>
    </div>
  );
};
