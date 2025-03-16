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
import { db } from "./firebaseConfig";

const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * 🔥 Add a new habit to Firestore
 */
export const addHabit = async (
  userId: string,
  habitName: string,
  selectedIcon: string,
  repeatDays: string[],
  quantity: number
) => {
  if (!habitName.trim()) return Promise.reject("Habit name cannot be empty.");

  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  // ✅ Ensure days are sorted in order (Default to today if empty)
  const sortedRepeatDays = (repeatDays.length > 0 ? repeatDays : [today]).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  const newHabit = {
    userId,
    name: habitName,
    icon: selectedIcon,
    repeatDays: sortedRepeatDays,
    quantity,
    completedDates: [],
  };

  try {
    const habitsRef = collection(db, "habits");
    const docRef = await addDoc(habitsRef, newHabit);
    console.log("✅ Habit added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding habit:", error);
    throw error;
  }
};

/**
 * ❌ Delete a habit from Firestore
 */
export const deleteHabit = async (habitId: string) => {
  try {
    await deleteDoc(doc(db, "habits", habitId));
    console.log("✅ Habit deleted:", habitId);
  } catch (error) {
    console.error("❌ Error deleting habit:", error);
    throw error;
  }
};

/**
 * ✅ Fetch All User Habits (Includes Completion Data)
 */
export const getUserHabits = async (userId: string) => {
  const habitsQuery = query(
    collection(db, "habits"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(habitsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * ✅ Toggle Completion Status for a Habit
 */
export const toggleHabitCompletion = async (habitId: string) => {
  const habitRef = doc(db, "habits", habitId);
  const habitSnap = await getDoc(habitRef);

  if (habitSnap.exists()) {
    const habitData = habitSnap.data();
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

    // ✅ Ensure `completedDates` is an array
    let updatedCompletedDates = Array.isArray(habitData.completedDates)
      ? [...habitData.completedDates]
      : [];

    if (updatedCompletedDates.includes(today)) {
      // ✅ Remove today from completed dates
      updatedCompletedDates = updatedCompletedDates.filter(
        (date) => date !== today
      );
    } else {
      // ✅ Add today as completed
      updatedCompletedDates.push(today);
    }

    // ✅ Update Firestore
    await updateDoc(habitRef, { completedDates: updatedCompletedDates });

    return updatedCompletedDates; // ✅ Return updated array
  } else {
    throw new Error("Habit not found");
  }
};
