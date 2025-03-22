import { FC } from "react";
import { TimeFilterProvider } from "../../context/TimeFilterContext";

import Achievements from "../../components/Achievements/Achievements";
import CompletionGraph from "../../components/CompletionGraph/CompletionGraph";
import GoalProgress from "../../components/GoalProgress/GoalProgress";
import HabitBreakdown from "../../components/HabitBreakdown/HabitBreakdown";
import MissedHabits from "../../components/MissedHabits/MissedHabits";
import MotivationMessage from "../../components/MotivationMessage/MotivationMessage";
import StreakSummary from "../../components/StreakSummary/StreakSummary";
import TopHabits from "../../components/TopHabits/TopHabits";

import "./InsightsPage.scss";

const InsightsPage: FC = () => {
  return (
    <TimeFilterProvider>
      <div className="insights-container">
        <h2>Insights</h2>
        {/* <TimeFilter /> */}
        <MotivationMessage />
        <StreakSummary />
        <CompletionGraph />
        <HabitBreakdown />
        <GoalProgress />
        <TopHabits />
        <MissedHabits />
        <Achievements />
      </div>
    </TimeFilterProvider>
  );
};

export default InsightsPage;
