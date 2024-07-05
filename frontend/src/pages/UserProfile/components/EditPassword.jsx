import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CustomizedSnackbars from "./CustomizedSnackbars";
const EditPassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);
  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 4000);
  };
  const handleSave = async () => {
    setLoading(true);

    try {
      const response = await axiosPrivate.post("/users/changepassword", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setMessage("");
      handleShowSnackbar();
      setOldPassword("");
      setConfirmPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="col-md-7 border-right">
      <div className="p-3 py-5">
        <h4 className="text-right">Update Password</h4>
        <div className="row mt-2">
          <div className="col-md-6">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Old Password
              </InputLabel>
              <Input
                id="filled-adornment-password"
                type={showPassword1 ? "text" : "password"}
                onChange={(event) => setOldPassword(event.target.value)}
                value={oldPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                    >
                      {!showPassword1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="col mt-4">
          <div className="col-md-6">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                New Password
              </InputLabel>
              <FilledInput
                type={showPassword2 ? "text" : "password"}
                onChange={(event) => setNewPassword(event.target.value)}
                value={newPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      edge="end"
                    >
                      {!showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Confirm New Password
              </InputLabel>
              <FilledInput
                type={showPassword3 ? "text" : "password"}
                onChange={(event) => setConfirmPassword(event.target.value)}
                value={confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword3}
                      edge="end"
                    >
                      {!showPassword3 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="col mt-4">
          <div className="col-md-3">
            <LoadingButton
              color="primary"
              onClick={handleSave}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
            <CustomizedSnackbars
              showSnackbar={showSnackbar}
              setShowSnackbar={setShowSnackbar}
              message={
                "Password updated. You can now log in with your new password."
              }
              severity={"success"}
            />
          </div>
        </div>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
};

export default EditPassword;
