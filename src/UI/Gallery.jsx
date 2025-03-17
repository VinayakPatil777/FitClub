import React, { useState } from "react";
import "../styles/FitnessPlan.css";

const fitnessVideos = [
  { title: "Chest Workout", category: "Chest", videoUrl: "https://youtu.be/lvk2PMsuS88?si=BB0aWTx1NuNq4H8H" },
  { title: "Back Workout", category: "Back", videoUrl: "https://youtu.be/wpHO3DZpE4w?si=Zf5a14Zd0R4Ven0t" },
  { title: "Leg Workout", category: "Legs", videoUrl: "https://youtu.be/QKInsLdqitQ?si=M9vdj6PaX10Dpuwc" },
  { title: "Arm Workout", category: "Arms", videoUrl: "https://youtu.be/20-YGOXNs30?si=1P_pZJ70UxDuPxDU" },
  { title: "Shoulder Workout", category: "Shoulders", videoUrl: "https://youtu.be/hQrb2gghgd4?si=-mDRYGcRrfsRfIfm" },
];

const categories = ["All", "Chest", "Back", "Legs", "Arms", "Shoulders"];

const FitnessPlan = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos =
    selectedCategory === "All"
      ? fitnessVideos
      : fitnessVideos.filter((video) => video.category === selectedCategory);

  return (
    <div className="fitness-plan">
      <h1>Fitness Training Plan</h1>

      {/* Filter Buttons */}
      <div className="category-nav">
        {categories.map((category, index) => (
          <button
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {filteredVideos.map((video, index) => (
          <div className="video-card" key={index}>
            <h2>{video.title}</h2>
            <iframe
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessPlan;
