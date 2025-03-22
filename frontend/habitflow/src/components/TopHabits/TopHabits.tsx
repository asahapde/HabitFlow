import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./TopHabits.scss";

const TopHabits: React.FC = () => {
  const { user } = useAuth();
  const [topHabits, setTopHabits] = useState<{ name: string; count: number }[]>(
    []
  );

  useEffect(() => {
    const fetchTopHabits = async () => {
      if (!user) return;

      const habits: Habit[] = await getUserHabits(user.uid);

      const ranked = habits
        .map((habit) => ({
          name: habit.name,
          count: (habit.completedDates || []).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Top 5

      setTopHabits(ranked);
    };

    fetchTopHabits();
  }, [user]);

  return (
    <div className="section top-habits">
      <h3>🏆 Top Habits</h3>
      {topHabits.length === 0 ? (
        <p>No habits to rank yet.</p>
      ) : (
        <ul className="top-list">
          {topHabits.map((habit, i) => (
            <li key={i}>
              <span className="rank">#{i + 1}</span>
              <span className="name">{habit.name}</span>
              <span className="count">{habit.count} completions</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopHabits;
