import React, { useState } from "react";
import "./video.css"; // Optional: for styling
import videoM from './MyWorkout.mp4'
const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      {/* Button to start the video */}
      <div className="hero__btns" data-aos-duration="1200" data-aos="fade-up" data-aos-delay="200">
        {/* <button className="register__btn" onClick={handlePlay}>Get Started</button> */}
        <button className="watch_btn" onClick={handlePlay}>
          <span><i className="ri-play-fill"></i></span>Watch Video
        </button>
      </div>

      {/* Video Section */}
      {isPlaying && (
        <div className="video-container">
          <video controls autoPlay className="video-player">
            <source src={videoM} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="close-btn" onClick={() => setIsPlaying(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
