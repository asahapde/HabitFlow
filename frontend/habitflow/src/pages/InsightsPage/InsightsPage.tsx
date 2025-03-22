import React from "react";
import Achievements from "../../components/Achievements/Achievements";
import CompletionGraph from "../../components/CompletionGraph/CompletionGraph";
import GoalProgress from "../../components/GoalProgress/GoalProgress";
import HabitBreakdown from "../../components/HabitBreakdown/HabitBreakdown";
import MissedHabits from "../../components/MissedHabits/MissedHabits";
import MotivationMessage from "../../components/MotivationMessage/MotivationMessage";
import StreakSummary from "../../components/StreakSummary/StreakSummary";
import TimeFilter from "../../components/TimeFilter/TimeFilter";
import TopHabits from "../../components/TopHabits/TopHabits";

import "./InsightsPage.scss";

const InsightsPage: React.FC = () => {
  return (
    <div className="insights-container">
      <h2>Insights</h2>
      <TimeFilter />
      <MotivationMessage />
      <StreakSummary />
      <CompletionGraph />
      <HabitBreakdown />
      <GoalProgress />
      <TopHabits />
      <MissedHabits />
      <Achievements />
    </div>
  );
};

export default InsightsPage;
