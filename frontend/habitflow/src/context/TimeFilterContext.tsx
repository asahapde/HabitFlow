import { createContext, FC, ReactNode, useContext, useState } from "react";

type TimeRange = "today" | "week" | "month";

interface TimeFilterContextType {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

const TimeFilterContext = createContext<TimeFilterContextType>({
  timeRange: "week",
  setTimeRange: () => {},
});

export const TimeFilterProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  return (
    <TimeFilterContext.Provider value={{ timeRange, setTimeRange }}>
      {children}
    </TimeFilterContext.Provider>
  );
};

export const useTimeFilter = () => useContext(TimeFilterContext);
