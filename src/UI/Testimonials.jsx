import React from "react";
import "../styles/testimonials.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

import yoga from '../assets/img/yoga.jpg'
import HIIT from '../assets/img/hiit.jpg'
import PUSH from '../assets/img/push workout.jpg'
import LEGS from '../assets/img/leg workout.jpg'
import PULL from '../assets/img/pull workout.jpg'

export default function Testimonials() {
  return (
    <>
      <section id="programs divSection" style={{marginBottom:"40px"}}>
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
                    <img id="product" src={yoga} alt="Yoga" />
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
                    <img id="product" src={HIIT} alt="HIIT" />
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
                   <img id="product" src={PUSH} alt="PUSH Workout" />
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
                    <img id="product" src={LEGS} alt="LEGS Workout" />
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
                    <img id="product" src={PULL} alt="PULL Workout" />
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
