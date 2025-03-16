import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const habitsCollection = collection(db, "habits");

// ✅ Add a habit
export const addHabit = async (userId: string, habit: string) => {
  try {
    const newHabit = await addDoc(habitsCollection, { userId, habit }); // Ensure 'habit' is saved
    return { id: newHabit.id, habit }; // Return habit with ID
  } catch (error) {
    console.error("Error adding habit:", error);
    throw error;
  }
};

// ✅ Get habits for a user (Fix: Ensure 'habit' field is returned)
export const getHabits = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(habitsCollection);
    return querySnapshot.docs
      .filter((doc) => doc.data().userId === userId)
      .map((doc) => ({
        id: doc.id,
        habit: doc.data().habit || "", // Ensure 'habit' is returned
      }));
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};

// ✅ Delete a habit
export const deleteHabit = async (habitId: string) => {
  try {
    await deleteDoc(doc(db, "habits", habitId));
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};
