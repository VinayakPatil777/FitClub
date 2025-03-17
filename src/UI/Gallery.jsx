import React, { useState } from "react";
import "../styles/FitnessPlan.css";

const fitnessVideos = [
  {
    title: "Chest Workout",
    category: "Chest",
    videoUrl: "https://www.youtube.com/embed/your-chest-video-id",
  },
  {
    title: "Back Workout",
    category: "Back",
    videoUrl: "https://www.youtube.com/embed/your-back-video-id",
  },
  {
    title: "Leg Workout",
    category: "Legs",
    videoUrl: "https://www.youtube.com/embed/your-leg-video-id",
  },
  {
    title: "Arm Workout",
    category: "Arms",
    videoUrl: "https://www.youtube.com/embed/your-arm-video-id",
  },
  {
    title: "Shoulder Workout",
    category: "Shoulders",
    videoUrl: "https://www.youtube.com/embed/your-shoulder-video-id",
  },
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
