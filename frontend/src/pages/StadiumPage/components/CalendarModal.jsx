import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SlotsModal from "./SlotsModal";
import useBookedSlots from "../../../hooks/useBookedSlots";
import { SimpleDialog } from "../../../components/PopoverDialogLogin";
import useAuth from "../../../hooks/useAuth";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CalendarModal = ({ selectedDate, data }) => {
  const [open, setOpen] = React.useState(false);
  const { auth } = useAuth();
  const { bookedSlotArray, loading } = useBookedSlots({
    id: data._id,
    date: selectedDate ? selectedDate : null,
  });
  const isAfterCurrentTime = (slot) => {
    const now = new Date();
    const [slotStartTime, slotPeriod] = slot.split(' to ')[0].split(' ');
    let [slotHours, slotMinutes] = slotStartTime.split(':').map(Number);

    if (slotPeriod === 'PM' && slotHours !== 12) {
      slotHours += 12;
    } else if (slotPeriod === 'AM' && slotHours === 12) {
      slotHours = 0;
    }

    const slotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), slotHours, slotMinutes);
    return slotDate > now;
  };

  const today = new Date().toISOString().split('T')[0];
  const availableSlots = data.slots.filter((slot) => {
    if (selectedDate === today) {
      return !bookedSlotArray.includes(slot) && isAfterCurrentTime(slot);
    }
    return !bookedSlotArray.includes(slot);
  });

  console.log(availableSlots);
  console.log(selectedDate);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="w-100 d-block mx-auto"
        style={{
          backgroundColor: "#1976d2",
          width: "153px",
          textTransform: "uppercase",
          color: "white",
          height: "40px",
          borderRadius: "8px",
        }}
        disabled={loading || !selectedDate}
      >
        Show Available Time Slots
      </Button>
      {auth.isAuthenticated ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h3
              id="parent-modal-title"
              style={{
                marginBottom: "1rem",
              }}
            >
              Select from the below slots
            </h3>

            <SlotsModal
              stadium={data._id}
              date={selectedDate ? selectedDate : null}
              timeSlots={availableSlots}
              closeSlots={handleClose}
              fee={data.fee}
              name={data.name}
            />
          </Box>
        </Modal>
      ) : (
        <SimpleDialog open={open} />
      )}
    </div>
  );
};

export default CalendarModal;
