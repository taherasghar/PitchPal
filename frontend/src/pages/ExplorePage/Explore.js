/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import StadiumCard from "../StadiumsListPage/components/StadiumCard";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CircularProgress from "@mui/material/CircularProgress";
import "../../styles/stadiums.css";

function Stadiums() {
  const [loading, setLoading] = useState(true);
  const [number_of_results, setNumberOfResults] = useState(0);
  const [fetchedStadiums, setFetchedStadiums] = useState([]);
  const [filteredStadiums, setFilteredStadiums] = useState([]);
  const [grassType, setGrassType] = useState("all");
  const [ceiling, setCeiling] = useState("all");
  const [players, setPlayers] = useState([8, 22]);
  const [rating, setRating] = useState([0, 5]);
  const [sortOrder, setSortOrder] = useState("createdAt_desc");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get(`/stadiums`)
      .then(function (response) {
        setFetchedStadiums(response.data);
        setNumberOfResults(response.data.length);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching stadiums: ", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [grassType, ceiling, players, rating, sortOrder, fetchedStadiums]);

  function applyFilters() {
    let filtered = [...fetchedStadiums];

    // Filter by grass type
    if (grassType !== "all") {
      filtered = filtered.filter(
        (stadium) => stadium.grassType.toLowerCase() === grassType
      );
    }

    // Filter by ceiling
    if (ceiling !== "all") {
      filtered = filtered.filter(
        (stadium) => stadium.indoor_outdoor.toLowerCase() === ceiling
      );
    }

    // Filter by number of players
    filtered = filtered.filter(
      (stadium) =>
        stadium.players >= players[0] && stadium.players <= players[1]
    );

    // Filter by rating
    filtered = filtered.filter(
      (stadium) => stadium.rating >= rating[0] && stadium.rating <= rating[1]
    );

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case "regularPrice_desc":
          return b.fee - a.fee;
        case "regularPrice_asc":
          return a.fee - b.fee;
        case "createdAt_desc":
          return b.rating - a.rating;
        case "createdAt_asc":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredStadiums(filtered);
  }

  function valuetext(value) {
    return `${value}`;
  }

  const handleGrassTypeChange = (e) => {
    setGrassType(e.target.value);
  };

  const handleCeilingChange = (e) => {
    setCeiling(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="stadiums-container">
          <div className="stadiums-sidebar">
            <form className="stadiums-form">
              <div className="stadiums-form-group">
                <h4 className="h4" style={{ marginBottom: 0 }}>
                  Filters:
                </h4>
              </div>
              <div className="stadiums-checkbox-group">
                <label className="stadiums-label">Grass Type:</label>
                <div className="stadiums-checkbox-item">
                  <input
                    type="checkbox"
                    id="all-grass"
                    name="grassType"
                    value="all"
                    className="stadiums-checkbox"
                    checked={grassType === "all"}
                    onChange={handleGrassTypeChange}
                  />
                  <span>All</span>
                </div>
                <div className="stadiums-checkbox-item">
                  <input
                    type="checkbox"
                    id="natural"
                    name="grassType"
                    value="natural"
                    className="stadiums-checkbox"
                    checked={grassType === "natural"}
                    onChange={handleGrassTypeChange}
                  />
                  <span>Natural</span>
                </div>
                <div className="stadiums-checkbox-item">
                  <input
                    type="checkbox"
                    id="artificial"
                    name="grassType"
                    value="artificial"
                    className="stadiums-checkbox"
                    checked={grassType === "artificial"}
                    onChange={handleGrassTypeChange}
                  />
                  <span>Artificial</span>
                </div>
              </div>
              <div className="stadiums-checkbox-group">
                <label className="stadiums-label">Ceiling:</label>
                <div className="stadiums-checkbox-item">
                  <input
                    type="checkbox"
                    id="all-ceiling"
                    name="ceiling"
                    value="all"
                    className="stadiums-checkbox"
                    checked={ceiling === "all"}
                    onChange={handleCeilingChange}
                    color="success"
                  />
                  <span>All</span>
                </div>
                <div className="stadiums-checkbox-item">
                  <input
                    type="checkbox"
                    id="indoor"
                    name="ceiling"
                    value="indoor"
                    className="stadiums-checkbox"
                    checked={ceiling === "indoor"}
                    onChange={handleCeilingChange}
                    color="success"
                  />
                  <span>Indoor</span>
                </div>
                <div className="stadiums-checkbox-item">
                  <input
                    type="checkbox"
                    id="outdoor"
                    name="ceiling"
                    value="outdoor"
                    className="stadiums-checkbox"
                    checked={ceiling === "outdoor"}
                    onChange={handleCeilingChange}
                    color="success"
                  />
                  <span>Outdoor</span>
                </div>
              </div>
              <div className="stadiums-slider-group">
                <label className="stadiums-label">No. of Players:</label>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={(index) =>
                      index === 0
                        ? "Minimum number of players"
                        : "Maximum number of players"
                    }
                    value={players}
                    onChange={(e, newValue) => setPlayers(newValue)}
                    valueLabelDisplay="auto"
                    step={2}
                    marks
                    min={8}
                    max={22}
                    color="success"
                  />
                </Box>
              </div>
              <div className="stadiums-slider-group">
                <label className="stadiums-label">Rating:</label>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={(index) =>
                      index === 0 ? "Minimum rating" : "Maximum rating"
                    }
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={5}
                    color="success"
                  />
                </Box>
              </div>
              <div className="stadiums-form-group">
                <label className="stadiums-label">Sort:</label>
                <select
                  defaultValue={"created_at_desc"}
                  id="sort_order"
                  className="stadiums-select"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price low to high</option>
                  <option value="createdAt_desc">Rating high to low</option>
                  <option value="createdAt_asc">Rating low to high</option>
                </select>
              </div>
              {/* <button
                className="stadiums-button btn-success"
                type="button"
                onClick={applyFilters}
              >
                Search
              </button> */}
            </form>
          </div>
          <div className="stadiums-content">
            <h1 className="stadiums-heading" style={{ marginBottom: 0 }}>
              Stadiums Results:
            </h1>
            <div className="listings">
              {!loading && filteredStadiums.length === 0 && (
                <p className="no-listings">No Stadiums Found!</p>
              )}
              {loading && <p className="loading">Loading...</p>}

              {!loading &&
                filteredStadiums &&
                filteredStadiums.map((stadium) => (
                  <StadiumCard key={stadium._id} stadium={stadium} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stadiums;
