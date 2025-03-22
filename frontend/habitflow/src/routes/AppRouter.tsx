import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import AuthPage from "../pages/AuthPage/AuthPage";

// Lazy load pages
const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Habits = lazy(() => import("../pages/HabitsPage/HabitsPage"));
const Insights = lazy(() => import("../pages/InsightsPage/InsightsPage"));
const Profile = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const NotFound = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const EditHabit = lazy(() => import("../pages/EditHabitPage/EditHabitPage"));

const AppRouter: FC = () => {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <Suspense
          fallback={<div className="suspense-fallback">Loading...</div>}
        >
          <Routes>
            {/* Public Route */}
            <Route path="/auth" element={<AuthPage />} />

            <Route
              element={
                <>
                  <div className="content">
                    <Outlet />
                  </div>
                  <Navbar />
                </>
              }
            >
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-habit/:id" element={<EditHabit />} />
              </Route>
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
