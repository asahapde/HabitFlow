import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getHabitById, updateHabit } from "../../services/habitService";
import "./EditHabitPage.scss";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const icons = ["📖", "💪", "🧘", "💧", "📚", "📝"];

const EditHabitPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState(icons[0]);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;
    getHabitById(id).then((habit) => {
      if (!habit || habit.userId !== user.uid) return navigate("/");
      setName(habit.name);
      setIcon(habit.icon);
      setRepeatDays(habit.repeatDays);
      setQuantity(habit.quantity);
      setLoading(false);
    });
  }, [user, id, navigate]);

  const toggleDay = (day: string) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim() || !id) return;
    await updateHabit(id, {
      name,
      icon,
      repeatDays,
      quantity,
    });
    navigate("/");
  };

  if (loading) {
    return <div className="edit-habit-container">Loading...</div>;
  }

  return (
    <div className="edit-habit-container">
      <h2>Edit Habit</h2>
      <form className="habit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="quantity">Quantity (optional)</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditHabitPage;
