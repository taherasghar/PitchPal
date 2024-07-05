import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetchForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axiosPrivate.get("/host-form");
        setForms(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchForms();
  }, []);

  const deleteForm = async (ids) => {
    try {
      await axiosPrivate.delete("/host-form", { data: { ids: ids } });
    } catch (error) {
      console.log(error.response.data.message);
    }

    setForms((prevForms) =>
      prevForms.filter((form) => !ids.includes(form._id))
    );
  };

  return { forms, loading, deleteForm };
};

export default useFetchForms;
