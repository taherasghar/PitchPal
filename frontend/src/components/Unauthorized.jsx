import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Unauthorized!</h1>
        <p>You don't have access to this path. Please go back.</p>
        <Button variant="secondary" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
