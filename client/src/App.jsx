import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Profile from "./pages/Profile";
import Clusters from "./pages/Clusters";
import Footer from "./components/Footer";
import Supplier from "./pages/Supplier";
import AuthPage from "./pages/AuthPage";
import Navbar from "./pages/Navbar";
import Trips from "./pages/Trips";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import CreateCluster from "./pages/CreateCluster";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {/* Show Navbar & Footer only if logged in */}
      {token && <Navbar />}

      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/create-cluster"
          element={
            <RequireAuth>
              <CreateCluster />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/clusters"
          element={
            <RequireAuth>
              <Clusters />
            </RequireAuth>
          }
        />
        <Route
          path="/supplier"
          element={
            <RequireAuth>
              <Supplier />
            </RequireAuth>
          }
        />
        <Route
          path="/trips"
          element={
            <RequireAuth>
              <Trips />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>

      {token && <Footer />}
    </>
  );
}
