import { Route, Routes } from "react-router";
import { useAuth } from "./hooks/useAuth";

import { RequireAuthRoute } from "./components/common/require-auth-route/RequireAuthRoute";
import { Login } from "./components/login/Login";
import { MainDashboard } from "./components/main-dashboard/MainDashboard";

export const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {!token && <Route path="/" element={<Login />} />}
      <Route path="/" element={<RequireAuthRoute />}>
        <Route path="/" element={<MainDashboard />} />
      </Route>
      <Route path="/about-us" element={<div>About Us</div>} />
    </Routes>
  );
};
