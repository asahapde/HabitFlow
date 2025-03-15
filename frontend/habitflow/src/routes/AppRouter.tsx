import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Habits = lazy(() => import("../pages/Habits"));
const Insights = lazy(() => import("../pages/Insights"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRouter: FC = () => {
  return (
    <BrowserRouter basename="/">
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Navbar />
    </BrowserRouter>
  );
};

export default AppRouter;
