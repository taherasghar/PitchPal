import React from "react";
import { Outlet } from "react-router-dom";
import LeftTablPanel from "./LeftSideBar.jsx";
import useAuth from "../../../hooks/useAuth.js";
import useGetUserById from "../../../hooks/useGetUserById.js";
import useProfilePicture from "../../../hooks/useProfilePicture.js";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const UserProfileLayout = () => {
  const { auth } = useAuth();
  const { user, loading } = useGetUserById();
  const { profilePicture } = useProfilePicture();
  return loading ? (
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
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle"
              width="150px"
              alt={`${auth?.username} profile`}
              src={
                profilePicture?.image
                  ? profilePicture.image
                  : "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
              }
            />
            <span className="font-weight-bold">{auth?.username}</span>
            <span className="text-black-50">{user.email}</span>
          </div>
          <LeftTablPanel />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfileLayout;
