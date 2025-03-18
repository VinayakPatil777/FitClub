import React from "react";
import "../styles/testimonials.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

export default function Testimonials() {
  return (
    <>
      <section id="programs">
        <div className="container sliders">
          <h2 className="section__title">
            <span className="highlights">Full-Length </span>Workout Programs
          </h2>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="slide__item">
                <div className="slide__img">
                  {/* YouTube Video Link */}
                  <a
                    href="https://youtu.be/yPK7ISPEu3M?si=3g9nK6Bj1QSCTYb2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ytimg.com/vi/yPK7ISPEu3M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA31WXuidJ8iTKViGXrC-yIpxPAuw"
                      alt="FB Booty Round 3"
                    />
                  </a>
                </div>
                <h4>YOGA</h4>
                <p>
                "Join this guided yoga session to improve flexibility, reduce stress, and find inner balance.
                 Perfect for all levels, this practice promotes relaxation and well-being."
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slide__item">
                <div className="slide__img">
                  <a
                    href="https://youtu.be/J212vz33gU4?si=vxlMs-js2fI3xX_q" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ytimg.com/vi/J212vz33gU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAlq5uTwwxtJyHI6lGBvSsNwYSlwQ"
                      alt="FB Jumpstart"
                    />
                  </a>
                </div>
                <h4>HIIT</h4>
                <p>"Boost your endurance and burn calories with this high-intensity HIIT workout, designed for maximum results in minimal time."</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slide__item">
                <div className="slide__img">
                  <a
                    href="https://youtu.be/NK4_wsNCC2c?si=nl1M87HELxoExOBN" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ytimg.com/vi/NK4_wsNCC2c/maxresdefault.jpg"
                      alt="FB Jumpstart"
                    />
                  </a>
                </div>
                <h4>PUSH Workout</h4>
                <p>
                "Enhance upper body strength with this structured push workout,targeting the chest,
                 shoulders, and triceps. Designed for optimal muscle engagement and growth."
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slide__item">
                <div className="slide__img">
                  <a
                    href="https://youtu.be/TwMptdKRspI?si=q8hbbBuu7OB9Aowi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ytimg.com/vi/TwMptdKRspI/maxresdefault.jpg"
                      alt="FB Jumpstart"
                    />
                  </a>
                </div>
                <h4>LEGS Workout</h4>
                <p>
                "Target your quads, hamstrings, and calves with this intense leg workout,
                 designed to build strength, endurance, and definition."
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slide__item">
                <div className="slide__img">
                  <a
                    href="https://youtu.be/cUgCrWxOde0?si=JvKzTZvcNETr5FzY" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://i.ytimg.com/vi/cUgCrWxOde0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDHr2c-oO-mZhRdzVg6OmymAbazDQ"
                      alt="FB Jumpstart"
                    />
                  </a>
                </div>
                <h4>BACK Workout</h4>
                <p>
                "Target your back, rear delts, and biceps with this focused workout, enhancing strength, definition, and posture."
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
