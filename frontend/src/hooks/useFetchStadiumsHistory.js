import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetchStadiumsHistory = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchStadiumsHistory = async () => {
      try {
        const response = await axiosPrivate.get("/bookings");
        setStadiums(response.data);
      } catch (error) {
        console.error("Error fetching stadiums history:", error);
      }
      setLoading(false);
    };

    fetchStadiumsHistory();
  }, []);

  return { stadiums, loading };
};

export default useFetchStadiumsHistory;
