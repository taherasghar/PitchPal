import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import useGetUserById from "../../../hooks/useGetUserById.js";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";
import useAuth from "../../../hooks/useAuth.js";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import CustomizedSnackbars from "./CustomizedSnackbars.jsx";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileInfo = () => {
  const [canEdit, setCanEdit] = useState(false);
  const { user } = useGetUserById();
  const [id, setId] = useState("");
  const [fn, setfn] = useState("");
  const [ln, setln] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const { setAuth } = useAuth();
  const [showIcon, setShowIcon] = useState(false);
  const [available, setAvailable] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 4000);
  };

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    setId(user._id);
    setfn(user.firstName);
    setln(user.lastName);
    setUsername(user.username);
    setPhone(user.phone);
    setCity(user.city);
  }, [user]);

  const handleSave = async () => {
    try {
      await axiosPrivate
        .patch("/users", {
          id,
          firstName: fn,
          lastName: ln,
          username,
          phone,
          city,
        })
        .then((response) => {
          handleShowSnackbar();
        });

      setAuth((prev) => ({ ...prev, username: username }));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleUsernameChange = async (username) => {
    try {
      await axiosPrivate
        .post("/users/checkusername", {
          id,
          username,
        })
        .then((response) => {
          setAvailable(response.data.result);
        });
    } catch (error) {
      console.error(error.data.response.message);
    }
  };

  return !id ? (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <div className="col-md-7 border-right">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">Profile Settings</h4>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <TextField
              id="outlined-read-only-input"
              label="First Name"
              defaultValue={fn}
              InputProps={{
                readOnly: !canEdit,
              }}
              onChange={(e) => setfn(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-read-only-input"
              defaultValue={ln}
              label="Last Name"
              InputProps={{
                readOnly: !canEdit,
              }}
              onChange={(e) => setln(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
            <TextField
              id="outlined-read-only-input"
              label="username"
              defaultValue={username}
              InputProps={{
                readOnly: !canEdit,
                endAdornment: (
                  <InputAdornment position="end">
                    {showIcon ? (
                      available ? (
                        <CheckIcon />
                      ) : (
                        <ErrorIcon />
                      )
                    ) : null}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setUsername(e.target.value);
                setShowIcon(true);
                setTimeout(() => {
                  handleUsernameChange(e.target.value);
                }, 300);
              }}
              helperText={
                showIcon
                  ? available
                    ? "username is available"
                    : "username is not available"
                  : null
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <TextField
              id="outlined-read-only-input"
              label="Phone"
              defaultValue={phone}
              InputProps={{
                readOnly: !canEdit,
              }}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-read-only-input"
              label="City"
              defaultValue={city}
              InputProps={{
                readOnly: !canEdit,
              }}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <CustomizedSnackbars
            showSnackbar={showSnackbar}
            setShowSnackbar={setShowSnackbar}
            message={"Profile information updated successfully."}
            severity={"success"}
          />

          {canEdit ? (
            <button
              className="btn btn-success profile-button"
              type="button"
              disabled={!available}
              onClick={
                available
                  ? () => {
                      handleSave();
                      setAuth((prev) => ({ ...prev, username: username }));
                      setCanEdit(!canEdit);
                      setShowIcon(false);
                    }
                  : null
              }
            >
              Save Profile
            </button>
          ) : (
            <button
              className="btn btn-primary profile-button"
              type="button"
              onClick={() => {
                setCanEdit(!canEdit);
              }}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
