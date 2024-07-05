/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useBookedSlotsByUserId = ({ user }) => {
  const [bookedSlotsById, setBookedSlotsById] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchBookedSlotsById = async () => {
      try {
        const response = await axiosPrivate.get(
          `/bookings/get-active-bookings-for-user/${user}`
        );
        setBookedSlotsById(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.message);
      }
      setLoading(false);
    };

    fetchBookedSlotsById();
  }, [axiosPrivate, user]); // Ensure useEffect runs only when these dependencies change

  return { bookedSlotsById, loading };
};

export default useBookedSlotsByUserId;
