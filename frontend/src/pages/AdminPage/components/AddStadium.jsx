import React, { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const ADDSTADIUM_URL = "/stadiums";

const AddStadium = () => {
  const axiosPrivate = useAxiosPrivate();
  const [pitchData, setPitchData] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    address: "",
    fee: "",
    players: "",
    grassType: "",
    description: "",
    starting_hour: "",
    ending_hour: "",
    slots: [],
    googleCoordinates: "",
    indoor_outdoor: "",
    toilets: "",
    ball: "",
    shirts: "",
  });
  const [selectedImg, setSelectedImg] = useState(null);
  const [message, setMessage] = useState("");
  const [startingHour, setStartingHour] = useState(null);
  const [endingHour, setEndingHour] = useState(null);
  const [slotDuration, setSlotDuration] = useState(null);
  const [slots, setSlots] = useState([]);
  const hoursArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "card_image" && files && files[0]) {
      const uploadedFile = event.target.files[0];
      if (uploadedFile && uploadedFile.type.includes("image")) {
        setSelectedImg(uploadedFile);
      } else {
        setSelectedImg(null);
        alert("Please upload a file of type image");
      }
    } else {
      if (name === "starting_hour") {
        setStartingHour(Number.parseInt(value));
      } else if (name === "ending_hour") {
        setEndingHour(Number.parseInt(value));
      } else if (name === "slot_duration") {
        setSlotDuration(Number.parseInt(value));
      }
      setPitchData((pitchData) => ({
        ...pitchData,
        [name]: value,
      }));
    }
  }

  useEffect(() => {
    function generateTimeSlots(startHour, endHour, slotDuration) {
      const startTime = new Date();
      startTime.setHours(startHour, 0, 0); // Set start time

      const endTime = new Date();
      endTime.setHours(endHour, 0, 0); // Set end time

      const slots = [];
      let currentTime = startTime;

      while (currentTime < endTime) {
        const slotStartTime = new Date(currentTime);
        const slotEndTime = new Date(
          currentTime.getTime() + slotDuration * 60000
        ); // Calculate end time based on slot duration

        if (slotEndTime <= endTime) {
          const slotString = `${formatTime(slotStartTime)} to ${formatTime(
            slotEndTime
          )}`;
          slots.push(slotString);
        }

        // Move to the next slot
        currentTime = slotEndTime;
      }

      return slots;
    }

    function formatTime(time) {
      let hours = time.getHours();
      let minutes = time.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
      minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero to minutes
      return `${hours}:${minutes} ${ampm}`;
    }

    // Example usage
    if (slotDuration && startingHour && endingHour) {
      const ReturnedSlots = generateTimeSlots(
        startingHour,
        endingHour,
        slotDuration
      );
      setSlots(ReturnedSlots);
      console.log(ReturnedSlots);
    }
  }, [endingHour, startingHour, slotDuration]);

  const 
  handleUploadImage = async () => {
    if (!selectedImg) {
      alert("Please select a file.");
      return;
    }
    console.log("Well i will upload it!");
    try {
      const formData = new FormData();
      const name = pitchData.name;
      formData.append("name", name);
      formData.append("cardImage", selectedImg);

      await axiosPrivate.post("/upload/card-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("Hey this upload has failed");
      setMessage(error.response.data.message);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (slots) {
      pitchData.slots = slots;
    }
    axiosPrivate
      .post(ADDSTADIUM_URL, pitchData) //Path to be filled
      .then((response) => {
        if (response.status === 201) {
          handleUploadImage();
          setMessage("Stadium has been added.");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }

  return (
    <main className="NewStadium">
      <h2>New Stadium</h2>
      <form className="newStadiumForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Stadium Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="city">Stadium City:</label>
        <input
          id="city"
          name="city"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="address">Stadium Address:</label>
        <input
          id="address"
          name="address"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="fee">Stadium Fee:</label>
        <input
          id="fee"
          type="text"
          name="fee"
          required
          onChange={handleChange}
        />
        <label htmlFor="players">Stadium No of Players:</label>
        <input
          id="players"
          name="players"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="grassType">Grass Type:</label>
        <input
          id="grassType"
          name="grassType"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          type="text"
          required
          onChange={handleChange}
        />
        <div className="row mt-4 mb-4">
          <div className="col-4">
            <label htmlFor="starting_hour">Starting hour:&nbsp;</label>
            <select
              id="starting_hour"
              name="starting_hour"
              type="text"
              className="form-select"
              defaultValue={"Choose a starting hour"}
              required
              onChange={handleChange}
            >
              <option
                key={"Choose a starting hour"}
                value="Choose a starting hour"
                disabled
              >
                Choose a starting hour
              </option>
              {hoursArray.map((hr) => {
                return (
                  <option key={hr} value={hr}>
                    {hr}
                  </option>
                );
              })}
            </select>{" "}
          </div>
          <div className="col-4">
            <label htmlFor="ending_hour">Ending hour:&nbsp;</label>
            <select
              id="ending_hour"
              name="ending_hour"
              defaultValue={"Choose an ending hour"}
              type="text"
              className="form-select"
              required
              onChange={handleChange}
            >
              {" "}
              <option
                key={"Choose an ending hour"}
                value="Choose an ending hour"
                disabled
              >
                Choose an ending hour
              </option>
              {hoursArray.map((hr) => {
                return (
                  <option key={hr} value={hr}>
                    {hr}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            {" "}
            <label htmlFor="slot_duration">Slot Duration:&nbsp;</label>
            <select
              id="slot_duration"
              defaultValue={"Choose a slot duration"}
              name="slot_duration"
              type="text"
              className="form-select"
              required
              onChange={handleChange}
            >
              <option
                key={"Choose a slots duration"}
                value="Choose a slot duration"
                disabled
              >
                Choose a slot duration
              </option>
              <option key={60} value="60">
                60
              </option>
              ;
              <option key={90} value="90">
                90
              </option>
              ;
            </select>
          </div>
        </div>

        <label htmlFor="googleCoordinates">Google Coordinates:</label>
        <input
          id="googleCoordinates"
          type="text"
          required
          name="googleCoordinates"
          onChange={handleChange}
        />
        <label htmlFor="indoor_outdoor">Indoor or Outdoor?</label>
        <input
          id="indoor_outdoor"
          type="text"
          name="indoor_outdoor"
          required
          onChange={handleChange}
        />
        <label htmlFor="toilets">Are there toilets?</label>
        <input
          id="toilets"
          name="toilets"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="ball">Does the pitch has a ball?</label>
        <input
          id="ball"
          type="text"
          name="ball"
          required
          onChange={handleChange}
        />
        <label htmlFor="shirts">Does the pitch has shirts?</label>
        <input
          id="shirts"
          type="text"
          name="shirts"
          required
          onChange={handleChange}
        />
        <label htmlFor="card_image">Upload an image for the pitch:</label>
        <input
          id="card_image"
          accept="image/*"
          name="card_image"
          type="file"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <p>{message}</p>
      </form>
    </main>
  );
};

export default AddStadium;
