import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCG-Z-ji6n3TSmUJy9dJGcC4nCcpIPbtDI",
  authDomain: "fit-club-ab43a.firebaseapp.com",
  projectId: "fit-club-ab43a",
  storageBucket: "fit-club-ab43a.firebasestorage.app",
  messagingSenderId: "516900425566",
  appId: "1:516900425566:web:97faf726191422216ec9cf",
  measurementId: "G-20L4H7LDVM",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);


export const getUserSubscription = async (userId) => {
  if (!userId) return null;
  
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().subscription; // Ensure subscription field exists
  }
  
  return null;
};