import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PropTypes from "prop-types";

const EditStadiumDialog = ({ open, onClose, stadium }) => {
  const axiosPrivate = useAxiosPrivate();
  const [editedStadium, setEditedStadium] = useState({ ...stadium });
  const [selectedImg, setSelectedImg] = useState(null);
  const [preview, setPreview] = useState(stadium.card_image);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEditedStadium(stadium);
    setPreview(stadium.card_image);
  }, [stadium]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "card_image" && files && files[0]) {
      const uploadedFile = event.target.files[0];
      if (uploadedFile && uploadedFile.type.includes("image")) {
        setSelectedImg(uploadedFile);
        setPreview(URL.createObjectURL(uploadedFile));
      } else {
        setSelectedImg(null);
        alert("Please upload a file of type image");
      }
    } else {
      setEditedStadium((prevStadium) => ({
        ...prevStadium,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditedStadium((prevStadium) => ({
      ...prevStadium,
      [name]: checked,
    }));
  };

  const handleUploadImage = async () => {
    if (!selectedImg) return;

    try {
      const formData = new FormData();
      formData.append("name", editedStadium.stadiumName);
      formData.append("cardImage", selectedImg);

      await axiosPrivate.post("/upload/card-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading image");
    }
  };

  const handleSave = async () => {
    const updatedFields = {};

    if (editedStadium.stadiumName !== stadium.stadiumName)
      updatedFields.stadiumName = editedStadium.stadiumName;
    if (editedStadium.city !== stadium.city) updatedFields.city = editedStadium.city;
    if (editedStadium.address !== stadium.address) updatedFields.address = editedStadium.address;
    if (editedStadium.fee !== stadium.fee) updatedFields.fee = editedStadium.fee;
    if (editedStadium.phoneNumber !== stadium.phoneNumber)
      updatedFields.phoneNumber = editedStadium.phoneNumber;
    if (editedStadium.players !== stadium.players) updatedFields.players = editedStadium.players;
    if (editedStadium.isBanned !== stadium.isBanned) updatedFields.isBanned = editedStadium.isBanned;

    if (selectedImg) {
      await handleUploadImage();
    }

    try {
      await axiosPrivate.put(`/stadiums/${editedStadium.id}`, updatedFields);
      setMessage("Stadium has been updated.");
      onClose();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating stadium");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Stadium</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="stadiumName"
          label="Stadium Name"
          type="text"
          fullWidth
          value={editedStadium.stadiumName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="City"
          type="text"
          fullWidth
          value={editedStadium.city}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={editedStadium.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="fee"
          label="Fee"
          type="text"
          fullWidth
          value={editedStadium.fee}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          value={editedStadium.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="players"
          label="Number of Players"
          type="text"
          fullWidth
          value={editedStadium.players}
          onChange={handleChange}
        />
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editedStadium.isBanned}
                onChange={handleCheckboxChange}
                name="isBanned"
              />
            }
            label="Is Banned"
          />
        </Box>
        <Box mt={2}>
          <Typography>Upload a new image for the pitch:</Typography>
          <input
            accept="image/*"
            name="card_image"
            type="file"
            style={{ display: "none" }}
            id="upload-button"
            onChange={handleChange}
          />
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
            >
              Upload Image
            </Button>
          </label>
          {preview && (
            <Box mt={2}>
              <Typography>Current Image:</Typography>
              <img src={preview} alt="Preview" width="300px" />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      {message && <Typography>{message}</Typography>}
    </Dialog>
  );
};

EditStadiumDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  stadium: PropTypes.object.isRequired,
};

export default EditStadiumDialog;
