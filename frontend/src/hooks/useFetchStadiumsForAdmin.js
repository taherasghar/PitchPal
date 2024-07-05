import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetchStadiumsForAdmin = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const response = await axiosPrivate.get("/stadiums/get-stadiums-for-admin-dashboard");
        setStadiums(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchStadiums();
  }, []);

  const deleteStadium = async (ids) => {
    try {
      await axiosPrivate.delete("/stadiums", { data: { ids: ids } });
    } catch (error) {
      console.log(error.response.data.message);
    }

    setStadiums((prevStadiums) =>
      prevStadiums.filter((stadium) => !ids.includes(stadium._id))
    );
  };

  return { stadiums, loading, deleteStadium };
};

export default useFetchStadiumsForAdmin;
