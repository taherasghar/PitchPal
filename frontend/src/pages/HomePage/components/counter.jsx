import React, { useEffect } from "react";
import "../../../styles/counter.css";

const Counter = () => {
  useEffect(() => {
    let valueDisplays = document.querySelectorAll(".counter-num");
    let interval = 4000;

    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue + "+";
        if (startValue === endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
  }, []);

  return (
    <>
      <section
        id="host-your-pitch"
        className="contact"
        style={{ backgroundColor: "#f3f5fa", paddingBottom: "0px" }}
      >
        <div className="container" data-aos="fade-up">
          <div id="form" className="section-title-counter">
            <h2>Join the Community!</h2>
          </div>
        </div>
      </section>
      <section className="counter-section" style={{ paddingBottom: "60px" }}>
        <div className="counter-wrapper">
          <div className="counter-container">
            <i className="counter-i fas fa-smile-beam"></i>
            <span className="counter-num" data-val="400">
              0+
            </span>
            <span className="counter-text">Happy Users</span>
          </div>

          <div className="counter-container">
            <i className="counter-i fas fa-futbol"></i>
            <span className="counter-num" data-val="100">
              0+
            </span>
            <span className="counter-text">Hosted Stadiums</span>
          </div>

          <div className="counter-container">
            <i className="counter-i fas fa-list"></i>
            <span className="counter-num" data-val="250">
              0+
            </span>
            <span className="counter-text">Made Bookings</span>
          </div>

          <div className="counter-container">
            <i className="counter-i fas fa-envelope"></i>
            <span className="counter-num" data-val="40">
              0+
            </span>
            <span className="counter-text">Submitted Forms</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Counter;
