import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleIcon from "@mui/icons-material/People";
import StadiumIcon from "@mui/icons-material/Stadium";
import FeedIcon from "@mui/icons-material/Feed";
import { Link } from "react-router-dom";

export const mainListItems = (
  <>
    <React.Fragment>
      {" "}
      <Link style={{ color: "black" }} to="/dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link style={{ color: "black" }} to="/dashboard/users">
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </Link>
      <Link style={{ color: "black" }} to="/dashboard/stadiums">
        <ListItemButton>
          <ListItemIcon>
            <StadiumIcon />
          </ListItemIcon>
          <ListItemText primary="Stadiums" />
        </ListItemButton>
      </Link>
      <Link style={{ color: "black" }} to="/dashboard/bookings">
        <ListItemButton>
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItemButton>
      </Link>
      <Link style={{ color: "black" }} to="/dashboard/forms">
        <ListItemButton>
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="Forms" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  </>
);
