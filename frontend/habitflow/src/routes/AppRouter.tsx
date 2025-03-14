import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Habits = lazy(() => import("../pages/Habits"));
const Insights = lazy(() => import("../pages/Insights"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRouter: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
