import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetStats = () => {
  const [stats, setStats] = useState({
    stadiums: 0,
    users: 0,
    forms: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosPrivate.get("/admin/getStats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError(error);
      }
      setLoading(false);
    };

    fetchStats();
  }, [axiosPrivate]);

  return { stats, loading, error };
};

export default useGetStats;
