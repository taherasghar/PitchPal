import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function LandingHost() {
  return (
    <section
      id="host-your-pitch"
      className="contact"
      style={{ backgroundColor: "#2baa60" }}
    >
      <div className="container" data-aos="fade-up">
        <div id="form" className="section-title-lh">
          <h2>Host Your Pitch</h2>
          <p>
            Do you own a stadium and want it listed on our platform? Kindly
            click on the button below and fill out the form, and we will contact
            you back as soon as we have evaluated your request!
          </p>
        </div>
        <div className="d-flex justify-content-center ">
          <Link to={"/host-a-pitch"}>
            <Button variant="contained">Host Now!</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LandingHost;
