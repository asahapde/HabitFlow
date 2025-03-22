import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { addHabit } from "../../services/habitService";
import "./HabitsPage.scss";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const icons = ["📖", "💪", "🧘", "💧", "📚", "📝"];

const HabitsPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState(icons[0]);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const toggleDay = (day: string) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim()) return;

    const selectedDays =
      repeatDays.length > 0
        ? repeatDays
        : [new Date().toLocaleDateString("en-US", { weekday: "short" })];

    await addHabit({
      name,
      icon,
      repeatDays: selectedDays,
      quantity,
      completedDates: [],
      userId: user.uid,
    });

    navigate("/");
  };

  return (
    <div className="habits-page-container">
      <h2>Create a New Habit</h2>
      <form className="habit-form" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Drink water"
          />
        </div>

        <div>
          <label>Icon</label>
          <div className="icon-picker">
            {icons.map((i) => (
              <button
                type="button"
                key={i}
                className={i === icon ? "selected" : ""}
                onClick={() => setIcon(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label>Repeat Days</label>
          <div className="days-selector">
            {weekdays.map((day) => (
              <button
                type="button"
                key={day}
                className={repeatDays.includes(day) ? "active" : ""}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label>Quantity (optional)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Habit
        </button>
      </form>
    </div>
  );
};

export default HabitsPage;
