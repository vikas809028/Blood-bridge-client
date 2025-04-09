import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Component/Routes/ProtectedRoute";
import PublicRoute from "./Component/Routes/PublicRoute";
import Donar from "./Pages/Donar/Donar";
import Donation from "./Pages/Donar/Donation";
import DonarList from "./Pages/Admin/DonarList";
import HospitalList from "./Pages/Admin/HospitalList";
import OrgList from "./Pages/Admin/OrgList";
import AdminHome from "./Pages/Admin/AdminHome";
import PaymentPage from "./Pages/Donar/paymentPage";
import Donate from "./Pages/Donar/Donate";
import Purchase from "./Pages/Donar/Purchase";
import HosAnalytics from "./Pages/Hospital/Analytics";
import AdminAnalytics from "./Pages/Admin/AdminAnalytics";
import HospitalHome from "./Pages/Hospital/Hospital";
import OrganizationDonation from "./Pages/Hospital/organisation-donation";
import HospitalBloodStock from "./Pages/Donar/Analytics";
import OrganizationAnalytics from "./Pages/Organization/orgAnalytics";
import OrganizationConsumers from "./Pages/Organization/orgConsumers";
import OrganisationHomePage from "./Pages/Organization/orgHome";
import OrganizationDonar from "./Pages/Organization/orgDonors";
import Consumer from "./Pages/Hospital/Consumer";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <HospitalHome />
            </ProtectedRoute>
          }
        />
         <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-analytics"
          element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hos-analytics"
          element={
            <ProtectedRoute>
              <HospitalBloodStock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <OrganisationHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation-list"
          element={
            <ProtectedRoute>
              <OrganisationHomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/get-orgnaisation-for-hospital"
          element={
            <ProtectedRoute>
              <OrganizationDonation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchase"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-analytics"
          element={
            <ProtectedRoute>
              <HosAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orgdonors"
          element={
            <ProtectedRoute>
              <OrganizationDonar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orgconsumers"
          element={
            <ProtectedRoute>
              <OrganizationConsumers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organalytics"
          element={
            <ProtectedRoute>
              <OrganizationAnalytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
