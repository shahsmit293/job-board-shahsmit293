import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { ViewJob } from "./component/viewjob";
import { ApplyJob } from "./pages/applyjob";
import { UserNotification } from "./pages/usernotification";
import { UserSavedJobs } from "./pages/usersavedjobs";
import { UserAppliedJobs } from "./pages/userappliedjobs";
import { UserProfile } from "./pages/userprofile";
import { UserCustomResume } from "./pages/customresumebuild";
import { UserPreference } from "./pages/userpreference";
import { UserLoginSignup } from "./pages/userloginsignup";
import { EmployerLoginSignup } from "./pages/employerloginsignup";
import { EmployerHome } from "./pages/employerhomepage";
import { EmployerCreateJobPost } from "./pages/createjobpost";
import { Applicants } from "./pages/applicants";
import { EditPostJob } from "./pages/editpostjob";
import injectContext from "./store/appContext";
import { Userchat } from "./pages/userchat";
import { Userinbox } from "./pages/userinbox";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Employerchat } from "./pages/employerchat";
import { Employerinbox } from "./pages/employerinbox";
import { EmployersearchUserprofile } from "./pages/employersearchuserprofile";
import { ResetPassword } from "./pages/resetPassword";
import { ResetPasswordEmployer } from "./pages/resetPasswordemployer";
import { EmployerContactedProfiles } from "./pages/employercontactedprofiles";
import { EmployerSavedProfiles } from "./pages/employersavedprofiles";
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<UserLoginSignup />} path="/jobseekerloginsignup" />
            <Route element={<ResetPassword />} path="/resetpasswordjobseeker" />
            <Route
              element={<EmployerLoginSignup />}
              path="/employerloginsignup"
            />
            <Route
              element={<ResetPasswordEmployer />}
              path="/resetpasswordemployer"
            />
            <Route element={<ViewJob />} path="/viewjob" />
            <Route element={<ApplyJob />} path="/applyjob" />
            <Route element={<UserNotification />} path="/usernotification" />
            <Route element={<UserSavedJobs />} path="/usersavedjobs" />
            <Route element={<UserAppliedJobs />} path="/userappliedjobs" />
            <Route element={<UserProfile />} path="/userprofile" />
            <Route element={<UserCustomResume />} path="/customresumebuild" />
            <Route element={<UserPreference />} path="/userpreference" />
            <Route element={<EmployerHome />} path="/employerhome" />
            <Route
              element={<EmployerCreateJobPost />}
              path="/employercreatejobpost"
            />
            <Route element={<Applicants />} path="/applicants/:jobid" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<EditPostJob />} path="/editpost/:post_id" />
            <Route element={<Userchat />} path="/userchat/:job_id" />
            <Route element={<Userinbox />} path="/userinbox" />
            <Route
              element={<Employerchat />}
              path="/employerchat/:user_id/:job_id"
            />
            <Route element={<Employerinbox />} path="/employerinbox/:job_id" />
            <Route
              element={<EmployerContactedProfiles />}
              path="/contactedprofiles"
            />
            <Route element={<EmployerSavedProfiles />} path="/savedprofiles" />
            <Route
              element={<EmployersearchUserprofile />}
              path="/searchprofiles"
            />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
