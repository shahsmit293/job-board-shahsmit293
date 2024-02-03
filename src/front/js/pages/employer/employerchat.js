import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import io from "socket.io-client";
import CryptoJS from "crypto-js";

export const Employerchat = (props) => {
  const { store, actions } = useContext(Context);
  const { user_id, job_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
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

    // // Turn off message event temporarily
    // socketRef.current.off("message");

    // // Turn on message event after 1 second
    // setTimeout(() => {
    //   socketRef.current.on("message", (message) => {
    //     const recievemessage = {
    //       message: message,
    //       current_date: new Date().toLocaleDateString(),
    //       current_time: new Date().toLocaleTimeString(),
    //       source: "applicantchatsforemployers", // Assuming the sender is the employer
    //     };
    //     setChats((prevChats) => [...prevChats, recievemessage]);
    //   });
    // }, 1000);
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
        )}
    </div>
  );
};
