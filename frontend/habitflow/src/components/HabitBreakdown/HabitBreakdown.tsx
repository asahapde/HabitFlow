import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./HabitBreakdown.scss";

const COLORS = [
  "#6c63ff",
  "#ff6b6b",
  "#feca57",
  "#1dd1a1",
  "#48dbfb",
  "#ff9ff3",
];

const HabitBreakdown: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const habits: Habit[] = await getUserHabits(user.uid);

      const categoryMap: { [key: string]: number } = {};

      habits.forEach((habit) => {
        const category = habit.category || "Uncategorized";
        categoryMap[category] = (categoryMap[category] || 0) + 1;
      });

      const formatted = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
      }));

      setData(formatted);
    };

    fetchData();
  }, [user]);

  return (
    <div className="section habit-breakdown">
      <h3>🧩 Habit Breakdown</h3>
      {data.length === 0 ? (
        <p>No habits to show.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HabitBreakdown;
