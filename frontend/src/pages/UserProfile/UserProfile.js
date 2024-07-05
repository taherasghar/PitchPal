import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfileLayout from "./components/UserProfileLayout";
import ProfileInfo from "./components/ProfileInfo";
import EditPhoto from "./components/EditPhoto";
import EditPassword from "./components/EditPassword";
import Error from "../ErrorPage/Error";

const UserProfile = () => {
  return (
    <Routes>
      <Route path="/" element={<UserProfileLayout />}>
        <Route index element={<ProfileInfo />} />
        <Route path="edit-photo" element={<EditPhoto />} />
        <Route path="edit-password" element={<EditPassword />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default UserProfile;
