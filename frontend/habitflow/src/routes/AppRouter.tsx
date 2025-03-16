import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import AuthPage from "../pages/AuthPage/AuthPage";

// Lazy load pages
const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Habits = lazy(() => import("../pages/HabitsPage/HabitsPage"));
const Insights = lazy(() => import("../pages/InsightsPage/InsightsPage"));
const Profile = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const NotFound = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const AppRouter: FC = () => {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public Route */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
