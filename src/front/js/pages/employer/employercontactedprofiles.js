import React, { useContext, useEffect, useState } from "react";
import "../../../styles/home.css";
import { Context } from "../../store/appContext";
import { Usersearchprofilecard } from "../../component/usersearchprofilecard";
import { Viewusersprofile } from "./viewusersprofile";
import { EmployerSidebar } from "../../component/employersidebar";

export const EmployerContactedProfiles = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      actions.getcontacteduserprofiles(store.employer.id);
      try {
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [store.employer]);

  const displaycontact = (userid) => {
    let contacteduserfiles = Array.isArray(store.contacteduserfiles)
      ? store.contacteduserfiles
      : [];
    return contacteduserfiles.some((item) => item.user_id === userid)
      ? "none"
      : "inline";
  };

  const displayuncontact = (userid) => {
    let contacteduserfiles = Array.isArray(store.contacteduserfiles)
      ? store.contacteduserfiles
      : [];
    return contacteduserfiles.some((item) => item.user_id === userid)
      ? "inline"
      : "none";
  };
  const handleViewClick = () => {
    setShowPopup(true);
  };
  return (
    <div>
      <div className="sidebar">
        <EmployerSidebar />
      </div>
      <div>
        {loading ? (
          <p>Loading applicants...</p> // Display a loading message or a spinner
        ) : store.contacteduserfiles.length === 0 ? (
          <p>No profile contacted yet.</p>
        ) : (
          <div className="list of applicants">
            {Array.isArray(store.contacteduserfiles) &&
              store.contacteduserfiles.map((item, index) => {
                return (
                  <Usersearchprofilecard
                    key={index}
                    name={item.user.user_bio.first_name}
                    experience={item.user.user_experience}
                    education={item.user.user_education}
                    onViewClick={handleViewClick}
                    userid={item.user_id}
                    employerid={store.employer.id}
                    displaysave={"none"}
                    displayunsave={"none"}
                    displaycontact={displaycontact(item.user_id)}
                    displayuncontact={displayuncontact(item.user_id)}
                  />
                );
              })}
          </div>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <button onClick={() => setShowPopup(false)}>Close</button>
          <Viewusersprofile />
        </div>
      )}
    </div>
  );
};
