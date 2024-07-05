import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axiosPrivate
          .get("/users")
          .then((response) => {
            setUsers(response.data);
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
  }, []);

  const deleteUser = async (ids) => {
    try {
      await axiosPrivate.delete("/users", { data: { ids: ids } });
    } catch (error) {
      console.log(error.response?.data.message);
    }

    setUsers((prevUsers) =>
      prevUsers.filter((user) => !ids.includes(user._id))
    );
  };

  return { users, loading, deleteUser, setUsers };
};

export default useFetchUsers;
