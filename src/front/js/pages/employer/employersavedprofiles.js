import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/employersavedprofiles.css";
import { Usersearchprofilecard } from "../../component/usersearchprofilecard";
import { Viewusersprofile } from "./viewusersprofile";

export const EmployerSavedProfiles = () => {
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      actions.getsaveduserprofiles(store.employer.id);
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

  const displayunsave = (userid) => {
    let saveduserfiles = Array.isArray(store.saveduserfiles)
      ? store.saveduserfiles
      : [];
    return saveduserfiles.some((item) => item.user_id === userid)
      ? "inline"
      : "none";
  };
  const handleViewClick = () => {
    setShowPopup(true);
  };
  return (
    <div className="employersavedprofilespage">
      {loading ? (
        <p>Loading applicants...</p> // Display a loading message or a spinner
      ) : !Array.isArray(store.saveduserfiles) ? (
        <h1>No profile saved yet.</h1>
      ) : (
        <div className="employersavedprofilestable">
          <div className="totalsavedprofile">
            <p style={{ color: "blue" }}>
              Toatal Saved Profile: {store.saveduserfiles.length}
            </p>
          </div>
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job Title</th>
                  <th>Degree</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(store.saveduserfiles) &&
                  store.saveduserfiles.length > 0 &&
                  store.saveduserfiles.map((item, index) => {
                    if (item.user.user_bio) {
                      return (
                        <Usersearchprofilecard
                          key={index}
                          name={item.user.user_bio.first_name}
                          experience={item.user.user_experience}
                          education={item.user.user_education}
                          location={item.user.user_bio.location}
                          onViewClick={handleViewClick}
                          userid={item.user_id}
                          employerid={store.employer.id}
                          displaysave={"none"}
                          displayunsave={displayunsave(item.user_id)}
                          displaycontact={displaycontact(item.user_id)}
                          displayuncontact={displayuncontact(item.user_id)}
                        />
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showPopup && (
        <div>
          <p className="popup">
            <button onClick={() => setShowPopup(false)}>Close</button>
            <Viewusersprofile />
          </p>
        </div>
      )}
    </div>
  );
};
