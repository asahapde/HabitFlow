import { FC, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./Achievements.scss";

interface Achievement {
  title: string;
  description: string;
  earned: boolean;
}

const Achievements: FC = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const evaluateAchievements = async () => {
      if (!user) return;

      const habits: Habit[] = await getUserHabits(user.uid);

      const completedCount = habits.reduce(
        (total, h) => total + (h.completedDates?.length || 0),
        0
      );

      const hasStreak = habits.some(
        (habit) => (habit.completedDates?.length || 0) >= 7
      );
      const has50 = completedCount >= 50;
      const hasFirst = completedCount >= 1;

      const earned: Achievement[] = [
        {
          title: "🏁 First Habit Completed",
          description: "You've completed your first habit!",
          earned: hasFirst,
        },
        {
          title: "🔥 7-Day Streak",
          description: "You’ve kept up a habit for 7 days!",
          earned: hasStreak,
        },
        {
          title: "🏆 50 Total Completions",
          description: "You’ve completed 50 habits total!",
          earned: has50,
        },
      ];

      setAchievements(earned);
    };

    evaluateAchievements();
  }, [user]);

  return (
    <div className="section achievements">
      <h3>🏅 Achievements</h3>
      <ul className="achievement-list">
        {achievements.map((a, i) => (
          <li key={i} className={a.earned ? "earned" : "locked"}>
            <h4>{a.title}</h4>
            <p>{a.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
