import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./MissedHabits.scss";

const MissedHabits: React.FC = () => {
  const { user } = useAuth();
  const [missedHabits, setMissedHabits] = useState<
    { name: string; completionRate: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const habits: Habit[] = await getUserHabits(user.uid);

      const estimateWeeks = 3; // 🔧 You can adjust this
      const missed = habits
        .map((habit) => {
          const totalScheduled =
            (habit.repeatDays?.length || 0) * estimateWeeks;
          const completed = habit.completedDates?.length || 0;
          const rate =
            totalScheduled === 0 ? 0 : (completed / totalScheduled) * 100;

          return {
            name: habit.name,
            completionRate: Math.round(rate),
          };
        })
        .sort((a, b) => a.completionRate - b.completionRate)
        .slice(0, 5);

      setMissedHabits(missed);
    };

    fetchData();
  }, [user]);

  return (
    <div className="section missed-habits">
      <h3>🚫 Most Missed Habits</h3>
      {missedHabits.length === 0 ? (
        <p>No habits to analyze yet.</p>
      ) : (
        <ul className="missed-list">
          {missedHabits.map((habit, index) => (
            <li key={index}>
              <span className="name">{habit.name}</span>
              <span className="rate">{habit.completionRate}% done</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MissedHabits;
