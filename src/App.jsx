import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Apartment from "./pages/Apartment";
import TenantList from "./tenant/TenantList";
import PaymentList from "./payment/PaymentList";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";

// Protected Route
import Protect from "./components/Protect";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
        />

        {/* Apartment */}

        <Route
          path="/apartment"
          element={
            <Protect>
              <Apartment />
            </Protect>
          }
        />

        {/* Tenant */}

        <Route
          path="/tenant"
          element={
            <Protect>
              <TenantList />
            </Protect>
          }
        />

        {/* Payment */}

        <Route
          path="/payment"
          element={
            <Protect>
              <PaymentList />
            </Protect>
          }
        />

        {/* About Us */}

        <Route
          path="/about"
          element={
            <Protect>
              <AboutUs />
            </Protect>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <Protect>
              <Profile />
            </Protect>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;