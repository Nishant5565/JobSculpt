import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Layout from "./Pages/Layout";
import Login from "./Components/Login/Login";
import SignupPage from "./Pages/SingupPage";
import VerifyEmail from "./Components/EmailVerify/VerifyEmail";
import EmailVerified from "./Components/EmailVerify/EmailVerified";
import Dashboard from "./DashBaord/Dashboard";
import Signup from "./Components/SignUp/Singup";
import CompleteProfile from "./Components/CompleteProfile/CompleteProfile";
import ChooseTheme from "./Pages/ChooseTheme";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ForgotPassword from "./Components/ResetPassword/ForgotPassword";
import CurrentDevices from "./DashBaord/CurrentDevices";
import HomePage from "./Pages/HomePage";
import Hire from "./Components/Hire/Hire";
import JobPosted from "./Components/Hire/JobsPosted";
import FindJobs from "./Components/FindJobs/FindJobs";
import PrivacyPolicy from "./Components/Legal/PrivacyPolicy";
import TermsAndConditions from "./Components/Legal/TermsAndConditions";
import CancellationAndRefund from "./Components/Legal/CancellationAndRefund";
import ContactUs from "./Components/Legal/ContactUs";
import ShippingAndDelivery from "./Components/Legal/ShippingAndDelivery";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<Dashboard />} />
          <Route path="devices" element={<CurrentDevices />} />
          <Route path="hire" element={<Hire />} />
          <Route path="jobs/posted" element={<JobPosted />} />
          <Route path="findjobs" element={<FindJobs />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="choosetheme" element={<ChooseTheme />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signup/:role" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="email-verified" element={<EmailVerified />} />
        <Route path="complete-profile" element={<CompleteProfile />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="cancellation-and-refund" element={<CancellationAndRefund />} />
        <Route path="shipping-and-delivery" element={<ShippingAndDelivery />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
