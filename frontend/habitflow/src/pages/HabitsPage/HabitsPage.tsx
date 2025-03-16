import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // To get user info
import { addHabit } from "../../services/habitService";
import "./HabitsPage.scss";

const habitIcons = ["🏋️", "📚", "🧘", "🚰", "🥗", "💤"];

const HabitsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [habitName, setHabitName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(habitIcons[0]);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleCreateHabit = async () => {
    try {
      await addHabit(
        user?.uid!,
        user?.displayName!,
        habitName,
        selectedIcon,
        repeatDays,
        quantity
      );
      alert("Habit created successfully!");
      navigate("/"); // ✅ Redirect to Homepage after adding
    } catch (error) {
      alert("Failed to create habit.");
    }
  };

  return (
    <div className="habits-container">
      <h2>Create a New Habit</h2>

      <input
        type="text"
        placeholder="Habit Name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />

      <div className="icon-selector">
        {habitIcons.map((icon) => (
          <span
            key={icon}
            className={`icon ${selectedIcon === icon ? "selected" : ""}`}
            onClick={() => setSelectedIcon(icon)}
          >
            {icon}
          </span>
        ))}
      </div>

      <div className="days-selector">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`day ${repeatDays.includes(day) ? "selected" : ""}`}
            onClick={() => setRepeatDays([...repeatDays, day])}
          >
            {day}
          </button>
        ))}
      </div>

      {/* <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      /> */}

      <button className="save-btn" onClick={handleCreateHabit}>
        Save Habit
      </button>
    </div>
  );
};

export default HabitsPage;
