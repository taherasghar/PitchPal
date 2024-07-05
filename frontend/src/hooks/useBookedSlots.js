/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useBookedSlots = ({ id, date }) => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axiosPrivate.get(
          `/bookings/get-booked-slots-for-a-stadium/${id}/${date}`
        );
        setBookedSlots(response?.data);
      } catch (error) {
        console.error("Error:", error.response.data.message);
      }
      setLoading(false);
    };

    fetchBookedSlots();
  }, [axiosPrivate, id, date]); // Ensure useEffect runs only when these dependencies change
  const bookedSlotArray = bookedSlots.map((obj) => obj.timeSlot);

  return { bookedSlotArray, loading };
};

export default useBookedSlots;
