import React from "react";
import "../styles/FitnessPlan.css";

const fitnessVideos = [
  {
    title: "Chest Workout",
    videoUrl: "https://www.youtube.com/embed/your-chest-video-id",
  },
  {
    title: "Back Workout",
    videoUrl: "https://www.youtube.com/embed/your-back-video-id",
  },
  {
    title: "Leg Workout",
    videoUrl: "https://www.youtube.com/embed/your-leg-video-id",
  },
  {
    title: "Arm Workout",
    videoUrl: "https://www.youtube.com/embed/your-arm-video-id",
  },
  {
    title: "Shoulder Workout",
    videoUrl: "https://www.youtube.com/embed/your-shoulder-video-id",
  },
];

const FitnessPlan = () => {
  return (
    <div className="fitness-plan">
      <h1>Fitness Training Plan</h1>
      <div className="video-grid">
        {fitnessVideos.map((video, index) => (
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
