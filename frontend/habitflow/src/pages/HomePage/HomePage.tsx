import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  deleteHabit,
  getUserHabits,
  toggleHabitCompletion,
} from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [today, setToday] = useState("");

  const avatarURL =
    user?.photoURL ||
    `https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.uid || "default"}`;

  useEffect(() => {
    if (user) {
      getUserHabits(user.uid).then(setHabits);
    }

    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "short",
    });
    setToday(currentDay);
  }, [user]);

  const handleToggleCompletion = async (habitId: string) => {
    const updatedCompletedDates = await toggleHabitCompletion(habitId);

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, completedDates: updatedCompletedDates }
          : habit
      )
    );
  };

  const handleDelete = async (habitId: string) => {
    await deleteHabit(habitId);
    setHabits(habits.filter((habit) => habit.id !== habitId));
  };

  const todayHabits = habits.filter(
    (habit) =>
      habit.repeatDays.includes(today) && !habit.completedDates.includes(today)
  );
  const completedTodayHabits = habits.filter(
    (habit) =>
      habit.repeatDays.includes(today) && habit.completedDates.includes(today)
  );
  const upcomingHabits = habits.filter(
    (habit) => !habit.repeatDays.includes(today)
  );

  return (
    <div className="home-container">
      <div className="welcome-header">
        <img src={avatarURL} alt="Avatar" className="user-avatar" />
        <h2>Welcome, {user?.displayName || "User"}!</h2>
      </div>

      <div className="tasks-section">
        <h3>Today's Tasks</h3>
        {todayHabits.length === 0 ? (
          <p className="no-tasks">
            No tasks for today.
            <button className="create-btn" onClick={() => navigate("/habits")}>
              Create one
            </button>
          </p>
        ) : (
          <ul className="task-list">
            {todayHabits.map((habit) => (
              <li key={habit.id}>
                <span>
                  {habit.icon} {habit.name}
                </span>
                <div className="task-actions">
                  <button
                    className="toggle-btn"
                    onClick={() => handleToggleCompletion(habit.id)}
                  >
                    ✅
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-habit/${habit.id}`)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(habit.id)}
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {completedTodayHabits.length > 0 && (
        <div className="completed-section">
          <h3>Completed Tasks</h3>
          <ul className="task-list completed">
            {completedTodayHabits.map((habit) => (
              <li key={habit.id}>
                <span>
                  {habit.icon} {habit.name}
                </span>
                <button
                  className="toggle-btn"
                  onClick={() => handleToggleCompletion(habit.id)}
                >
                  🔁
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="upcoming-section">
        <h3>Upcoming Tasks</h3>
        {upcomingHabits.length === 0 ? (
          <p>No upcoming tasks.</p>
        ) : (
          <ul className="task-list upcoming">
            {upcomingHabits.map((habit) => (
              <li key={habit.id}>
                <span>
                  {habit.icon} {habit.name}
                </span>
                <div className="habit-days">{habit.repeatDays.join(", ")}</div>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-habit/${habit.id}`)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(habit.id)}
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
