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
      success_message_resume: undefined,
      resumeUrl: undefined,
      resume_detail: undefined,
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
          alert("Email already exists. Please use a different email.");
          window.location.reload();
          throw new Error("Email conflict");
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
        if (data.token) {
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
        company_logo,
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
        const formData = new FormData();
        formData.append("employer_id", employer_id);
        formData.append("company_name", company_name);
        formData.append("company_logo", company_logo);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("job_title", job_title);
        formData.append("company_email", company_email);
        formData.append("company_phone_number", company_phone_number);
        formData.append("number_hiring", number_hiring);
        formData.append("work_location_type", work_location_type);
        formData.append("location", location);
        formData.append("job_type", job_type);
        formData.append("working_hours", working_hours);
        formData.append("experience_level_type", experience_level_type);
        formData.append("min_experience", min_experience);
        formData.append("max_experience", max_experience);
        formData.append("min_salary", min_salary);
        formData.append("max_salary", max_salary);
        formData.append("working_times", working_times);
        formData.append("description", description);
        formData.append("weekend_job", weekend_job);
        formData.append("language", language);

        const resp = await fetch(backend + "api/addjob", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: formData,
        });
        const data = await resp.json();
        console.log(data);
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
        company_logo,
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
        const formData = new FormData();
        formData.append("company_name", company_name);
        formData.append("company_logo", company_logo);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("job_title", job_title);
        formData.append("company_email", company_email);
        formData.append("company_phone_number", company_phone_number);
        formData.append("number_hiring", number_hiring);
        formData.append("work_location_type", work_location_type);
        formData.append("location", location);
        formData.append("job_type", job_type);
        formData.append("working_hours", working_hours);
        formData.append("experience_level_type", experience_level_type);
        formData.append("min_experience", min_experience);
        formData.append("max_experience", max_experience);
        formData.append("min_salary", min_salary);
        formData.append("max_salary", max_salary);
        formData.append("working_times", working_times);
        formData.append("description", description);
        formData.append("weekend_job", weekend_job);
        formData.append("language", language);
        const resp = await fetch(`${backend}api/editpost/${post_id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: formData,
        });

        const data = await resp.json();
        store.seepostjobs = store.seepostjobs.map((b) =>
          b.post_id === post_id ? data.job : b
        );
      },

      //get editbooks
      geteditjobs: async (
        post_id,
        setCompanyNameValue,
        setCompanyLogoValue,
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
        setCompanyLogoValue(data.company_logo);
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
        if (resp.status === 409) {
          alert("Email already exists. Please use a different email.");
          window.location.reload();
          throw new Error("Email conflict");
        }
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
          headers: {
            Authorization: `Bearer ${store.useraccessToken}`,
          },
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
        setStore({ resumeUrl: url });
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
    },
  };
};

export default getState;
