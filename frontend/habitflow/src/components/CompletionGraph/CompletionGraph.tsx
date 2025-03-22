import { format, isSameDay, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { getUserHabits } from "../../services/habitService";
import { Habit } from "../../types/Habit";
import "./CompletionGraph.scss";

const CompletionGraph: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const generateGraphData = async () => {
      if (!user) return;
      const habits: Habit[] = await getUserHabits(user.uid);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const day = subDays(new Date(), i);
        return {
          date: format(day, "MMM d"), // e.g. Mar 30
          fullDate: day,
        };
      }).reverse();

      const habitCounts = last7Days.map(({ date, fullDate }) => {
        let count = 0;

        habits.forEach((habit) => {
          (habit.completedDates || []).forEach((completedDate) => {
            const compDate = new Date(completedDate);
            if (isSameDay(compDate, fullDate)) count++;
          });
        });

        return { date, count };
      });

      setData(habitCounts);
    };

    generateGraphData();
  }, [user]);

  return (
    <div className="section completion-graph">
      <h3>📈 Completion (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#6c63ff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletionGraph;
