import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const location = useLocation();
  const { state } = location;
  const name = state && state.name;
  const fee = state && state.fee;
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const stadium = searchParams.get("stadium");
  const date = searchParams.get("date");
  const timeSlot = searchParams.get("timeSlot");

  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePaymentComplete = async (event) => {
    event.preventDefault();
    try {
      setPaymentCompleted(true);
      const response = await axiosPrivate.post("/bookings", {
        user: auth.id,
        stadium,
        date,
        timeSlot,
      });
      navigate("/bookings");
    } catch (error) {
      alert("Error completing payment. " + error.response.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src="https://e7.pngegg.com/pngimages/930/741/png-clipart-round-green-check-mark-illustration-check-mark-bottle-material-green-tick-miscellaneous-angle.png"
            alt=""
            width="72"
            height="57"
          />
          <h2>Booking Confirmation</h2>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-success">Your Booking Details</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Stadium name</h6>
                  <small className="text-body-secondary">{name}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Date of Match</h6>
                  <small className="text-body-secondary">{date}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Chosen Time Slot</h6>
                  <small className="text-body-secondary">{timeSlot}</small>
                </div>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <span>Fee</span>
                <strong>${fee}</strong>
              </li>
            </ul>
          </div>
          <section style={{ padding: 12 }} className="col-md-7 col-lg-8">
            {!paymentCompleted && (
              <React.Fragment>
                <form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handlePaymentComplete}
                >
                  <hr className="my-4" />

                  <h4 className="mb-3">Payment</h4>

                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label htmlFor="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        placeholder=""
                        required=""
                      />
                      <small className="text-body-secondary">
                        Full name as displayed on card
                      </small>
                      <div className="invalid-feedback">
                        Name on card is required
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cc-number" className="form-label">
                        Credit card number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder=""
                        required=""
                      />
                      <div className="invalid-feedback">
                        Credit card number is required
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder=""
                        required=""
                      />
                      <div className="invalid-feedback">
                        Expiration date required
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="cc-cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        placeholder=""
                        required=""
                      />
                      <div className="invalid-feedback">
                        Security code required
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-success btn-lg"
                    type="submit"
                  >
                    CONFIRM
                  </button>
                </form>
              </React.Fragment>
            )}
            {paymentCompleted && (
              <h1
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "50vh",
                }}
              >
                Payment Successfully Completed!
              </h1>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Checkout;
