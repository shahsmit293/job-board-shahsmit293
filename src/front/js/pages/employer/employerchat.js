import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import io from "socket.io-client";
import "../../../styles/employerchat.css";

import CryptoJS from "crypto-js";
import { ViewApplicantProfile } from "./viewapplicantprofile";
import { ReceivedApplicants } from "../../component/receivedapplicants";

export const Employerchat = (props) => {
  const { store, actions } = useContext(Context);
  const { user_id, job_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [chats, setChats] = useState([]);
  const socketRef = useRef();
  let decryptedUserId = CryptoJS.AES.decrypt(user_id, "secret").toString(
    CryptoJS.enc.Utf8
  );
  let userIdParam = parseInt(decryptedUserId);

  let decryptedJobId = CryptoJS.AES.decrypt(job_id, "secret").toString(
    CryptoJS.enc.Utf8
  );
  let jobIdParam = parseInt(decryptedJobId);

  useEffect(() => {
    let decryptedUserId = CryptoJS.AES.decrypt(user_id, "secret").toString(
      CryptoJS.enc.Utf8
    );
    let userIdParam = parseInt(decryptedUserId);

    let decryptedJobId = CryptoJS.AES.decrypt(job_id, "secret").toString(
      CryptoJS.enc.Utf8
    );
    let jobIdParam = parseInt(decryptedJobId);

    // Connect to the Socket.IO server when the component mounts
    socketRef.current = io.connect(process.env.BACKEND_URL, {
      transports: ["websocket"],
    });
    socketRef.current.emit("join", {
      username: userIdParam,
      room: jobIdParam,
    });

    socketRef.current.on("message", (message) => {
      // Check if the message is from the current user
      if (message.senderId === store.employer.id) {
        return; // Ignore the message sent by the current user
      }

      const recievemessage = {
        message: message,
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString(),
        source: "applicantchatsforemployers", // Assuming the sender is the applicant
      };

      // Add the received message to local state
      setChats((prevChats) => [...prevChats, recievemessage]);
    });

    // Fetch existing chats
    Promise.all([
      actions.getemployerchats(userIdParam, jobIdParam),
      actions.getapplicantchatsforemployer(userIdParam, jobIdParam),
    ]).then(() => setLoading(false));

    // Cleanup: disconnect the socket and leave the room when the component unmounts
    return () => {
      socketRef.current.emit("leave", {
        username: userIdParam,
        room: jobIdParam,
      });
      socketRef.current.disconnect();
    };
  }, [store.employer.id, jobIdParam]);

  const sendMessage = () => {
    // Emit a message to the server with the correct room
    socketRef.current.emit("message", {
      message: message,
      room: jobIdParam,
      senderId: store.employer.id,
    });
    console.log("Sender ID:", store.employer.id);
    // Update local state immediately with the new message
    const newMessage = {
      message: message,
      current_date: new Date().toLocaleDateString(),
      current_time: new Date().toLocaleTimeString(),
      source: "chatsemployer",
    };

    setChats((prevChats) => [...prevChats, newMessage]);

    // Add the message to the database
    actions
      .addemployerchats(userIdParam, jobIdParam, message)
      // .then(() => actions.getemployerchats(userIdParam, jobIdParam))
      .then(() => setMessage(""));
  };

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
    source: "chatsemployer",
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

  const displaysave = (id, userid) => {
    let employersavedusers = Array.isArray(store.employersavedusers)
      ? store.employersavedusers
      : [];
    return employersavedusers.some((item) => item.user_id === userid)
      ? "none"
      : "inline";
  };

  const displayunsave = (id, userid) => {
    let employersavedusers = Array.isArray(store.employersavedusers)
      ? store.employersavedusers
      : [];
    return employersavedusers.some((item) => item.user_id === userid)
      ? "inline"
      : "none";
  };
  const handleViewClick = () => {
    setShowPopup(true);
  };
  return (
    <div className="employerchatpage">
      <div className="chatjob">
        {
          <div className="table">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {store.allapplicants
                  .filter(
                    (element) =>
                      element.user_id == userIdParam &&
                      element.job_id == jobIdParam
                  )
                  .map((item, index) => {
                    return (
                      <ReceivedApplicants
                        key={index}
                        applicantname={item.first_name}
                        applicantemail={item.email}
                        applicantphonenumber={item.phone_number}
                        userid={item.user_id}
                        jobid={item.job.id}
                        employerid={item.job.employer_id}
                        displaysave={displaysave(item.job.id, item.user_id)}
                        displayunsave={displayunsave(item.job.id, item.user_id)}
                        onViewClick={handleViewClick}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        }
        {showPopup && (
          <div>
            <p className="popup">
              <button
                className="styled-button"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
              <ViewApplicantProfile />
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
                store.allapplicants.filter(
                  (element) =>
                    element.user_id == userIdParam &&
                    element.job_id == jobIdParam
                )[0].first_name
              }
            </b>
          </p>
          {"   "}
          <p style={{ color: "blue" }}>
            {
              store.allapplicants.filter(
                (element) =>
                  element.user_id == userIdParam && element.job_id == jobIdParam
              )[0].email
            }
          </p>
        </div>{" "}
        <div className="messages">
          {merged.map((item, index) => (
            <div
              className={
                item.source === "chatsemployer" ? "setsender" : "setreceiver"
              }
            >
              <p
                className={
                  item.source === "chatsemployer" ? "sender" : "receiver"
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
              item.source == "chatsemployer" ? (
                <div className="setsender">
                  <p
                    className={
                      item.source === "chatsemployer" ? "sender" : "receiver"
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
                      item.source === "chatsemployer" ? "sender" : "receiver"
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
        {/* {merged.map((item, index) => (
          <p
            key={index}
            style={{
              textAlign: item.source === "chatsemployer" ? "right" : "left",
            }}
          >
            {item.message} (Posted {item.current_date} {item.current_time})
          </p>
        ))}
        {chats &&
          chats.map((item, index) =>
            item.source == "chatsemployer" ? (
              <p
                key={index}
                style={{
                  textAlign: item.source === "chatsemployer" ? "right" : "left",
                }}
              >
                {item.message} (Posted {item.current_date} {item.current_time})
              </p>
            ) : (
              <p
                key={index}
                style={{
                  textAlign: item.source === "chatsemployer" ? "right" : "left",
                }}
              >
                {item.message.message} (Posted {item.current_date}{" "}
                {item.current_time})
              </p>
            )
          )} */}
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
