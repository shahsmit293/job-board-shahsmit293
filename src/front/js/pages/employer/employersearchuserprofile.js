import React, { useContext, useEffect, useState } from "react";
import "../../../styles/employersearchuserprofile.css";
import { Context } from "../../store/appContext";
import { Usersearchprofilecard } from "../../component/usersearchprofilecard";
import { Viewusersprofile } from "./viewusersprofile";
import { EmployerSidebar } from "../../component/employersidebar";

export const EmployersearchUserprofile = () => {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const educationDegrees = [
    "High School Degree",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
  ];
  const experienceLevels = [
    "Less Than 1 Year",
    "1-2 Years",
    "3-5 Years",
    "6-10 Years",
    "More Than 10 Years",
  ];
  const { store, actions } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [valueJobtitle, setValueJobtitile] = useState("");
  const [location, setLocation] = useState("");
  const [valueexperiencelevel, setexperiencelevel] = useState("");
  const [valueeducation, seteducationValue] = useState("");
  useEffect(() => {
    const fetchApplicants = async () => {
      actions.getsaveduserprofiles(store.employer.id);
      actions.getcontacteduserprofiles(store.employer.id);
      try {
        await actions.searchprofile("", "", "", "");
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [store.employer]);

  const displaysave = (userid) => {
    let saveduserfiles = Array.isArray(store.saveduserfiles)
      ? store.saveduserfiles
      : [];
    return saveduserfiles.some((item) => item.user_id === userid)
      ? "none"
      : "inline";
  };

  const displayunsave = (userid) => {
    let saveduserfiles = Array.isArray(store.saveduserfiles)
      ? store.saveduserfiles
      : [];
    return saveduserfiles.some((item) => item.user_id === userid)
      ? "inline"
      : "none";
  };

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
  useEffect(() => {
    actions.searchprofile(
      valueJobtitle,
      location,
      valueexperiencelevel,
      valueeducation
    );
  }, [valueJobtitle, location, valueexperiencelevel, valueeducation]);
  return (
    <div className="searchuserprofile">
      <div className="sidebar">
        <EmployerSidebar />
      </div>
      <div className="search">
        <div className="tag">
          <input
            placeholder="Type Job Title..."
            value={valueJobtitle}
            onChange={(e) => setValueJobtitile(e.target.value)}
          ></input>
        </div>
        <div className="tag">
          <label>Location </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" onClick={() => setLocation("")}>
              Select...
            </option>
            {states.map((state) => (
              <option
                key={state}
                value={state}
                onClick={() => setLocation(state)}
              >
                {state}
              </option>
            ))}
          </select>{" "}
          <i class="fas fa-trash-alt" onClick={() => setLocation("")}></i>
        </div>
        <div className="tag">
          <label>Experience Level</label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={valueexperiencelevel}
            onChange={(e) => setexperiencelevel(e.target.value)}
          >
            <option value="" onClick={() => setexperiencelevel("")}>
              Select...
            </option>
            {experienceLevels.map((level) => (
              <option
                key={level}
                value={level}
                onClick={() => setexperiencelevel(level)}
              >
                {level}
              </option>
            ))}
          </select>{" "}
          <i
            class="fas fa-trash-alt"
            onClick={() => setexperiencelevel("")}
          ></i>
        </div>
        <div className="tag">
          <label>Education Degree</label>
          <select
            id="educationdegree"
            name="educationdegree"
            value={valueeducation}
            onChange={(e) => seteducationValue(e.target.value)}
          >
            <option value="" onClick={() => seteducationValue("")}>
              Select...
            </option>
            {educationDegrees.map((degree) => (
              <option
                key={degree}
                value={degree}
                onClick={() => seteducationValue(degree)}
              >
                {degree}
              </option>
            ))}
          </select>{" "}
          <i class="fas fa-trash-alt" onClick={() => seteducationValue("")}></i>
        </div>
        <div className="tag">
          <button
            onClick={() =>
              actions.searchprofile(
                valueJobtitle,
                location,
                valueexperiencelevel,
                valueeducation
              )
            }
          >
            Search
          </button>
        </div>
        <div className="tag">
          <button
            onClick={() => {
              setValueJobtitile(""),
                setLocation(""),
                setexperiencelevel(""),
                seteducationValue("");
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="details">
        {loading ? (
          <p>Loading applicants...</p> // Display a loading message or a spinner
        ) : store.searchprofiles.length === 0 ? (
          <p>No profile avilable yet.</p>
        ) : (
          <div className="userprofiletable">
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
                {Array.isArray(store.searchprofiles) &&
                  store.searchprofiles.length > 0 &&
                  store.searchprofiles.map((item, index) => {
                    if (item.user_bio) {
                      return (
                        <Usersearchprofilecard
                          key={index}
                          name={item.user_bio.first_name}
                          experience={item.user_experience}
                          education={item.user_education}
                          location={item.user_bio.location}
                          onViewClick={handleViewClick}
                          userid={item.id}
                          employerid={store.employer.id}
                          displaysave={displaysave(item.id)}
                          displayunsave={displayunsave(item.id)}
                          displaycontact={displaycontact(item.user_bio.user_id)}
                          displayuncontact={displayuncontact(
                            item.user_bio.user_id
                          )}
                        />
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
