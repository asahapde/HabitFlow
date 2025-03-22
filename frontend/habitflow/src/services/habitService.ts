import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Habit } from "../types/Habit";
import { db } from "./firebaseConfig";

const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const addHabit = async (habit: {
  userId: string;
  username: string;
  name: string;
  icon: string;
  repeatDays: string[];
  quantity: number;
  completedDates: string[];
}) => {
  if (!habit.name.trim()) {
    return Promise.reject("Habit name cannot be empty.");
  }

  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  const sortedRepeatDays = (
    habit.repeatDays.length > 0 ? habit.repeatDays : [today]
  ).sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b));

  const newHabit = {
    userId: habit.userId,
    username: habit.username,
    name: habit.name.trim(),
    icon: habit.icon,
    repeatDays: sortedRepeatDays,
    quantity: habit.quantity,
    completedDates: habit.completedDates,
    createdAt: new Date().toISOString(),
  };

  try {
    const habitsRef = collection(db, "habits");
    const docRef = await addDoc(habitsRef, newHabit);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const deleteHabit = async (habitId: string) => {
  try {
    await deleteDoc(doc(db, "habits", habitId));
    console.log("✅ Habit deleted:", habitId);
  } catch (error) {
    console.error("❌ Error deleting habit:", error);
    throw error;
  }
};

export const getUserHabits = async (userId: string): Promise<Habit[]> => {
  const habitsQuery = query(
    collection(db, "habits"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(habitsQuery);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Habit, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
};

export const toggleHabitCompletion = async (habitId: string) => {
  const habitRef = doc(db, "habits", habitId);
  const habitSnap = await getDoc(habitRef);

  if (habitSnap.exists()) {
    const habitData = habitSnap.data();
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

    let updatedCompletedDates = Array.isArray(habitData.completedDates)
      ? [...habitData.completedDates]
      : [];

    if (updatedCompletedDates.includes(today)) {
      updatedCompletedDates = updatedCompletedDates.filter(
        (date) => date !== today
      );
    } else {
      updatedCompletedDates.push(today);
    }

    await updateDoc(habitRef, { completedDates: updatedCompletedDates });

    return updatedCompletedDates;
  } else {
    throw new Error("Habit not found");
  }
};

export const getHabitById = async (habitId: string): Promise<Habit | null> => {
  try {
    const docRef = doc(db, "habits", habitId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Habit;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching habit by ID:", error);
    return null;
  }
};

interface UpdateHabitPayload {
  name: string;
  icon: string;
  repeatDays: string[];
  quantity: number;
}

export const updateHabit = async (
  habitId: string,
  updates: UpdateHabitPayload
) => {
  try {
    const docRef = doc(db, "habits", habitId);
    await updateDoc(docRef, {
      name: updates.name,
      icon: updates.icon,
      repeatDays: updates.repeatDays,
      quantity: updates.quantity,
    });
  } catch (error) {
    throw error;
  }
};
