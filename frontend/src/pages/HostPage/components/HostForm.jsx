import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import CustomizedSnackbars from "../../UserProfile/components/CustomizedSnackbars";

const HOST_URL = "/host-form";

const HostForm = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState({
    user: auth.id,
    phone: "",
    pitch: "",
    city: "",
    price: "",
    players: "",
    grassType: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosPrivate
      .post(HOST_URL, formData)
      .then(() => {
        setMessage("Your form has been sent. Thank you!");
        setSeverity("success");
        setShowSnackbar(true);
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message || "An error occurred. Please try again."
        );
        setSeverity("error");
        setShowSnackbar(true);
      });
  };

  return (
    <section id="host-your-pitch" className="contact">
      <div className="container" data-aos="fade-up">
        <div id="form" className="section-title">
          <h2>Host Your Pitch</h2>
          <p>
            Do you own a stadium and want it listed on our platform? Kindly fill
            out the form below, and we will contact you back as soon as we have
            evaluated your request.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-12 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form className="host-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="pitch">Pitch Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pitch"
                    id="pitch"
                    required
                    value={formData.pitch}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="phone">
                    Phone Number &#40;Format: 12-345-678&#41;
                  </label>
                  <input
                    type="tel"
                    pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}"
                    className="form-control"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">Location</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    min={0}
                    required
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="players">
                    No. of Players &#40;i.e. 12&#41;
                  </label>
                  <input
                    type="number"
                    name="players"
                    className="form-control"
                    id="players"
                    required
                    value={formData.players}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="grassType">
                    Grass Type &#40;i.e. natural, artificial, hybrid&#41;
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="grassType"
                    id="grassType"
                    required
                    value={formData.grassType}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">
                  Write us a description for your Pitch
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="10"
                  required
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit">Send Form</button>
                <CustomizedSnackbars
                  showSnackbar={showSnackbar}
                  setShowSnackbar={setShowSnackbar}
                  message={message}
                  severity={severity}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostForm;
