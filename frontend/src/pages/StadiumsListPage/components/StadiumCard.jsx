import React from "react";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../styles/stadiumCard.css";
import cover from "../../../images/no-img.jpg";

const StadiumCard = ({ stadium }) => {
  return (
    <>
      <div className="stadium-card">
        <Link to={`/stadiums/${stadium._id}`} state={{ stadium }}>
          <img
            src={stadium.card_image || cover}
            alt="stadium cover"
            className="stadium-image"
          />
          <div className="stadium-details">
            <header className="name-rating">
              <p className="stadium-title">{stadium.name}</p>
              <span>{stadium.rating}&nbsp;★</span>
            </header>

            <div className="stadium-location">
              <LocationOnIcon className="location-icon" />
              <p className="stadium-address">{stadium.city}</p>
            </div>
            <p className="stadium-description">{stadium.description}</p>
            <p className="stadium-price">
              {stadium.players}P | {stadium.grassType} | ${stadium.fee}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default StadiumCard;
