import React, { useState, useContext, useEffect } from "react";
import "../../../styles/userprofile.css";
import { Context } from "../../store/appContext"; // Import your Flux context
import { useNavigate } from "react-router-dom";
import { UserContactInfo } from "./usercontactinfo";
import { UserQualification } from "./userqualification";
import { UserPreference } from "./userpreference";
import { UserExperience } from "./userexperience";
import { Userskill } from "./userskill";

export const UserProfile = () => {
  const [viewContact, SetViewContact] = useState(true);
  const [viewResume, SetViewResume] = useState(false);
  const [viewQualification, SetViewQualification] = useState(false);
  const [viewExperience, SetViewExperience] = useState(false);
  const [viewPreference, SetViewPreference] = useState(false);
  const [viewSkill, SetViewSkill] = useState(false);
  const [selectedTab, setSelectedTab] = useState("contact");

  const handlecolor = (tabName) => {
    setSelectedTab(tabName);
  };

  const [file, setFile] = useState(null);
  const { store, actions } = useContext(Context);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    actions.getresumedetail(store.user.id);
    actions.getusereducation(store.user.id);
    actions.getuserexperience(store.user.id);
    actions.getuserskill(store.user.id);
    actions.getuserpreference(store.user.id);
  }, [store.user.id]);

  return (
    <div className="profile">
      <div className="profilemenu">
        <div
          style={{
            backgroundColor: selectedTab === "contact" ? "lightblue" : null,
          }}
        >
          <p
            onClick={() => {
              SetViewResume(false);
              SetViewContact(true);
              SetViewQualification(false);
              SetViewExperience(false);
              SetViewPreference(false);
              SetViewSkill(false);
              handlecolor("contact");
            }}
          >
            Contact
          </p>
        </div>
        <div
          style={{
            backgroundColor: selectedTab === "resume" ? "lightblue" : null,
          }}
        >
          <p
            onClick={() => {
              SetViewResume(true);
              SetViewContact(false);
              SetViewQualification(false);
              SetViewExperience(false);
              SetViewPreference(false);
              SetViewSkill(false);
              handlecolor("resume");
            }}
          >
            Resume
          </p>
        </div>
        <div
          style={{
            backgroundColor:
              selectedTab === "qualification" ? "lightblue" : null,
          }}
        >
          <p
            onClick={() => {
              SetViewResume(false);
              SetViewContact(false);
              SetViewQualification(true);
              SetViewExperience(false);
              SetViewPreference(false);
              SetViewSkill(false);
              handlecolor("qualification");
            }}
          >
            Qualification
          </p>
        </div>
        <div
          style={{
            backgroundColor: selectedTab === "experience" ? "lightblue" : null,
          }}
        >
          <p
            onClick={() => {
              SetViewResume(false);
              SetViewContact(false);
              SetViewQualification(false);
              SetViewExperience(true);
              SetViewPreference(false);
              SetViewSkill(false);
              handlecolor("experience");
            }}
          >
            Experience
          </p>
        </div>
        <div
          style={{
            backgroundColor: selectedTab === "skills" ? "lightblue" : null,
          }}
        >
          <p
            onClick={() => {
              SetViewResume(false);
              SetViewContact(false);
              SetViewQualification(false);
              SetViewExperience(false);
              SetViewPreference(false);
              SetViewSkill(true);
              handlecolor("skills");
            }}
          >
            Skills
          </p>
        </div>
        <div
          style={{
            backgroundColor: selectedTab === "preference" ? "lightblue" : null,
          }}
        >
          <p
            onClick={() => {
              SetViewResume(false);
              SetViewContact(false);
              SetViewQualification(false);
              SetViewExperience(false);
              SetViewPreference(true);
              SetViewSkill(false);
              handlecolor("preference");
            }}
          >
            Preference
          </p>
        </div>
      </div>
      <div className="profiledetails">
        <div className="contactinfo">
          {viewContact && (
            <>
              <div className="infoheader">
                <h4>
                  <b>CONTACT INFORMATION</b>
                </h4>
              </div>
              <UserContactInfo
                firstname={store.userbio && store.userbio.first_name}
                lastname={store.userbio && store.userbio.last_name}
                location={store.userbio && store.userbio.location}
                phonenumber={store.userbio && store.userbio.phone_number}
              />
            </>
          )}
        </div>
        <div className="resumeinfo">
          {viewResume && (
            <>
              <div className="infoheader">
                <h4>
                  <b>MY RESUME</b>
                </h4>
              </div>

              <div className="resume">
                {!store.resume_detail ? (
                  <>
                    <p>
                      <b>Resume:</b>
                    </p>
                    <input type="file" onChange={handleFileChange} />
                    <button
                      onClick={() => {
                        actions.adduserresume(store.user.id, file);
                      }}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    {store.resume_detail.map((item) => {
                      return (
                        <div key={item.id}>
                          <h4>
                            {" "}
                            <i class="fa-solid fa-file-lines"></i>{" "}
                            {item.resume_name}
                          </h4>
                          <button
                            onClick={() =>
                              actions.downloadResume(store.user.id)
                            }
                          >
                            Download
                          </button>
                          <button
                            onClick={() => {
                              actions.deleteresume(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <div className="qualificationinfo">
          {viewQualification &&
            (!Array.isArray(store.usereducation) ||
            store.usereducation.length === 0 ? (
              <>
                <div className="infoheader">
                  <h4>
                    <b>QUALIFICATION</b>
                  </h4>
                </div>
                <UserQualification />
              </>
            ) : (
              <>
                <div className="infoheader">
                  <h4>
                    <b>QUALIFICATION</b>
                  </h4>
                </div>
                {store.usereducation.map((education, index) => (
                  <UserQualification
                    key={index}
                    collagename={education.collage_name}
                    startyear={education.start_year}
                    endyear={education.end_year}
                    gpa={education.gpa}
                    major={education.major}
                    degree={education.degree}
                    location={education.location}
                    id={education.id}
                    track={index}
                    deleteid={education.id}
                  />
                ))}
              </>
            ))}
        </div>

        <div className="experienceinfo">
          {viewExperience &&
            (!Array.isArray(store.userexperience) ||
            store.userexperience.length === 0 ? (
              <>
                <div className="infoheader">
                  <h4>
                    <b>EXPERIENCE</b>
                  </h4>
                </div>
                <UserExperience />
              </>
            ) : (
              <>
                <div className="infoheader">
                  <h4>
                    <b>EXPERIENCE</b>
                  </h4>
                </div>
                {store.userexperience.map((education, index) => (
                  <UserExperience
                    key={index}
                    jobtitle={education.job_title}
                    companyname={education.company_name}
                    jobtype={education.job_type}
                    startyear={education.start_year}
                    endyear={education.end_year}
                    description={education.description}
                    location={education.location}
                    id={education.id}
                    track={index}
                    deleteid={education.id}
                  />
                ))}
              </>
            ))}
        </div>
        <div className="skillinfo">
          {viewSkill &&
            (!Array.isArray(store.userskill) || store.userskill.length === 0 ? (
              <>
                <div className="infoheader">
                  <h4>
                    <b>SKILLS</b>
                  </h4>
                </div>
                <Userskill />
              </>
            ) : (
              <>
                <div className="infoheader">
                  <h4>
                    <b>SKILLS</b>
                  </h4>
                </div>
                {store.userskill.map((skills, index) => (
                  <Userskill
                    key={index}
                    skillname={skills.skill}
                    skillyear={skills.skill_year}
                    id={skills.id}
                    track={index}
                    deleteid={skills.id}
                  />
                ))}
              </>
            ))}
        </div>
        <div className="preferenceinfo">
          {viewPreference && (
            <>
              <div className="infoheader">
                <h4>
                  <b>MY PREFERENCE</b>
                </h4>
              </div>
              <UserPreference
                jobtitlepreference={
                  store.userpreference &&
                  store.userpreference.job_title_preference
                }
                fulltimeob={
                  store.userpreference && store.userpreference.full_time_job
                }
                parttimejob={
                  store.userpreference && store.userpreference.part_time_job
                }
                contractjob={
                  store.userpreference && store.userpreference.contract_job
                }
                temperoryjob={
                  store.userpreference && store.userpreference.temperory_job
                }
                internship={
                  store.userpreference && store.userpreference.internship
                }
                mondaytofriday={
                  store.userpreference && store.userpreference.monday_to_friday
                }
                weekendasneeded={
                  store.userpreference && store.userpreference.weekend_as_needed
                }
                weekendonly={
                  store.userpreference && store.userpreference.weekend_only
                }
                noweekends={
                  store.userpreference && store.userpreference.no_weekends
                }
                holidays={store.userpreference && store.userpreference.holidays}
                rotatingweekends={
                  store.userpreference && store.userpreference.rotating_weekends
                }
                weekdays={store.userpreference && store.userpreference.weekdays}
                everyweekend={
                  store.userpreference && store.userpreference.every_weekend
                }
                fourhourshift={
                  store.userpreference && store.userpreference.four_hour_shift
                }
                eighthourshift={
                  store.userpreference && store.userpreference.eight_hour_shift
                }
                tenhourshift={
                  store.userpreference && store.userpreference.ten_hour_shift
                }
                twelvehourshift={
                  store.userpreference && store.userpreference.twelve_hour_shift
                }
                dayshift={
                  store.userpreference && store.userpreference.day_shift
                }
                nightshift={
                  store.userpreference && store.userpreference.night_shift
                }
                eveningshift={
                  store.userpreference && store.userpreference.evening_shift
                }
                nonight={store.userpreference && store.userpreference.no_night}
                overnightshift={
                  store.userpreference && store.userpreference.overnight_shift
                }
                rotatingshift={
                  store.userpreference && store.userpreference.rotating_shift
                }
                splitshift={
                  store.userpreference && store.userpreference.split_shift
                }
                overtime={store.userpreference && store.userpreference.overtime}
                minsalary={
                  store.userpreference && store.userpreference.min_salary
                }
                salarytype={
                  store.userpreference && store.userpreference.salary_type
                }
                relocation={
                  store.userpreference && store.userpreference.relocation
                }
                relocationplace={
                  store.userpreference && store.userpreference.relocation_place
                }
                remotejob={
                  store.userpreference && store.userpreference.remote_job
                }
                hybridjob={
                  store.userpreference && store.userpreference.hybrid_job
                }
                inperson={
                  store.userpreference && store.userpreference.in_person
                }
                temperoryremotejob={
                  store.userpreference &&
                  store.userpreference.temperory_remote_job
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
