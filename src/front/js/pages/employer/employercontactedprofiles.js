import React, { useContext, useEffect, useState } from "react";
import "../../../styles/employercontacted.css";
import { Context } from "../../store/appContext";
import { Usersearchprofilecard } from "../../component/usersearchprofilecard";
import { Viewusersprofile } from "./viewusersprofile";

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
    <div className="employercontactedprofilespage">
      {loading ? (
        <p>Loading applicants...</p> // Display a loading message or a spinner
      ) : !Array.isArray(store.contacteduserfiles) ? (
        <h1>No profile contacted yet.</h1>
      ) : (
        <div className="employercontactedprofilestable">
          <div className="totalcontactedprofile">
            <p style={{ color: "blue" }}>
              Toatal Contacted Profile: {store.contacteduserfiles.length}
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
                {Array.isArray(store.contacteduserfiles) &&
                  store.contacteduserfiles.map((item, index) => {
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
                          displayunsave={"none"}
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
            <button
              className="styled-button"
              onClick={() => setShowPopup(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <Viewusersprofile />
          </p>
        </div>
      )}
    </div>
  );
};
