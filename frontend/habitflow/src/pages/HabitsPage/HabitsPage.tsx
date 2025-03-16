import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addHabit, deleteHabit, getHabits } from "../../services/habitService";
import "./HabitsPage.scss";

interface Habit {
  id: string;
  habit: string;
}

const HabitsPage: React.FC = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitInput, setHabitInput] = useState("");

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const fetchHabits = async () => {
    if (!user) return;
    const userHabits = await getHabits(user.uid);
    setHabits(userHabits);
  };

  const handleAddHabit = async () => {
    if (!user || habitInput.trim() === "") return;

    const newHabit = await addHabit(user.uid, user.email!, habitInput);
    setHabits([...habits, newHabit]);
    setHabitInput("");
  };

  const handleDeleteHabit = async (habitId: string) => {
    await deleteHabit(habitId);
    setHabits(habits.filter((habit) => habit.id !== habitId));
  };

  return (
    <div className="habits-container">
      <h2>Your Habits</h2>
      <div className="habit-form">
        <input
          type="text"
          placeholder="Enter a habit..."
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
        />
        <button onClick={handleAddHabit}>Add Habit</button>
      </div>

      <ul className="habit-list">
        {habits.map((habit) => (
          <li key={habit.id}>
            <span>{habit.habit}</span>
            <button
              className="delete-button"
              onClick={() => handleDeleteHabit(habit.id)}
            >
              <Trash2 className="trash-icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitsPage;
