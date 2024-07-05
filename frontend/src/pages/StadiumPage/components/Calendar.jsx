import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import CalendarModal from "./CalendarModal";

const Calendar = (props) => {
  const stadium = props.data;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const today = dayjs();

  const formatDate = (date) => {
    return date.format("YYYY-MM-DD");
  };

  const getSelectedHourAndMinute = (date) => {
    return dayjs().format("HH:mm"); // Format hour and minute as "hr:min"
  };

  const isDateBeforeToday = (date) => date < today;
  return (
    <div className="d-block editPicker">
      <div className="d-none d-md-block">
        <p
          className="textSmall text-center p-4"
          style={{
            marginBottom: "0",
            fontWeight: "bold",
          }}
        >
          Select date to show available slots
        </p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(newDate);
            }}
            shouldDisableDate={(date) =>
              isDateBeforeToday(date) && !date.isSame(today, "day")
            }
          />
        </LocalizationProvider>
      </div>
      <div className="d-block d-md-none mb-3">
        <h5>Book a Match</h5>
        <img
          src="https://i.imgur.com/8Qsxl1C.png"
          className="bgImg"
          alt="img"
        />
        <p className="textSmall text-center p-4">
          Select date to show available slots
        </p>
        <div className="d-flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              shouldDisableDate={(date) =>
                isDateBeforeToday(date) && !date.isSame(today, "day")
              }
            />
          </LocalizationProvider>
        </div>
      </div>
      <CalendarModal selectedDate={formatDate(selectedDate)} data={stadium} />
    </div>
  );
};

export default Calendar;
