import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { indigo } from "@mui/material/colors";
import useAuth from "../../../hooks/useAuth";
const SlotsModal = ({ stadium, date, timeSlots, closeSlots, fee, name }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookTimeSlot = () => {
    if (selectedTimeSlot) {
      navigate(
        `/checkout?stadium=${stadium}&date=${date}&timeSlot=${selectedTimeSlot}`,
        { state: { name, fee } }
      );
    } else {
      alert("Please select a time slot.");
    }
  };

  const ColorButton = ({ timeSlot }) => {
    const isSelected = selectedTimeSlot === timeSlot;

    return (
      <Button
        variant="outlined"
        style={{
          color: isSelected ? "white" : "#1976d2",
          backgroundColor: isSelected ? "#1976d2" : "transparent",
          borderColor: "#1976d2",
          width: "100%",
        }}
      >
        {timeSlot}
      </Button>
    );
  };

  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: indigo[400],
    "&:hover": {
      backgroundColor: indigo[600],
    },
  }));

  return (
    <React.Fragment>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        {timeSlots.length
          ? timeSlots.map((timeSlot) => (
              <li
                key={timeSlot}
                onClick={() => handleTimeSlotClick(timeSlot)}
                style={{ marginBottom: "10px" }}
              >
                <ColorButton timeSlot={timeSlot}>{timeSlot}</ColorButton>
              </li>
            ))
          : "All slots are booked!"}
      </ul>
      <ColorButton2
        onClick={handleBookTimeSlot}
        className="btn w-100 d-block mx-auto btnFind"
      >
        Book Slot for ${fee}
      </ColorButton2>
    </React.Fragment>
  );
};

export default SlotsModal;
