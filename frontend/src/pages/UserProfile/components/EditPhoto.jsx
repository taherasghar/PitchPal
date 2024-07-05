import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.js";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomizedSnackbars from "./CustomizedSnackbars.jsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";
import useProfilePicture from "../../../hooks/useProfilePicture.js";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const EditPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { auth } = useAuth();
  const [previewImage, setPreviewImage] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [showSnackbarSave, setShowSnackbarSave] = useState(false);
  const [showSnackbarDelete, setShowSnackbarDelete] = useState(false);
  const { profilePicture, setProfilePicture } = useProfilePicture();
  const handleShowSnackbarSave = () => {
    setShowSnackbarSave(true);
    setTimeout(() => {
      setShowSnackbarSave(false);
    }, 4000);
  };
  const handleShowSnackbarDelete = () => {
    setShowSnackbarDelete(true);
    setTimeout(() => {
      setShowSnackbarDelete(false);
    }, 4000);
  };

  useEffect(() => {
    setUserProfilePicture(profilePicture?.image);
  }, [profilePicture]);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type.includes("image")) {
      setSelectedFile(uploadedFile);
      setPreviewImage(URL.createObjectURL(uploadedFile)); // Set preview image
    } else {
      setSelectedFile(null);
      setPreviewImage(null); // Clear preview image
      alert("Please upload a file of type image");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      const { id } = auth;
      formData.append("id", id);

      formData.append("profilePicture", selectedFile);

      await axiosPrivate.post("/upload/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      setUserProfilePicture(null);
      console.error(
        "Error uploading profile picture:",
        error.response.data.message
      );
    } finally {
      handleShowSnackbarSave();
      const id = auth?.id;
      const response = await axiosPrivate.get(`upload/profilepicture/${id}`);
      setProfilePicture({ image: response.data });
      setUploading(false);
    }
  };
  const handleDelete = async () => {
    if (!userProfilePicture) {
      alert("no user profile");
      return;
    }
    try {
      const id = auth?.id;
      await axiosPrivate.delete("/upload/profile", { data: { id } });
    } catch (error) {
      console.error(
        "Error deleting profile picture:",
        error.response.data.message
      );
    } finally {
      setProfilePicture({});
      setUserProfilePicture(null);
      setPreviewImage(null);
      handleShowSnackbarDelete();
    }
  };
  return (
    <div className="col-md-7 border-right">
      <div className="p-3 py-5">
        <h4 className="text-right">Update Profile Picture</h4>
        <div className="col-md-12">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{
                height: "auto",
                marginTop: "10px",
                maxHeight: "300px",
                maxWidth: "100%",
              }}
            />
          )}
          {!previewImage && (
            <img
              src={
                userProfilePicture
                  ? userProfilePicture
                  : "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
              }
              alt="user profile pic"
              style={{
                height: "auto",
                marginTop: "10px",
                maxHeight: "300px",
                maxWidth: "100%",
              }}
            />
          )}
        </div>
        <div className="row mt-2 col-md-8">
          <div className="col-md-6">
            <Button
              component="label"
              role={undefined}
              onChange={handleFileChange}
              variant="contained"
              disabled={Boolean(userProfilePicture)}
              tabIndex={-1}
              fullWidth
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <div className="col-md-6">
            <CustomizedSnackbars
              showSnackbar={showSnackbarSave}
              setShowSnackbar={setShowSnackbarSave}
              message={"Great! Your new profile picture is now live."}
              severity={"success"}
            />
            <CustomizedSnackbars
              showSnackbar={showSnackbarDelete}
              setShowSnackbar={setShowSnackbarDelete}
              message={
                "Profile picture successfully removed. You can upload a new one anytime."
              }
              severity={"error"}
            />
            <LoadingButton
              color="primary"
              onClick={handleUpload}
              loading={uploading}
              loadingPosition="start"
              fullWidth
              disabled={!previewImage}
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
          </div>
        </div>
        {userProfilePicture ? (
          <div className="row mt-2 col-md-8">
            <div className="col-md-12">
              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditPhoto;
