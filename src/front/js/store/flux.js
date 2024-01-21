const getState = ({ getStore, getActions, setStore }) => {
  let backend = process.env.BACKEND_URL;
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      accessToken: null,
      activeuser: undefined,
      employer: {},
      alljobs: undefined,
      seepostjobs: undefined,
      editpost: undefined,
      user: {},
      useraccessToken: null,
      activejobseeker: undefined,
      currentviewjobpost: undefined,
      error_message_login: undefined,
      error_message_signup: undefined,
      success_message_resume: undefined,
      resumeUrl: undefined,
      resume_detail: undefined,
      userbio: undefined,
      usereducation: [],
      userexperience: [],
      userskill: [],
      userpreference: undefined,
      usersaved: [],
      userappliedjobs: [],
      applicants: [],
      employersavedusers: [],
      viewapplicantprofile: undefined,
      applliedapplicants: [],
      allapplicants: [],
      resume_detail_blob: undefined,
      applicantchats: [],
      employerchatsforapplicant: [],
      contacted: [],
      employerchat: [],
      applicantchatsforemployer: [],
      contactedemployer: [],
      searchjobs: [],
      searchprofiles: [],
      viewuserprofile: [],
      saveduserfiles: [],
      contacteduserfiles: [],
      errorMessagePassword: [],
      errorMessagePasswordEmployer: [],
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      //START HERE.................
      employersignup: async (email, password) => {
        const resp = await fetch(backend + "api/employersignup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (resp.status === 409) {
          setStore({
            error_message_signup:
              "Email already exists. Please use a different email.",
          });
        }
        const data = await resp.json();
        setStore({
          employer: data.employer,
          accessToken: data.token,
          activeuser: data.employer.id,
        });
        const employerToString = JSON.stringify(data.employer);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("employer", employerToString);
      },

      employerlogin: async (email, password) => {
        const store = getStore();
        const resp = await fetch(backend + "api/employerlogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await resp.json();
        if (resp.ok) {
          const actions = getActions();
          actions.logUserInTheStore(data);
          actions.watchjobpost(data.employer.id);
        } else {
          setStore({ error_message_login: data });
        }
      },

      logUserInTheStore: (data) => {
        setStore({
          employer: data.employer,
          accessToken: data.token,
          activeuser: data.employer.id,
        });
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("employer", JSON.stringify(data.employer));
      },

      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("employer");
        sessionStorage.removeItem("user");
        setStore({ accessToken: null });
        setStore({ employer: null });
        setStore({
          useraccessToken: null,
        });
        setStore({ user: null });
      },

      handleLogout: () => {
        const actions = getActions();
        const confirmLogout = window.confirm("Are you sure?");
        if (confirmLogout) {
          actions.logout();
          window.location.href = "/";
        }
      },

      /*to create job*/
      addjob: async (
        employer_id,
        company_name,
        first_name,
        last_name,
        job_title,
        company_email,
        company_phone_number,
        number_hiring,
        work_location_type,
        location,
        job_type,
        working_hours,
        experience_level_type,
        education_degree,
        min_experience,
        max_experience,
        min_salary,
        max_salary,
        working_times,
        description,
        weekend_job,
        language
      ) => {
        const store = getStore();
        const data = {
          employer_id,
          company_name,
          first_name,
          last_name,
          job_title,
          company_email,
          company_phone_number,
          number_hiring,
          work_location_type,
          location,
          job_type,
          working_hours,
          experience_level_type,
          education_degree,
          min_experience,
          max_experience,
          min_salary,
          max_salary,
          working_times,
          description,
          weekend_job,
          language,
        };

        const resp = await fetch(backend + "api/addjob", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify(data),
        });
        const respData = await resp.json();
        console.log(respData);
      },

      resetPassword: (token, newPassword) => {
        const store = getStore();
        return fetch(backend + "api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token, new_password: newPassword }),
        })
          .then((response) => response.json())
          .then((data) => {
            setStore({ errorMessagePassword: data });
            console.log("SMIT", data);
          });
      },

      resetPasswordEmployer: (token, newPassword) => {
        const store = getStore();
        return fetch(backend + "api/reset-password-employer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token, new_password: newPassword }),
        })
          .then((response) => response.json())
          .then((data) => {
            setStore({ errorMessagePasswordEmployer: data });
            console.log("SMIT", data);
          });
      },

      /*to see each job post*/
      watchjobpost: (id) => {
        const store = getStore();
        return fetch(`${backend}api/watchjob/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            console.log(data);
            setStore({ seepostjobs: data });
          });
      },

      //for edit book
      editjobs: async (
        post_id,
        company_name,
        first_name,
        last_name,
        job_title,
        company_email,
        company_phone_number,
        number_hiring,
        work_location_type,
        location,
        job_type,
        working_hours,
        experience_level_type,
        education_degree,
        min_experience,
        max_experience,
        min_salary,
        max_salary,
        working_times,
        description,
        weekend_job,
        language
      ) => {
        const store = getStore();
        const data = {
          company_name,
          first_name,
          last_name,
          job_title,
          company_email,
          company_phone_number,
          number_hiring,
          work_location_type,
          location,
          job_type,
          working_hours,
          experience_level_type,
          education_degree,
          min_experience,
          max_experience,
          min_salary,
          max_salary,
          working_times,
          description,
          weekend_job,
          language,
        };

        const resp = await fetch(`${backend}api/editpost/${post_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify(data),
        });

        const respData = await resp.json();
        store.seepostjobs = store.seepostjobs.map((b) =>
          b.post_id === post_id ? respData.job : b
        );
      },

      //get editjob
      geteditjobs: async (
        post_id,
        setCompanyNameValue,
        setFirstNameValue,
        setLastNameValue,
        setPhoneNumberValue,
        setCompanyEmailValue,
        setJobTitleValue,
        setNumberHiringValue,
        setWorkLocationTypeValue,
        setJobTypeValue,
        setLocationValue,
        setWorkingHoursValue,
        setExperienceLevelValue,
        setEducationValue,
        setMinExperienceValue,
        setMaxExperienceValue,
        setMinSalaryValue,
        setMaxSalaryValue,
        setWorkingTimesValue,
        setWeekendRequiredValue,
        setLanguageValue,
        setEditorText
      ) => {
        const store = getStore();
        const response = await fetch(`${backend}api/geteditpost/${post_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setCompanyNameValue(data.company_name);
        setFirstNameValue(data.first_name);
        setLastNameValue(data.last_name);
        setPhoneNumberValue(data.company_phone_number);
        setCompanyEmailValue(data.company_email);
        setJobTitleValue(data.job_title);
        setNumberHiringValue(data.number_hiring);
        setWorkLocationTypeValue(data.work_location_type);
        setJobTypeValue(data.job_type);
        setLocationValue(data.location);
        setWorkingHoursValue(data.working_hours);
        setExperienceLevelValue(data.experience_level_type);
        setEducationValue(data.education_degree);
        setMinExperienceValue(data.min_experience);
        setMaxExperienceValue(data.max_experience);
        setMinSalaryValue(data.min_salary);
        setMaxSalaryValue(data.max_salary);
        setWorkingTimesValue(data.working_times);
        setWeekendRequiredValue(data.weekend_job);
        setLanguageValue(data.language);
        setEditorText(data.description);
        setStore({ editpost: data });
      },

      //for single user
      singleUser: (j) => {
        fetch(`${backend}api/user/${j}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
          })
          .then((data) => {
            setStore({ singleUser: data });
          });
      },

      //to delete jobpost
      deleteJob: (post_id) => {
        const store = getStore();
        fetch(`${backend}api/deletejob/${post_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting book");
            }
          })
          .catch((error) => {
            console.error("error deleting book", error);
          });
      },

      //for all jobs
      alljobsdata: async () => {
        const response = await fetch(backend + "api/alljobs");
        if (response.ok) {
          console.log(response);
          const data = await response.json();

          setStore({
            alljobs: data,
          });
        } else {
          console.log(
            "Fetch request failed:",
            response.status,
            response.statusText
          );
        }
      },

      //for user signup.................
      jobseekersignup: async (email, password) => {
        const resp = await fetch(backend + "api/jobseekerloginsignup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (resp.status === 409)
          setStore({
            error_message_signup:
              "Email already exists. Please use a different email.",
          });
        const data = await resp.json();
        setStore({
          user: data.user,
          useraccessToken: data.token,
          activejobseeker: data.user.id,
        });
        const userToString = JSON.stringify(data.user);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", userToString);
      },

      viewjob: (id) => {
        const store = getStore();
        return fetch(`${backend}api/viewsinglejob/${id}`, {
          method: "GET",
          // headers: {
          //   Authorization: `Bearer ${store.useraccessToken}`,
          // },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            setStore({ currentviewjobpost: data });
          });
      },

      jobseekerlogin: async (email, password) => {
        const store = getStore();
        const resp = await fetch(backend + "api/jobseekerlogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await resp.json();
        if (data.token) {
          const actions = getActions();
          actions.logJobseekerInTheStore(data);
        } else {
          setStore({ error_message_login: data });
        }
      },

      logJobseekerInTheStore: (data) => {
        setStore({
          user: data.user,
          useraccessToken: data.token,
          activejobseeker: data.user.id,
        });
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      },

      adduserresume: async (userid, file) => {
        const store = getStore();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userid", userid);
        const resp = await fetch(`${backend}api/addresume`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`, // Assuming the JWT token is stored in local storage
          },
        });

        const data = await resp.json();
        if (data) {
          console.log(data);
          window.location.reload();
        } else {
          setStore({ error_message_resume: data });
        }
      },

      //to get useresume
      downloadResume: async (userid) => {
        const store = getStore();
        const response = await fetch(`${backend}api/getresume/${userid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume_name.pdf";
        link.click();

        // Revoke the blob URL
        window.URL.revokeObjectURL(url);
      },

      //gey resume details
      getresumedetail: async (userid) => {
        const store = getStore();
        const response = await fetch(
          `${backend}api/getresumedetail/${userid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.useraccessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStore({ resume_detail: data });
      },

      //delete resume
      deleteresume: (resumeid) => {
        const store = getStore();
        fetch(`${backend}api/deleteresume/${resumeid}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting book");
            }
          })
          .catch((error) => {
            console.error("error deleting book", error);
          });
      },

      //add User Bio
      adduserbio: async (
        user_id,
        first_name,
        last_name,
        location,
        phone_number
      ) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/adduserbio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            user_id: user_id,
            first_name: first_name,
            last_name: last_name,
            location: location,
            phone_number: phone_number,
          }),
        });
        const data = await resp.json();
        console.log(data);
        window.location.reload();
      },

      //get userbio
      getuserbio: (id, setFirstname, setLastname, setLocation, setPhone) => {
        const store = getStore();
        fetch(`${backend}api/getuserbio/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setFirstname(data.first_name);
            setLastname(data.last_name);
            setLocation(data.location);
            setPhone(data.phone_number);
            console.log(data);
            setStore({ userbio: data });
          });
      },

      //edit userbio
      editbio: (id, first_name, last_name, location, phone_number) => {
        const store = getStore();
        return fetch(`${backend}api/edituserbio/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            location: location,
            phone_number: phone_number,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ userbio: data });
          });
      },

      //addd usereducation
      addusereducation: async (
        collage_name,
        start_year,
        end_year,
        gpa,
        major,
        degree,
        location,
        user_id
      ) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/addusereducation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            collage_name: collage_name,
            start_year: start_year,
            end_year: end_year,
            gpa: gpa,
            major: major,
            degree: degree,
            location: location,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
        window.location.reload();
      },

      //get usereducation
      getusereducation: (id) => {
        const store = getStore();
        fetch(`${backend}api/getusereducation/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ usereducation: data });
          });
      },

      //edit usereducation
      editusereducation: (
        id,
        collage_name,
        start_year,
        end_year,
        gpa,
        major,
        degree,
        location
      ) => {
        const store = getStore();
        return fetch(`${backend}api/editusereducation/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            collage_name: collage_name,
            start_year: start_year,
            end_year: end_year,
            gpa: gpa,
            major: major,
            degree: degree,
            location: location,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            store.usereducation = store.usereducation.map((b) =>
              b.id === id ? data.education : b
            );
          });
      },

      //delete user education
      deleteusereducation: (id) => {
        const store = getStore();
        fetch(`${backend}api/deleteusereducation/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting education");
            }
          })
          .catch((error) => {
            console.error("error deleting education", error);
          });
      },

      //add userexperience
      //add userexperience
      adduserexperience: async (
        job_title,
        company_name,
        job_type,
        start_year,
        end_year,
        description,
        location,
        user_id
      ) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/adduserexperience`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            job_title: job_title,
            company_name: company_name,
            job_type: job_type,
            start_year: start_year,
            end_year: end_year,
            description: description,
            location: location,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
        window.location.reload();
      },

      //get userexperience
      getuserexperience: (id) => {
        const store = getStore();
        fetch(`${backend}api/getuserexperience/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ userexperience: data });
          });
      },

      //edit userexperience
      editexperience: (
        id,
        job_title,
        company_name,
        job_type,
        start_year,
        end_year,
        description,
        location
      ) => {
        const store = getStore();
        return fetch(`${backend}api/edituserexperience/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            job_title: job_title,
            company_name: company_name,
            job_type: job_type,
            start_year: start_year,
            end_year: end_year,
            description: description,
            location: location,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            store.userexperience = store.userexperience.map((b) =>
              b.id === id ? data.education : b
            );
          });
      },

      //delete user experience
      deleteexperience: (id) => {
        const store = getStore();
        fetch(`${backend}api/deleteuserexperience/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting experience");
            }
          })
          .catch((error) => {
            console.error("error deleting experience", error);
          });
      },

      //add userskill
      adduserskill: async (skill, skill_year, user_id) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/adduserskill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            skill: skill,
            skill_year: skill_year,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
        window.location.reload();
      },

      //delete user experience
      deleteexperience: (id) => {
        const store = getStore();
        fetch(`${backend}api/deleteuserexperience/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting experience");
            }
          })
          .catch((error) => {
            console.error("error deleting experience", error);
          });
      },

      //add userskill
      adduserskill: async (skill, skill_year, user_id) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/adduserskill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            skill: skill,
            skill_year: skill_year,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
        window.location.reload();
      },

      //delete user experience
      deleteexperience: (id) => {
        const store = getStore();
        fetch(`${backend}api/deleteuserexperience/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting experience");
            }
          })
          .catch((error) => {
            console.error("error deleting experience", error);
          });
      },

      //add userskill
      adduserskill: async (skill, skill_year, user_id) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/adduserskill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            skill: skill,
            skill_year: skill_year,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
        window.location.reload();
      },

      //get userskill
      getuserskill: (id) => {
        const store = getStore();
        fetch(`${backend}api/getuserskill/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ userskill: data });
          });
      },

      //edit userskill
      editskill: (id, skill, skill_year) => {
        const store = getStore();
        return fetch(`${backend}api/edituserskill/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            skill: skill,
            skill_year: skill_year,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            store.userskill = store.userskill.map((b) =>
              b.id === id ? data.skill : b
            );
          });
      },

      //delete user skill
      deleteskill: (id) => {
        const store = getStore();
        fetch(`${backend}api/deleteuserskill/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting skill");
            }
          })
          .catch((error) => {
            console.error("error deleting skill", error);
          });
      },

      //add userpreference
      adduserpreference: async (
        job_title_preference,
        full_time_job,
        part_time_job,
        contract_job,
        temperory_job,
        internship,
        monday_to_friday,
        weekend_as_needed,
        weekend_only,
        no_weekends,
        holidays,
        rotating_weekends,
        weekdays,
        every_weekend,
        four_hour_shift,
        eight_hour_shift,
        ten_hour_shift,
        twelve_hour_shift,
        day_shift,
        night_shift,
        evening_shift,
        no_night,
        overnight_shift,
        rotating_shift,
        split_shift,
        overtime,
        min_salary,
        salary_type,
        relocation,
        relocation_place,
        remote_job,
        hybrid_job,
        in_person,
        temperory_remote_job,
        user_id
      ) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/adduserpreference`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            job_title_preference: job_title_preference,
            full_time_job: full_time_job,
            part_time_job: part_time_job,
            contract_job: contract_job,
            temperory_job: temperory_job,
            internship: internship,
            monday_to_friday: monday_to_friday,
            weekend_as_needed: weekend_as_needed,
            weekend_only: weekend_only,
            no_weekends: no_weekends,
            holidays: holidays,
            rotating_weekends: rotating_weekends,
            weekdays: weekdays,
            every_weekend: every_weekend,
            four_hour_shift: four_hour_shift,
            eight_hour_shift: eight_hour_shift,
            ten_hour_shift: ten_hour_shift,
            twelve_hour_shift: twelve_hour_shift,
            day_shift: day_shift,
            night_shift: night_shift,
            evening_shift: evening_shift,
            no_night: no_night,
            overnight_shift: overnight_shift,
            rotating_shift: rotating_shift,
            split_shift: split_shift,
            overtime: overtime,
            min_salary: min_salary,
            salary_type: salary_type,
            relocation: relocation,
            relocation_place: relocation_place,
            remote_job: remote_job,
            hybrid_job: hybrid_job,
            in_person: in_person,
            temperory_remote_job: temperory_remote_job,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
        window.location.reload();
      },

      //get userpreference
      getuserpreference: (id) => {
        const store = getStore();
        fetch(`${backend}api/getuserpreference/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ userpreference: data });
          });
      },

      //edit userpreference
      editpreference: (
        id,
        job_title_preference,
        full_time_job,
        part_time_job,
        contract_job,
        temperory_job,
        internship,
        monday_to_friday,
        weekend_as_needed,
        weekend_only,
        no_weekends,
        holidays,
        rotating_weekends,
        weekdays,
        every_weekend,
        four_hour_shift,
        eight_hour_shift,
        ten_hour_shift,
        twelve_hour_shift,
        day_shift,
        night_shift,
        evening_shift,
        no_night,
        overnight_shift,
        rotating_shift,
        split_shift,
        overtime,
        min_salary,
        salary_type,
        relocation,
        relocation_place,
        remote_job,
        hybrid_job,
        in_person,
        temperory_remote_job
      ) => {
        const store = getStore();
        return fetch(`${backend}api/edituserpreference/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            job_title_preference: job_title_preference,
            full_time_job: full_time_job,
            part_time_job: part_time_job,
            contract_job: contract_job,
            temperory_job: temperory_job,
            internship: internship,
            monday_to_friday: monday_to_friday,
            weekend_as_needed: weekend_as_needed,
            weekend_only: weekend_only,
            no_weekends: no_weekends,
            holidays: holidays,
            rotating_weekends: rotating_weekends,
            weekdays: weekdays,
            every_weekend: every_weekend,
            four_hour_shift: four_hour_shift,
            eight_hour_shift: eight_hour_shift,
            ten_hour_shift: ten_hour_shift,
            twelve_hour_shift: twelve_hour_shift,
            day_shift: day_shift,
            night_shift: night_shift,
            evening_shift: evening_shift,
            no_night: no_night,
            overnight_shift: overnight_shift,
            rotating_shift: rotating_shift,
            split_shift: split_shift,
            overtime: overtime,
            min_salary: min_salary,
            salary_type: salary_type,
            relocation: relocation,
            relocation_place: relocation_place,
            remote_job: remote_job,
            hybrid_job: hybrid_job,
            in_person: in_person,
            temperory_remote_job: temperory_remote_job,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ userpreference: data });
          });
      },

      //delete user preference
      deletepreference: (id) => {
        const store = getStore();
        fetch(`${backend}api/deleteuserpreference/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting skill");
            }
          })
          .catch((error) => {
            console.error("error deleting skill", error);
          });
      },

      //add user saved job
      addusersavedjob: async (user_id, job_id) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/addusersaved`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            user_id: user_id,
            job_id: job_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
      },

      //get user saved job
      getusersavedjob: (id) => {
        const store = getStore();
        fetch(`${backend}api/getusersaved/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ usersaved: data });
          });
      },
      //delete user saved job
      deletesavedjobs: (userid, jobid) => {
        const store = getStore();
        fetch(`${backend}api/deleteusersave/${userid}/${jobid}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting skill");
            }
          })
          .catch((error) => {
            console.error("error deleting skill", error);
          });
      },

      // //add user applied job
      // adduserappliedjob: async (user_id, job_id, employer_id) => {
      //   const store = getStore();
      //   const resp = await fetch(`${backend}api/adduserapplied`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${store.useraccessToken}`,
      //     },
      //     body: JSON.stringify({
      //       user_id: user_id,
      //       job_id: job_id,
      //       employer_id: employer_id,
      //     }),
      //   });
      //   const data = await resp.json();
      //   window.location.reload();
      //   console.log(data);
      // },

      // getuserappliedjobs: (id) => {
      //   const store = getStore();
      //   fetch(`${backend}api/getuserapplied/${id}`, {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${store.useraccessToken}`,
      //     },
      //   })
      //     .then((resp) => resp.json())
      //     .then((data) => {
      //       console.log(data);
      //       setStore({ userappliedjobs: data });
      //     });
      // },

      //get all requested applicants
      getallapplicants: async (jobid) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/getapplicants/${jobid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        });
        const data = await resp.json();
        if (!Array.isArray(data)) {
          data = [];
        }
        console.log(data);
        setStore({ applicants: data });
      },

      //add employer saved user
      addemployersaveduser: async (employer_id, user_id, job_id) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/addemployersavedapplicant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify({
            employer_id: employer_id,
            user_id: user_id,
            job_id: job_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
      },

      //get employer saved user
      getemployersaveduser: (id) => {
        const store = getStore();
        fetch(`${backend}api/getemployersavedapplicants/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ employersavedusers: data });
          });
      },
      //delete employer saved users
      deleteemployersaveduser: (userid, jobid) => {
        const store = getStore();
        fetch(
          `${backend}api/deleteemployersavedapplicants/${userid}/${jobid}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
          }
        )
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting skill");
            }
          })
          .catch((error) => {
            console.error("error deleting skill", error);
          });
      },

      //get applicant viewprofile
      getprofile: (userid) => {
        const store = getStore();
        fetch(`${backend}api/viewapplicantprofile/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ viewapplicantprofile: data });
          });
      },

      //get usersearch profile
      getuserprofile: (userid) => {
        const store = getStore();
        fetch(`${backend}api/viewuserprofile/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ viewuserprofile: data });
          });
      },

      //add applicants
      addapplicant: async (
        user_id,
        email,
        first_name,
        last_name,
        phone_number,
        job_id,
        employer_id
      ) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/addapplicant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            user_id: user_id,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            job_id: job_id,
            employer_id: employer_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
      },

      getapplicant: (id) => {
        const store = getStore();
        fetch(`${backend}api/getapplicant/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ applliedapplicants: data });
          });
      },

      //get all requested applicants
      allapplicant: async (jobid) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/allapplicants/${jobid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        });
        const data = await resp.json();
        if (!Array.isArray(data)) {
          data = [];
        }
        console.log(data);
        setStore({ allapplicants: data });
      },

      addsentresume: async (user_id, job_id, file) => {
        const store = getStore();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", user_id);
        formData.append("job_id", job_id);
        const resp = await fetch(`${backend}api/addsentresume`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`, // Assuming the JWT token is stored in local storage
          },
        });

        const data = await resp.json();
        if (data) {
          console.log(data);
        } else {
          setStore({ message_sent_resume: data });
        }
      },

      //download reesume of users which sent during applying job
      downloadsentResumeForEmployer: async (userid, jobid) => {
        const store = getStore();
        const response = await fetch(
          `${backend}api/getsentresumeemployer/${userid}/${jobid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume_name.pdf";
        link.click();

        // Revoke the blob URL
        window.URL.revokeObjectURL(url);
      },

      //download reesume of user's default resume
      downloaddefaultResumeForEmployer: async (userid) => {
        const store = getStore();
        const response = await fetch(
          `${backend}api/getdefaultresumeemployer/${userid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume_name.pdf";
        link.click();

        // Revoke the blob URL
        window.URL.revokeObjectURL(url);
      },

      //addchat
      addapplicantchats: (user_id, job_id, message) => {
        const store = getStore();
        return fetch(`${backend}api/addapplicantchat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            user_id: user_id,
            job_id: job_id,
            message: message,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            return data.applicantchat;
          });
      },

      //get messages
      getapplicantchats: (userid, jobid) => {
        const store = getStore();
        const token = store.useraccessToken
          ? store.useraccessToken
          : store.accessToken;
        return fetch(`${backend}api/getapplicantchat/${userid}&${jobid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({
              applicantchats: data,
            });
          });
      },

      //get messages fro employer
      getemployerchatsforapplicants: (userid, jobid) => {
        const store = getStore();
        const token = store.useraccessToken
          ? store.useraccessToken
          : store.accessToken;
        return fetch(
          `${backend}api/getemployerchatforapplicant/${userid}&${jobid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({
              employerchatsforapplicant: data,
            });
          });
      },
      //get inbox messages list
      applicantinboxchats: (userid) => {
        const store = getStore();
        return fetch(`${backend}api/applicantinbox/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({
              contacted: data,
            });
          });
      },

      //addchat for employer
      addemployerchats: (user_id, job_id, message) => {
        const store = getStore();
        return fetch(`${backend}api/employerchat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify({
            user_id: user_id,
            job_id: job_id,
            message: message,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            return data.employerchat;
          });
      },

      //get messages fro employer
      getemployerchats: (userid, jobid) => {
        const store = getStore();
        const token = store.useraccessToken
          ? store.useraccessToken
          : store.accessToken;
        return fetch(`${backend}api/getemployerchat/${userid}&${jobid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({
              employerchat: data,
            });
          });
      },

      //get messages of applicant from employer
      getapplicantchatsforemployer: (userid, jobid) => {
        const store = getStore();
        const token = store.useraccessToken
          ? store.useraccessToken
          : store.accessToken;
        return fetch(
          `${backend}api/getapplicantchatforemployer/${userid}&${jobid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({
              applicantchatsforemployer: data,
            });
          });
      },
      //get inbox messages list for employer
      employerinboxchats: (jobid) => {
        const store = getStore();
        return fetch(`${backend}api/employerinbox/${jobid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({
              contactedemployer: data,
            });
          });
      },

      //for search jobs
      searchjobsdata: async (
        jobtitle,
        location,
        valueworklocation,
        jobtype,
        experiencelevel,
        education,
        workingtimes,
        daysposted,
        salary
      ) => {
        const response = await fetch(
          backend +
            "api/searchjobs?jobtitle=" +
            jobtitle +
            "&location=" +
            location +
            "&valueworklocation=" +
            valueworklocation +
            "&jobtype=" +
            jobtype +
            "&experiencelevel=" +
            experiencelevel +
            "&education=" +
            education +
            "&workingtimes=" +
            workingtimes +
            "&daysposted=" +
            daysposted +
            "&salary=" +
            salary
        );
        if (response.ok) {
          console.log(response);
          const data = await response.json();

          setStore({
            searchjobs: data,
          });
        } else {
          console.log(
            "Fetch request failed:",
            response.status,
            response.statusText
          );
        }
      },

      //for search jobs
      searchprofile: async (
        jobtitle,
        location,
        experience_level,
        education_degree
      ) => {
        const response = await fetch(
          backend +
            "api/searchprofiles?jobtitle=" +
            jobtitle +
            "&location=" +
            location +
            "&experience_level=" +
            experience_level +
            "&education_degree=" +
            education_degree
        );
        if (response.ok) {
          console.log(response);
          const data = await response.json();

          setStore({
            searchprofiles: data,
          });
        } else {
          console.log(
            "Fetch request failed:",
            response.status,
            response.statusText
          );
        }
      },

      //add user profiles
      addsaveduserprofiles: async (employer_id, user_id) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/addsaveduserprofiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify({
            employer_id: employer_id,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
      },

      //get saved users profile
      getsaveduserprofiles: (employer_id) => {
        const store = getStore();
        fetch(`${backend}api/getsaveduserprofiles/${employer_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ saveduserfiles: data });
          });
      },
      //delete saved users profile
      deletesaveduserprofiles: (employer_id, user_id) => {
        const store = getStore();
        return new Promise((resolve, reject) => {
          fetch(
            `${backend}api/deletesaveduserprofiles/${employer_id}/${user_id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${store.accessToken}`,
              },
            }
          )
            .then((resp) => {
              if (resp.ok) {
                console.log(resp);
                resolve(true); // Resolve the promise with true to indicate success
              } else {
                console.error("error deleting skill");
                reject("error deleting skill"); // Reject the promise with the error message
              }
            })
            .catch((error) => {
              console.error("error deleting skill", error);
              reject(error); // Reject the promise with the error object
            });
        });
      },

      //add contacted user profiles
      addcontacteduserprofiles: async (employer_id, user_id) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/addcontacteduserprofiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify({
            employer_id: employer_id,
            user_id: user_id,
          }),
        });
        const data = await resp.json();
        console.log(data);
      },

      //get contacted users profile
      getcontacteduserprofiles: (employer_id) => {
        const store = getStore();
        fetch(`${backend}api/getcontacteduserprofiles/${employer_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({ contacteduserfiles: data });
          });
      },

      //delete contacted users profile
      deletecontacteduserprofiles: (employer_id, user_id) => {
        const store = getStore();
        return new Promise((resolve, reject) => {
          fetch(
            `${backend}api/deletecontacteduserprofiles/${employer_id}/${user_id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${store.accessToken}`,
              },
            }
          )
            .then((resp) => {
              if (resp.ok) {
                console.log(resp);
                resolve(true); // Resolve the promise with true to indicate success
              } else {
                console.error("error deleting contacted profile");
                reject("error deleting contacted profile"); // Reject the promise with the error message
              }
            })
            .catch((error) => {
              console.error("error deleting contacted profile", error);
              reject(error); // Reject the promise with the error object
            });
        });
      },

      // send email for applied job
      sendemailforapply: async (email, company_name, job_title, location) => {
        const store = getStore();
        const resp = await fetch(`${backend}api/sendemailforapply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.useraccessToken}`,
          },
          body: JSON.stringify({
            email: email,
            company_name: company_name,
            job_title: job_title,
            location: location,
          }),
        });
        const data = await resp.json();
        console.log(data);
      },
    },
  };
};

export default getState;
