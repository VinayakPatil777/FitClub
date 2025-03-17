import React, { useState, useEffect } from "react";
import "../styles/FitnessPlan.css";

const fitnessVideos = [
  { title: "Chest Workout", category: "Chest", videoId: "lvk2PMsuS88" },
  { title: "Back Workout", category: "Back", videoId: "wpHO3DZpE4w" },
  { title: "Leg Workout", category: "Legs", videoId: "QKInsLdqitQ" },
  { title: "Arm Workout", category: "Arms", videoId: "20-YGOXNs30" },
  { title: "Shoulder Workout", category: "Shoulders", videoId: "hQrb2gghgd4" },
];

const categories = ["All", "Chest", "Back", "Legs", "Arms", "Shoulders"];

const FitnessPlan = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [popupVideo, setPopupVideo] = useState(null);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (popupVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popupVideo]);

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

            {/* Click Thumbnail to Open Video Popup */}
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              className="video-thumbnail"
              onClick={() => setPopupVideo(video.videoId)}
            />
          </div>
        ))}
      </div>

      {/* Video Popup Modal */}
      {popupVideo && (
        <div className="video-popup">
          <div className="video-popup-content">
            <span className="close-button" onClick={() => setPopupVideo(null)}>&times;</span>
            <iframe
              src={`https://www.youtube.com/embed/${popupVideo}?autoplay=1`}
              title="Workout Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessPlan;
