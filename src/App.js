import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ProtectedRoute from "./Component/Routes/ProtectedRoute";
import PublicRoute from "./Component/Routes/PublicRoute";

// Donar
import Donar from "./Pages/Donar/Donar";
import Donation from "./Pages/Donar/Donation";
import PaymentPage from "./Pages/Donar/paymentPage";
import Donate from "./Pages/Donar/Donate";
import Purchase from "./Pages/Donar/Purchase";
import HospitalBloodStock from "./Pages/Donar/Analytics";

//admin

import DonarList from "./Pages/Admin/DonarList";
import HospitalList from "./Pages/Admin/HospitalList";
import OrgList from "./Pages/Admin/OrgList";
import AdminHome from "./Pages/Admin/AdminHome";
import AdminAnalytics from "./Pages/Admin/AdminAnalytics";

// hospital
import HosAnalytics from "./Pages/Hospital/Analytics";
import HospitalHome from "./Pages/Hospital/Hospital";
import OrgDonations from "./Pages/Hospital/OrganizationDonation";
import Consumer from "./Pages/Hospital/Consumer";

// organization
import OrganizationAnalytics from "./Pages/Organization/orgAnalytics";
import OrganizationConsumers from "./Pages/Organization/orgConsumers";
import OrganisationHomePage from "./Pages/Organization/orgHome";
import OrganizationDonar from "./Pages/Organization/orgDonors";
import OrganizationDonations from "./Pages/Organization/orgDonations";
import PendingDonations from "./Pages/Organization/pendingDonations";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
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
        // donars
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/purchase"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/analytics"
          element={
            <ProtectedRoute>
              <HospitalBloodStock />
            </ProtectedRoute>
          }
        />
        // admin
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/donars"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hospitals"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/organizations"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        // Hospitals
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <HospitalHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital/analytics"
          element={
            <ProtectedRoute>
              <HosAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital/organizations"
          element={
            <ProtectedRoute>
              <OrgDonations />
            </ProtectedRoute>
          }
        />
        // organizations
        <Route
          path="/organization"
          element={
            <ProtectedRoute>
              <OrganisationHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/donor"
          element={
            <ProtectedRoute>
              <OrganizationDonar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/donations"
          element={
            <ProtectedRoute>
              <OrganizationDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/donationrequests"
          element={
            <ProtectedRoute>
              <PendingDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/consumers"
          element={
            <ProtectedRoute>
              <OrganizationConsumers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/analytics"
          element={
            <ProtectedRoute>
              <OrganizationAnalytics />
            </ProtectedRoute>
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
      </Routes>
    </>
  );
}

export default App;
