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
export const addHabit = async (
  userId: string,
  email: string,
  habit: string
) => {
  try {
    if (!userId || !email) throw new Error("User is not authenticated");

    const newHabitRef = await addDoc(habitsCollection, {
      userId,
      email,
      habit,
    });
    return { id: newHabitRef.id, email, habit }; // ✅ Return the new habit with email
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
