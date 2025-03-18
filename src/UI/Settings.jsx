import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [userData, setUserData] = useState({ name: "", profileImg: "" });
  const [newName, setNewName] = useState("");
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch existing user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
        setNewName(userSnap.data().name);
      }
    };

    fetchUserData();
  }, []);

  // Upload new profile image
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Handle Profile Update
  const handleProfileUpdate = async () => {
    if (!auth.currentUser) return;
    setLoading(true);

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      let updatedData = { name: newName };

      if (newProfileImg) {
        const imageUrl = await uploadImage(newProfileImg);
        updatedData.profileImg = imageUrl;
      }

      await updateDoc(userRef, updatedData);
      setUserData({ ...userData, ...updatedData });

      toast.success("Profile updated successfully!");
      navigate("/profile"); // Redirect to Profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!");
    }

    setLoading(false);
  };

  return (
    <div className="settingsContainer">
      <h2>Settings</h2>
      <div className="profileSection">
        <img src={userData.profileImg || "/default-avatar.png"} alt="Profile" className="profileImg" />
        <input type="file" onChange={(e) => setNewProfileImg(e.target.files[0])} />
      </div>
      <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter your name" />
      <button onClick={handleProfileUpdate} disabled={loading}>
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Settings;
