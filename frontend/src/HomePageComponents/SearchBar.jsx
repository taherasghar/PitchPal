/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
function SearchBar() {
  const [cities, setcities] = useState([]);
  const [fetchedCities, setFetchedCities] = useState(false);
  return (
    <div className="search-bar-container">
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />

      <select
        className="custom-select"
        id="inputGroupSelect01"
        max="10"
        onChange={() => {
          console.log(document.querySelector(".custom-select").value);
        }}
        onClick={() => {
          fetchedCities === false
            ? axios
                .get("http://localhost:4000/api/cities", {})
                .then(function (response) {
                  setcities(response.data);
                  console.log(cities);
                  setFetchedCities(true);
                })
            : null;
        }}
      >
        <option defaultValue>Choose</option>

        {cities.map((element) => {
          return (
            <option key={element.id} value={element.name}>
              {element.name}
            </option>
          );
        })}
      </select>
      <button className="place-icon-btn" value="live-btn">
        <PlaceIcon />
      </button>
      <button className="place-icon-btn" value="search-btn">
        <SearchOutlinedIcon />
      </button>
    </div>
  );
}

export default SearchBar;
