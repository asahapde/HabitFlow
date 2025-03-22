export interface Habit {
  id: string;
  name: string;
  icon: string;
  repeatDays: string[];
  quantity: number;
  completedDates: string[];
  userId: string;
  category: string;
}
