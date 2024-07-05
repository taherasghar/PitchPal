import axios from "../api/axios";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";
import useProfilePicture from "./useProfilePicture";
const useRefreshToken = () => {
  const {  setAuth } = useAuth();
  const { setProfilePicture } = useProfilePicture();
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    const accessToken = response?.data?.accessToken;
    const profilePicture = response?.data?.profilePicture;
    if (profilePicture) {
      setProfilePicture({ image: profilePicture });
    }
    const decoded = jwtDecode(accessToken);
    const { role, id, username } = decoded?.UserInfo;
    setAuth({ accessToken, id, username, role, isAuthenticated: true });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
