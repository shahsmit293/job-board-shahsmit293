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
          activeuser: data.user.id,
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
        setStore({ accessToken: null });
        setStore({ employer: null });
      },

      handleLogout: () => {
        const actions = getActions();
        const confirmLogout = window.confirm("Are you sure?");
        if (confirmLogout) {
          actions.logout();
          window.location.href = "/";
        }
      },
    },
  };
};

export default getState;
