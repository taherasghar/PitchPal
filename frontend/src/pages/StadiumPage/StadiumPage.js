/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "./components/Calendar";
import StadiumIcon from "@mui/icons-material/Stadium";
import GradeIcon from "@mui/icons-material/Grade";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { green } from "@mui/material/colors";
import backgroundSmall from "./images/bgSmall.png";
import MapContainer from "./components/MapContainer";
import { orange } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import "../../styles/stadiumPage.css";

const ROLES = {
  user: "user",
  admin: "admin",
};

const StadiumPage = () => {
  let { state } = useLocation();
  const { stadium } = state;
  const [value, setValue] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    // Fetch the user's rating for this stadium when the component mounts
    const fetchUserRating = async () => {
      try {
        const response = await axiosPrivate.get(
          `/stadiums/${stadium._id}/ratings/${auth.id}`
        );
        const userRating = response.data.userRating;
        if (userRating) {
          setValue(userRating);
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    fetchUserRating();
  }, [stadium._id, auth.id]);

  const handleRatingSubmission = async (newValue) => {
    setValue(newValue);
    try {
      const response = await axiosPrivate.post("/stadiums/submit-rating", {
        stadiumId: stadium._id,
        userId: auth.id,
        rating: newValue,
      });

      if (response.status === 200) {
        console.log("Rating submitted successfully");
      } else {
        console.error("Failed to submit rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <main className="topStaduims pb-4">
      <div className="container pt-5">
        <div className="row">
          <div className="col-lg-8 col-md-7 mb-3">
            <div className="introStad">
              <div className="d-flex pt-4">
                <div className="flex-shrink-0">
                  <StadiumIcon sx={{ fontSize: 60 }} color="success" />
                </div>
                <div className="flex-grow-1 mx-3 pt-1">
                  <h5 className="fw-bold">{stadium.name}</h5>
                  <p>
                    <span className="stars fw-bold">
                      <GradeIcon fontSize="small" sx={{ color: orange[500] }} />
                      {stadium.rating}
                    </span>
                    <span className="ps-lg-5 mx-2 fw-bold">
                      <AttachMoneyIcon
                        fontSize="small"
                        sx={{ color: green[500] }}
                      />
                      ${stadium.fee}
                    </span>
                    <span className="ps-lg-5 mx-2 fw-bold">
                      <PlaceIcon fontSize="small" sx={{ color: blue[500] }} />
                      {stadium.address}
                    </span>
                    <span className="ps-lg-5 mx-2 fw-bold">
                      <PhoneIcon fontSize="small" />
                      {stadium.phoneNumber}
                    </span>
                  </p>
                </div>
                <div className="d-none d-md-block">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/${stadium.phoneNumber}?text=Hello`}
                    className="text-decoration-none"
                  >
                    <WhatsAppIcon color="success" />
                  </a>
                </div>
              </div>
              <p className="p-0 m-0 text-capitalize">
                <b>Grass Type: </b> {stadium.grassType} <b>Venue Type: </b>{" "}
                {stadium.indoor_outdoor}
              </p>
              <p className="pb-3">
                <span className="fw-bold">Opening Hours</span>{" "}
                {`From ${stadium.starting_hour}:00 to ${stadium.ending_hour}:00`}
              </p>
              <div
                id="mainCarouselControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner sliderStad">
                  <div className="carousel-item carousel-item-next carousel-item-start">
                    <img
                      src={stadium.card_image}
                      className="card-img-top"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h5 className="mb-0 mt-4">Description</h5>
            <img
              src="https://i.imgur.com/8Qsxl1C.png"
              className="bgImg"
              alt="img"
            />
            <p
              className="p-0 m-0 my-2 mt-2 text-capitalize nl2br"
              style={{ fontWeight: "bolder" }}
            >
              {stadium.description}
            </p>
            <h5 className="mb-0 pt-4 pb-0">Stadium Location</h5>
            <img
              src="https://i.imgur.com/8Qsxl1C.png"
              className="bgImg"
              alt="img"
            />
            <MapContainer coordinates={stadium.googleCoordinates} />
          </div>
          <div className="col-lg-4 col-md-5">
            <Calendar data={{ ...stadium }} />
            <div className="rating-block text-center">
              {auth?.role === ROLES.admin || auth?.role === ROLES.user ? (
                <>
                  <h5 className="fw-bold mb-3">Submit a Rating!</h5>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      handleRatingSubmission(newValue);
                    }}
                    sx={{ fontSize: "2rem" }}
                  />
                </>
              ) : (
                <>
                  <h5 className="fw-bold mb-3">Login to Rate!</h5>
                  <Rating
                    name="disabled"
                    value="0"
                    disabled
                    sx={{ fontSize: "2rem" }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="container">
            <div className="mt-4">
              <h5 className="mb-0">We Offer</h5>
              <img src={backgroundSmall} className="bgImg" alt="img" />
              <div className="mb-3">
                <div className="row">
                  <div className="col my-1">
                    <div className="facilities">
                      <img
                        src="https://i.imgur.com/Fcar9Tp.png"
                        width="40"
                        alt="img"
                      />
                      <span className="ml-2" style={{ fontWeight: "bolder" }}>
                        &nbsp;&nbsp;{stadium.ball}
                      </span>
                    </div>
                  </div>
                  <div className="col my-1">
                    <div className="facilities">
                      <img
                        src="https://i.imgur.com/rfE2Vpm.png"
                        width="40"
                        alt="img"
                      />
                      <span className="ml-2" style={{ fontWeight: "bolder" }}>
                        &nbsp;&nbsp;{stadium.shirts}
                      </span>
                    </div>
                  </div>
                  <div className="col my-1">
                    <div className="facilities">
                      <img
                        src="https://i.imgur.com/Fzou6rg.png"
                        width="40"
                        alt="img"
                      />
                      <span className="ml-2" style={{ fontWeight: "bolder" }}>
                        &nbsp;&nbsp;{stadium.toilets}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StadiumPage;
