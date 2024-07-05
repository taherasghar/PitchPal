import React from "react";

function Why() {
  return (
    <>
      <section id="services" className="services section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Why PitchPal</h2>
          </div>

          <div className="row">
            <div
              className="col-xl-3 col-md-6 d-flex align-items-stretch"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bx bx-search-alt-2"></i>
                </div>
                <h4>Find</h4>
                <p>
                  Explore the largest network of football stadiums in the
                  country. Simply enter your desired location, and hit the
                  search button.
                </p>
              </div>
            </div>

            <div
              className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bx bx-calendar-check"></i>
                </div>
                <h4>Book</h4>
                <p>
                  Once you’ve found the perfect pitch, get booked in quicker and
                  make easier payment.
                </p>
              </div>
            </div>

            <div
              className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bx bx-money"></i>
                </div>
                <h4>Pay</h4>
                <p>
                  No need to pay by cash now, use online payments from your
                  location.
                </p>
              </div>
            </div>
            <div
              className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bx bx-football"></i>
                </div>
                <h4>Enjoy</h4>
                <p>
                  The scene is set for your epic match, where dreams can be made
                  or broken. Pain is only temporary but victory is forever, so
                  leave nothing behind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Why;
