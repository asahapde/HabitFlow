import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./GoalProgress.scss";

const GoalProgress: React.FC = () => {
  const { user } = useAuth();
  const [trackedHabits, setTrackedHabits] = useState<
    { name: string; progress: number; target: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const habits: Habit[] = await getUserHabits(user.uid);

      // ✅ Only show quantity-based habits (quantity > 1)
      const today = new Date().toISOString().split("T")[0]; // e.g. 2024-03-31

      const progressData = habits
        .filter((habit) => habit.quantity && habit.quantity > 1)
        .map((habit) => {
          const logs = (habit as any).logs || {}; // 🧪 until full logging system exists
          const progress = logs[today] ?? 0;

          return {
            name: habit.name,
            progress,
            target: habit.quantity,
          };
        });

      setTrackedHabits(progressData);
    };

    fetchData();
  }, [user]);

  return (
    <div className="section goal-progress">
      <h3>🎯 Goal Progress</h3>
      {trackedHabits.length === 0 ? (
        <p>No quantity-based habits to show.</p>
      ) : (
        <ul className="goal-list">
          {trackedHabits.map((habit, idx) => {
            const percent = Math.min(
              (habit.progress / habit.target) * 100,
              100
            );
            return (
              <li key={idx}>
                <div className="label">
                  {habit.name} ({habit.progress}/{habit.target})
                </div>
                <div className="progress-bar">
                  <div className="fill" style={{ width: `${percent}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GoalProgress;
