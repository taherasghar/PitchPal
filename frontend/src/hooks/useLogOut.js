import axios from "../api/axios";
import useAuth from "./useAuth";
import useProfilePicture from "./useProfilePicture";
const useLogout = () => {
  const { setAuth } = useAuth();
  const { setProfilePicture } = useProfilePicture();

  const logout = async () => {
    setAuth({});
    setProfilePicture({});
    try {
      await axios.post("/auth/logout", null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return logout;
};

export default useLogout;
