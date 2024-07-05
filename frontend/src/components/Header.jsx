import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Logo from "../images/pitchpal-logo.png";
import axios from "../api/axios";
import useLogout from "../hooks/useLogOut";
import useAuth from "../hooks/useAuth";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "../styles/header.css";

const ROLES = {
  user: "user",
  admin: "admin",
};

function Header() {
  const [cities, setCities] = useState([]);
  const [fetchedCities, setFetchedCities] = useState(false);
  const [loading, setloading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const open = Boolean(anchorEl);
  const { auth } = useAuth();

  useEffect(() => {
    setAnchorEl(null); // Reset anchorEl state when auth changes
  }, [auth]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function fetchCities() {
      try {
        await axios
          .get("http://localhost:4000/stadiums/cities", {})
          .then(function (response) {
            setCities(response.data);
            setFetchedCities(true);
            setloading(false);
          });
      } catch (error) {
        setloading(false);
        console.log(error.response.data.message);
      }
    }
    fetchCities();
  }, []);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await axios.get(`/stadiums/suggestions`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        //console.log(suggestions);
      }
    }
    fetchSuggestions();
  }, []);

  function handleSelectCity(event) {
    setSelectedCity(event.target.value);
  }

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value.replace(/\s+/g, " ").trim());
  }

  const signout = async () => {
    logout();
    navigate("/");
  };

  function handleLogin() {
    navigate("/login");
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <Link
            className="d-flex align-items-center"
            to="/"
            style={{ textDecoration: "none", color: "#2baa60" }}
          >
            <img src={Logo} alt="Logo" style={{ width: 50, height: "auto" }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Kanit",
                fontWeight: 800,
                fontStyle: "italic",
                color: "#2baa60",
                textDecoration: "none",
                "&:hover": {
                  color: "inherit",
                },
              }}
            >
              PitchPal
            </Typography>
          </Link>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <Typography
                className="offcanvas-title"
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { md: "flex" },
                  fontFamily: "Kanit",
                  fontWeight: 800,
                  fontStyle: "italic",
                  color: "#2baa60",
                  textDecoration: "none",
                  "&:hover": {
                    color: "inherit",
                  },
                }}
              >
                PitchPal
              </Typography>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-link nav-item">
                  <input
                    className="mx-lg-2 form-control search-area"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    list="list-timezone"
                    id="input-datalist-offcanvas"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        window.location.href = `/stadiums?stadium=${searchQuery}&city=${selectedCity}`;
                      }
                    }}
                    onChange={(event) => {
                      handleSearchQueryChange(event);
                    }}
                    style={{
                      width: "250px",
                      border: "2px solid #2baa60",
                      borderRadius: "5px",
                    }}
                  />
                </li>
                <li className="nav-link nav-item">
                  <select
                    defaultValue={"Select City"}
                    name="select"
                    className="mx-lg-2 form-select"
                    onChange={handleSelectCity}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        window.location.href = `/stadiums?stadium=${searchQuery}&city=${selectedCity}`;
                      }
                    }}
                    style={{
                      width: "250px",
                      border: "2px solid #2baa60",
                      borderRadius: "5px",
                      padding: ".375rem .75rem",
                    }}
                  >
                    <option value="Select City" disabled>
                      Select City
                    </option>
                    {loading === false ? (
                      cities.map((element) => {
                        return (
                          <option key={element} value={element}>
                            {element}
                          </option>
                        );
                      })
                    ) : (
                      <option value="Loading..." disabled>
                        Loading...
                      </option>
                    )}
                  </select>
                </li>
                <li className="nav-item host-a-pitch">
                  <Link
                    className="nav-link d-flex flex-nowrap"
                    to="/host-a-pitch"
                    style={{
                      textDecoration: "none",
                      color: "#2baa60",
                      fontFamily: "Roboto Slab",
                      margin: "auto",
                    }}
                  >
                    Host a Pitch
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <input
            className="mx-lg-2 form-control search-area search-field"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            list="list-timezone"
            id="input-datalist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                window.location.href = `/stadiums?stadium=${searchQuery}&city=${selectedCity}`;
              }
            }}
            onChange={(event) => {
              handleSearchQueryChange(event);
            }}
            style={{ border: "2px solid #2baa60", borderRadius: "5px" }}
          />
          <Link
            className="flex-nowrap host-a-pitch-lg"
            to="/host-a-pitch"
            style={{
              textDecoration: "none",
              color: "#2baa60",
              fontFamily: "Roboto Slab",
              margin: "20px",
            }}
          >
            Host a Pitch
          </Link>
          <div>
            {auth?.role === ROLES.admin || auth?.role === ROLES.user ? (
              <React.Fragment>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<PersonOutlineIcon />}
                  variant="contained"
                >
                  {auth?.username}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {auth.role === ROLES.admin && (
                    <MenuItem
                      onClick={() => {
                        navigate(`/dashboard`);
                        handleClose();
                      }}
                    >
                      <Button
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        endIcon={<DashboardRoundedIcon />}
                      >
                        Dashboard
                      </Button>{" "}
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      navigate(`/profile`);
                      handleClose();
                    }}
                  >
                    <Button
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      endIcon={<ManageAccountsIcon />}
                    >
                      Profile
                    </Button>{" "}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate(`/bookings`);
                      handleClose();
                    }}
                  >
                    <Button
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      endIcon={<AlarmOnIcon />}
                    >
                      Bookings
                    </Button>{" "}
                  </MenuItem>
                  <MenuItem onClick={signout}>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      endIcon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleLogin}
                endIcon={<LoginRoundedIcon />}
                variant="contained"
              >
                LOGIN
              </Button>
            )}
          </div>
          <button
            className="navbar-toggler pe-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      {/* End of Navbar */}
    </>
  );
}

export default Header;
