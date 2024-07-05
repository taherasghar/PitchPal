import useAuth from "./useAuth";
const useAccessToken = () => {
  const { auth } = useAuth();
  return auth?.useAccessToken;
};

export default useAccessToken;
