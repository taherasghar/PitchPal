import React from "react";
import useAuth from "../../../hooks/useAuth";
import useGetUserById from "../../../hooks/useGetUserById";

const ROLES = {
  user: "user",
  admin: "admin",
};

function Banner() {
  const { auth } = useAuth();
  const { user } = useGetUserById();

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 col-sm-12 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {auth?.role === ROLES.admin || auth?.role === ROLES.user ? (
              <React.Fragment>
                <h2>Welcome Back</h2>
                {user.firstName !== "" && user.lastName !== "" ? (
                  <h1>
                    {user.firstName} {user.lastName}
                  </h1>
                ) : (
                  <h1>{auth?.username}</h1>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1>Booking Football Stadiums Has Never Been Easier</h1>
                <h2>
                  The Leading Online Solution for Booking Football Matches in
                  Lebanon
                </h2>
              </React.Fragment>
            )}
            <div className="d-flex justify-content-center justify-content-lg-start">
              <a href="/explore" className="btn-get-started">
                Explore Stadiums
              </a>
            </div>
          </div>
          <div
            className="col-lg-6 col-sm-12 order-1 order-lg-2 hero-img"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <dotlottie-player
              src="https://lottie.host/090a7136-4db3-4270-b552-8a503539ecbf/czKtftIhJq.json"
              background="transparent"
              className="img-fluid"
              speed="1"
              loop
              autoplay
            ></dotlottie-player>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
