import React, { useContext, useEffect, useState } from "react";
import "../../../styles/employersearchuserprofile.css";
import { Context } from "../../store/appContext";
import { Usersearchprofilecard } from "../../component/usersearchprofilecard";
import { Viewusersprofile } from "./viewusersprofile";
import { useNavigate } from "react-router-dom";
import LocationSearchInput from "../locationSearchInput";

export const EmployersearchUserprofile = () => {
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
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchApplicants = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const valueJobtitle = searchParams.get("valueJobtitle") || "";
      const location = searchParams.get("location") || "";
      const valueworklocation = searchParams.get("valueworklocation") || "";
      const jobtype = searchParams.get("jobtype") || "";
      const experiencelevel = searchParams.get("experiencelevel") || "";
      const education = searchParams.get("education") || "";
      const workingtimes = searchParams.get("workingtimes") || "";
      const postdays = searchParams.get("postdays") || "";
      const salary = searchParams.get("salary") || "";
      actions.getsaveduserprofiles(store.employer.id);
      actions.getcontacteduserprofiles(store.employer.id);
      try {
        await actions.searchprofile(
          valueJobtitle,
          location,
          valueworklocation,
          jobtype,
          experiencelevel,
          education,
          workingtimes,
          postdays,
          salary
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchApplicants();

    const popstateListener = () => {
      // Wait for 1 millisecond before fetching data
      setTimeout(fetchApplicants, 100);
    };

    // Fetch data when the URL changes
    window.addEventListener("popstate", popstateListener);

    return () => {
      window.removeEventListener("popstate", popstateListener);
    };
  }, []);

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
  }, []);
  useEffect(() => {
    // Event listener for popstate event
    const handlePopstate = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const valueJobtitle = searchParams.get("valueJobtitle") || "";
      const location = searchParams.get("location") || "";
      const valueexperiencelevel =
        searchParams.get("valueexperiencelevel") || "";
      const valueeducation = searchParams.get("valueeducation") || "";

      setValueJobtitile(valueJobtitle);
      setLocation(location);
      setexperiencelevel(valueexperiencelevel);
      seteducationValue(valueeducation);

      // If all search parameters are empty, set the URL to "/searchprofiles"
      if (
        !searchParams.get("valueJobtitle") &&
        !searchParams.get("location") &&
        !searchParams.get("valueexperiencelevel") &&
        !searchParams.get("valueeducation")
      ) {
        window.history.replaceState(null, "", "/searchprofiles");
      }
    };

    // Add event listener for popstate
    window.addEventListener("popstate", handlePopstate);

    // Call the handler once to update the state when the component mounts
    handlePopstate();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <div className="mainpage">
      <div className="searchdetails">
        <div className="searchbar">
          <input
            placeholder="search..."
            value={valueJobtitle}
            onChange={(e) => setValueJobtitile(e.target.value)}
          ></input>
          <LocationSearchInput setLocation={setLocation} location={location} />
          <button
            onClick={() => {
              actions.searchprofile(
                valueJobtitle,
                location,
                valueexperiencelevel,
                valueeducation
              );
              navigate(
                `/searchprofiles/?valueJobtitle=${valueJobtitle}&location=${location}&valueexperiencelevel=${valueexperiencelevel}&valueeducation=${valueeducation}`
              );
            }}
          >
            Search
          </button>
          <button
            onClick={() => {
              setValueJobtitile("");
              setLocation("");
              setexperiencelevel("");
              seteducationValue("");
              navigate("/searchprofiles");

              // Fetch data with empty values
              actions.searchprofile("", "", "", "");
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="actions">
        <div className="select">
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setexperiencelevel("")}
            >
              {valueexperiencelevel || "ExperienceLevels..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {experienceLevels.map((experience) => (
                <li>
                  <a
                    key={experience}
                    class="dropdown-item"
                    onClick={() => setexperiencelevel(experience)}
                  >
                    {experience}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchprofile(
                    valueJobtitle,
                    location,
                    valueexperiencelevel,
                    valueeducation
                  );
                  navigate(
                    `/searchprofiles/?valueJobtitle=${valueJobtitle}&location=${location}&valueexperiencelevel=${valueexperiencelevel}&valueeducation=${valueeducation}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                onClick={() => {
                  setexperiencelevel("");
                  // Fetch data with the updated state values
                  actions.searchprofile(
                    valueJobtitle,
                    location, // location is cleared
                    "",
                    valueeducation
                  );
                  // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("valueexperiencelevel");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/searchprofiles/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
          <div class="dropdown">
            <a
              class="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => seteducationValue("")}
            >
              {valueeducation || "Education..."}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {educationDegrees.map((degree) => (
                <li>
                  <a
                    key={degree}
                    class="dropdown-item"
                    onClick={() => seteducationValue(degree)}
                  >
                    {degree}
                  </a>
                </li>
              ))}
            </ul>
            <div className="trashsearch">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => {
                  actions.searchprofile(
                    valueJobtitle,
                    location,
                    valueexperiencelevel,
                    valueeducation
                  );
                  navigate(
                    `/searchprofiles/?valueJobtitle=${valueJobtitle}&location=${location}&valueexperiencelevel=${valueexperiencelevel}&valueeducation=${valueeducation}`
                  );
                }}
              ></i>
              <i
                class="fas fa-trash-alt"
                onClick={() => {
                  seteducationValue("");
                  // Fetch data with the updated state values
                  actions.searchprofile(
                    valueJobtitle,
                    location, // location is cleared
                    valueexperiencelevel,
                    ""
                  );
                  // Create a new URLSearchParams object
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  // Remove the specific parameter
                  searchParams.delete("valueeducation");

                  // Navigate to the new URL without the specific parameter
                  navigate(`/searchprofiles/?${searchParams.toString()}`);
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className="employersearchprofilespage">
          {loading ? (
            <p>Loading applicants...</p> // Display a loading message or a spinner
          ) : !Array.isArray(store.searchprofiles) ? (
            <h1>No profile avilable yet.</h1>
          ) : (
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
                            displaycontact={displaycontact(
                              item.user_bio.user_id
                            )}
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
