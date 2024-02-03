import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import io from "socket.io-client";
import CryptoJS from "crypto-js";

export const Userchat = (props) => {
  const { store, actions } = useContext(Context);
  const { job_id } = useParams();
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

    // // Turn off message event temporarily
    // socketRef.current.off("message");

    // // Turn on message event after 1 second
    // setTimeout(() => {
    //   socketRef.current.on("message", (message) => {
    //     const recievemessage = {
    //       message: message,
    //       current_date: new Date().toLocaleDateString(),
    //       current_time: new Date().toLocaleTimeString(),
    //       source: "employerchatsforapplicant", // Assuming the sender is the applicant
    //     };
    //     setChats((prevChats) => [...prevChats, recievemessage]);
    //   });
    // }, 1000);
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
  return (
    <div className="jumbotron">
      <input
        type="text"
        placeholder="start chat here.............."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></input>
      <button onClick={sendMessage}>Send</button>

      {merged.map((item, index) => (
        <p
          key={index}
          style={{
            textAlign: item.source === "applicantchats" ? "right" : "left",
          }}
        >
          {item.message} (Posted {item.current_date} {item.current_time})
        </p>
      ))}

      {chats &&
        chats.map((item, index) =>
          item.source == "applicantchats" ? (
            <p
              key={index}
              style={{
                textAlign: item.source === "applicantchats" ? "right" : "left",
              }}
            >
              {item.message} (Posted {item.current_date}
              {item.current_time})
            </p>
          ) : (
            <p
              key={index}
              style={{
                textAlign: item.source === "applicantchats" ? "right" : "left",
              }}
            >
              {item.message.message} (Posted {item.current_date}
              {item.current_time})
            </p>
          )
        )}
    </div>
  );
};
