import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const upgradePlan = async (userId, plan) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      plan: plan
    });
    alert("Plan Updated Successfully!");
  } catch (error) {
    console.error("Error updating plan:", error);
    alert("Failed to update plan.");
  }
};