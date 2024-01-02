import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Usersearchprofilecard } from "../component/usersearchprofilecard";
import { Viewusersprofile } from "./viewusersprofile";

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
  const [showallcontactedprofile, setallcontactedprofile] = useState(true);
  const [showsavedprofiles, setsavedprofiles] = useState(false);
  const [showsearchProfiles, setsearchprofiles] = useState(true);
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
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setsearchprofiles(true);
            setallcontactedprofile(false);
            setsavedprofiles(false);
          }}
        >
          Search Profiles
        </button>
        <button
          onClick={() => {
            setallcontactedprofile(true);
            setsavedprofiles(false);
            setsearchprofiles(false);
          }}
        >
          Contacted Profiles
        </button>
        <button
          onClick={() => {
            setsavedprofiles(true);
            setallcontactedprofile(false);
            setsearchprofiles(false);
          }}
        >
          Saved Profiles
        </button>
      </div>
      {showsearchProfiles && (
        <div className="search">
          <input
            placeholder="type here job title....."
            value={valueJobtitle}
            onChange={(e) => setValueJobtitile(e.target.value)}
          ></input>
          <label>Address:</label>
          <select>
            <option value="" onClick={() => setLocation("")}>
              Select a state
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
          </select>
          <label>Experience Level</label>
          <select id="experienceLevel" name="experienceLevel">
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
          </select>
          <label>Education Degree</label>
          <select id="educationdegree" name="educationdegree">
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
          </select>

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
      )}
      {showsearchProfiles &&
        (loading ? (
          <p>Loading applicants...</p> // Display a loading message or a spinner
        ) : store.searchprofiles.length === 0 ? (
          <p>No profile avilable yet.</p>
        ) : (
          <div className="list of applicants">
            {Array.isArray(store.searchprofiles) &&
              store.searchprofiles.map((item, index) => {
                return (
                  <Usersearchprofilecard
                    key={index}
                    name={item.user_bio.first_name}
                    experience={item.user_experience}
                    education={item.user_education}
                    onViewClick={handleViewClick}
                    userid={item.id}
                    employerid={store.employer.id}
                    displaysave={displaysave(item.id)}
                    displayunsave={displayunsave(item.id)}
                    displaycontact={displaycontact(item.user_id)}
                    displayuncontact={displayuncontact(item.user_id)}
                  />
                );
              })}
          </div>
        ))}

      {showsavedprofiles &&
        (loading ? (
          <p>Loading applicants...</p> // Display a loading message or a spinner
        ) : store.saveduserfiles.length === 0 ? (
          <p>No profile saved yet.</p>
        ) : (
          <div className="list of applicants">
            {Array.isArray(store.saveduserfiles) &&
              store.saveduserfiles.map((item, index) => {
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
                    displayunsave={displayunsave(item.user_id)}
                    displaycontact={displaycontact(item.user_id)}
                    displayuncontact={displayuncontact(item.user_id)}
                  />
                );
              })}
          </div>
        ))}

      {showallcontactedprofile &&
        (loading ? (
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
        ))}

      {showPopup && (
        <div className="popup">
          <button onClick={() => setShowPopup(false)}>Close</button>
          <Viewusersprofile />
        </div>
      )}
    </div>
  );
};
