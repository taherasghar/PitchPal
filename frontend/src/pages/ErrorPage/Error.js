import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Error() {
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
        <h1>Oops! Something went wrong.</h1>
        <p>You entered an unavailable path. Please go back.</p>
        <Button variant="secondary" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default Error;
