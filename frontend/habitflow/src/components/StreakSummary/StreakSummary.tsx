import { differenceInCalendarDays, isSameDay, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import "./StreakSummary.scss";

const StreakSummary: React.FC = () => {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const calculateStreaks = async () => {
      if (!user) return;

      const habits = await getUserHabits(user.uid);

      // Collect all completed dates across habits
      let allDates: Date[] = [];

      habits.forEach((habit) => {
        (habit.completedDates || []).forEach((day: string) => {
          const date = convertWeekdayToDate(day);
          if (date) allDates.push(date);
        });
      });

      // Remove duplicates
      const uniqueDates = Array.from(
        new Set(allDates.map((d) => d.toDateString()))
      )
        .map((d) => new Date(d))
        .sort((a, b) => a.getTime() - b.getTime());

      const today = new Date();
      const yesterday = subDays(today, 1);

      // Calculate current streak
      let streak = 0;
      for (let i = uniqueDates.length - 1; i >= 0; i--) {
        const day = uniqueDates[i];
        const expectedDay = subDays(today, streak);

        if (isSameDay(day, expectedDay)) {
          streak++;
        } else {
          break;
        }
      }

      // Calculate longest streak
      let maxStreak = 0;
      let tempStreak = 1;

      for (let i = 1; i < uniqueDates.length; i++) {
        const diff = differenceInCalendarDays(
          uniqueDates[i],
          uniqueDates[i - 1]
        );
        if (diff === 1) {
          tempStreak++;
        } else {
          maxStreak = Math.max(maxStreak, tempStreak);
          tempStreak = 1;
        }
      }

      maxStreak = Math.max(maxStreak, tempStreak);

      setCurrentStreak(streak);
      setLongestStreak(maxStreak);
    };

    calculateStreaks();
  }, [user]);

  // Helper: Convert "Mon" to recent date for that weekday
  const convertWeekdayToDate = (weekday: string): Date | null => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const todayIndex = today.getDay();
    const targetIndex = weekdays.indexOf(weekday);
    if (targetIndex === -1) return null;
    const diff = (todayIndex - targetIndex + 7) % 7;
    return subDays(today, diff);
  };

  return (
    <div className="section streak-summary">
      <h3>🔥 Streak Summary</h3>
      <div className="streak-boxes">
        <div className="streak current">
          <p>Current Streak</p>
          <h2>
            {currentStreak} {currentStreak === 1 ? "day" : "days"}
          </h2>
        </div>
        <div className="streak longest">
          <p>Longest Streak</p>
          <h2>
            {longestStreak} {longestStreak === 1 ? "day" : "days"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StreakSummary;
