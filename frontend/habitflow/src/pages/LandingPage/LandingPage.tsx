import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LandingPage.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/app", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="landing-container">
      <div className="landing-box">
        <img src="/logo192.png" alt="HabitFlow logo" className="logo" />
        <h1>HabitFlow</h1>
        <p className="subtitle">Build better habits, one day at a time.</p>

        <div className="features">
          <div>✅ Track daily habits effortlessly</div>
          <div>📊 Visualize your progress and streaks</div>
          <div>🎯 Stay consistent with motivational boosts</div>
          <div>🏆 Unlock achievements and goal progress</div>
        </div>

        <button className="get-started" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
