/* eslint-disable no-unused-vars */
import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
function HeaderSection() {
  return (
    <div className="header-section">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="border border-dark border-custom-edit"
      >
        <Container className="navbar-custom-edit">
          <div className="pitchpal-brand">
            <Link to={"/"}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Eo_circle_green_white_letter-p.svg/512px-Eo_circle_green_white_letter-p.svg.png?20200417134134"
                alt=""
                width={"30px"}
              />
            </Link>
            <Navbar.Brand href="/" className="padding-zero">
              PitchPal
            </Navbar.Brand>
          </div>

          <div className="host-pitch-part padding-zero">
            <a href="/host-your-pitch" className="link-host">
              Host Your Pitch
            </a>

            <AccountCircleRoundedIcon />
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderSection;
