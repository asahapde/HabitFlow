import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./MotivationMessage.scss";

const MotivationMessage: React.FC = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      if (!user) return;
      const habits: Habit[] = await getUserHabits(user.uid);

      const today = new Date().toLocaleDateString("en-US", {
        weekday: "short",
      });

      const todayHabits = habits.filter((habit) =>
        habit.repeatDays.includes(today)
      );
      const completedToday = habits.filter((habit) =>
        habit.completedDates?.includes(today)
      );

      const total = todayHabits.length;
      const done = completedToday.length;

      const percent = total === 0 ? 0 : (done / total) * 100;

      if (percent === 0) {
        setMessage("⏳ You’ve got this. Start with just one habit!");
      } else if (percent < 50) {
        setMessage("💡 Great start — keep the momentum going!");
      } else if (percent < 100) {
        setMessage("🔥 Almost there! Just a few more to go!");
      } else {
        setMessage("✅ You crushed it today! Time to celebrate 🎉");
      }
    };

    fetchMessage();
  }, [user]);

  return (
    <div className="section motivation-message">
      <h3>💬 Motivation</h3>
      <p>{message}</p>
    </div>
  );
};

export default MotivationMessage;
