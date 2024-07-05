import { useContext } from "react";
import ProfilePictureContext from "../context/ProfilePictureProvider";
const useProfilePicture = () => {
  return useContext(ProfilePictureContext);
};

export default useProfilePicture;
