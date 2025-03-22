import { FC, useState } from "react";
import "./TimeFilter.scss";

const TimeFilter: FC = () => {
  const [selected, setSelected] = useState<"today" | "week" | "month">("week");

  const handleChange = (range: "today" | "week" | "month") => {
    setSelected(range);
    // Later: Lift this to context or parent to share with insights
  };

  return (
    <div className="time-filter">
      <button
        className={selected === "today" ? "active" : ""}
        onClick={() => handleChange("today")}
      >
        Today
      </button>
      <button
        className={selected === "week" ? "active" : ""}
        onClick={() => handleChange("week")}
      >
        This Week
      </button>
      <button
        className={selected === "month" ? "active" : ""}
        onClick={() => handleChange("month")}
      >
        This Month
      </button>
    </div>
  );
};

export default TimeFilter;
