import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetUserById = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axiosPrivate
          .get(`/users/${auth?.id}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [auth?.id, axiosPrivate]);

  return { user, loading };
};

export default useGetUserById;
