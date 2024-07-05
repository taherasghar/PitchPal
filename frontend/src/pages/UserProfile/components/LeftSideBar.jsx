import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";

const LeftTablPanel = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabValue = () => {
    if (location.pathname === "/profile") {
      return 0;
    } else if (location.pathname === "/profile/edit-photo") {
      return 1;
    } else if (location.pathname === "/profile/edit-password") {
      return 2;
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 250,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue()}
        onChange={handleChange}
        aria-label="User Profile Options"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Profile"
          onClick={() => {
            navigate("/profile");
          }}
        />
        <Tab
          label="Photo"
          onClick={() => {
            navigate("/profile/edit-photo");
          }}
        />
        <Tab
          label="Password"
          onClick={() => {
            navigate("/profile/edit-password");
          }}
        />
      </Tabs>
    </Box>
  );
};

export default LeftTablPanel;
