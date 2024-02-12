import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
const ForgotPasswordEmployer = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleForgotPassword = () => {
    axios
      .post(`${process.env.BACKEND_URL}api/forgot-password-employer`, { email })
      .then((response) => {
        alert(
          "A password reset email with instructions has been sent to your email address."
        );
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setError("No response received from server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setError(error.message);
        }
      });
  };

  return (
    <div>
      <input
        className="input"
        type="email"
        name="email"
        placeholder="Enter your email for password recovery"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Email</button>
    </div>
  );
};

export default ForgotPasswordEmployer;
