import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetStadiumsAndUsers = () => {
  const [stadiumsMap, setStadiumsMap] = useState({});
  const [usersMap, setUsersMap] = useState({});
  const [mapLoading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchStadiumsAndUsers = async () => {
      try {
        const response = await axiosPrivate.get("/bookings/getStadiumsAndUsers");
        setStadiumsMap(response.data.stadiumsMap);
        setUsersMap(response.data.usersMap);
      } catch (error) {
        console.error("Error fetching stadiums and users:", error);
      }
      setLoading(false);
    };

    fetchStadiumsAndUsers();
  }, [axiosPrivate]);

  return { stadiumsMap, usersMap, mapLoading };
};

export default useGetStadiumsAndUsers;
