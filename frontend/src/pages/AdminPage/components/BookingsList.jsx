/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Toolbar from "@mui/material/Toolbar";
import useFetchStadiumsHistory from "../../../hooks/useFetchStadiumsHistory";
import useGetStadiumsAndUsers from "../../../hooks/useGetStadiumsAndUsers";
export default function BookingsList() {
  const { stadiums, loading } = useFetchStadiumsHistory();
  const { stadiumsMap, usersMap, mapLoading } = useGetStadiumsAndUsers();
  !mapLoading && console.log(usersMap);
  !mapLoading && console.log(stadiumsMap);
  function Row(props) {
    const { stadiumId,stadiumName, bookings } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {stadiumId}
          </TableCell>
          <TableCell component="th" scope="row">
            {stadiumName}
          </TableCell>
          <TableCell align="right">{/* City */}</TableCell>
          <TableCell align="right">{/* Address */}</TableCell>
          <TableCell align="right">{/* Fee */}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>User ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Match Date</TableCell>
                      <TableCell>Chosen Time Slot</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{usersMap[booking.user]}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.timeSlot}</TableCell>
                        <TableCell>
                          {booking.isExpired ? "Expired" : "Active"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    stadium: PropTypes.string.isRequired,
    bookings: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired, // assuming user is a string, modify as needed
        date: PropTypes.string.isRequired,
        timeSlot: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Bookings List
        </Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Stadium ID</TableCell>
              <TableCell>Stadium Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stadiums.bookings &&
              Object.keys(stadiums.bookings).map((stadiumId) => (
                <Row
                  key={stadiumId}
                  stadiumName={stadiumsMap[stadiumId]}
                  bookings={stadiums.bookings[stadiumId]}
                  stadiumId={stadiumId}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
