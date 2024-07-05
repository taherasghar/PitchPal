import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Title from "../AdminPage/components/Title";
import useGetStats from "../../hooks/useGetStats";
const DashboardHome = () => {
  const { loading, stats } = useGetStats();
  return (
    !loading && (
      <>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <div style={{ textAlign: "center" }}>
              <h1>Welcome to the Admin's Dashboard</h1>
              <p>Check the lists and take actions!</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <React.Fragment>
              <Title>Users</Title>
              <Typography component="p" variant="h4">
                {stats.users}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {""}
              </Typography>
              <div>
                <Link to="/dashboard/users">View Details</Link>
              </div>
            </React.Fragment>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <React.Fragment>
              <Title>Stadiums</Title>
              <Typography component="p" variant="h4">
                {stats.stadiums}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {""}
              </Typography>
              <div>
                <Link to="/dashboard/stadiums">View Details</Link>
              </div>
            </React.Fragment>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <React.Fragment>
              <Title>Bookings</Title>
              <Typography component="p" variant="h4">
                {stats.bookings}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {""}
              </Typography>
              <div>
                <Link to="/dashboard/bookings">View Details</Link>
              </div>
            </React.Fragment>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <React.Fragment>
              <Title>Forms</Title>
              <Typography component="p" variant="h4">
                {stats.forms}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {""}
              </Typography>
              <div>
                <Link to="/dashboard/forms">View Details</Link>
              </div>
            </React.Fragment>
          </Paper>
        </Grid>
      </>
    )
  );
};

export default DashboardHome;
