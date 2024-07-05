import "../../styles/loginRegister.css";
import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProfilePicture from "../../hooks/useProfilePicture";
import { jwtDecode } from "jwt-decode";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const LOGIN_URL = "/auth";

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();
  const { setProfilePicture } = useProfilePicture();
  const [identifier, setIdentifier] = useState(
    localStorage.getItem("identifier") ? localStorage.getItem("identifier") : ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("password") ? localStorage.getItem("password") : ""
  );
  const [errMsg, setErrMsg] = useState("");
  const [remember, setRemember] = useState(
    localStorage.getItem("remember") === "yes" ? true : false
  );

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [identifier, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ identifier, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const profilePicture = response?.data?.profilePicture;
      if (profilePicture) {
        setProfilePicture({ image: profilePicture });
      }
      const decoded = jwtDecode(accessToken);
      const { role, id, username } = decoded?.UserInfo;
      setAuth({ accessToken, id, username, role, isAuthenticated: true });
      setIdentifier("");
      setPassword("");
      if (remember) {
        localStorage.setItem("identifier", identifier);
        localStorage.setItem("password", password);
      }
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setErrMsg(err.response.data.message);
      errRef.current.focus();
    }
  };

  const toggleRemeber = () => {
    if (remember) {
      localStorage.setItem("remember", "no");
      localStorage.removeItem("identifier");
      localStorage.removeItem("password");
      setRemember(false);
    } else {
      setRemember(true);
      localStorage.setItem("remember", "yes");
    }
  };

  return (
    <div className="center">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="text"
            id="identifier"
            name="identifier"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setIdentifier(e.target.value)}
            value={identifier}
            required
          />
          <span></span>
          <label htmlFor="identifier">Email or Username</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span></span>
          <label htmlFor="password">Password</label>
        </div>
        <div className="persist">
          <FormControlLabel
            control={
              <Checkbox
                onChange={toggleRemeber}
                checked={remember}
                size="small"
                color="success"
              />
            }
            label="Remember Me"
          />
        </div>

        <input type="submit" value="Login" />

        <div className="signup_link">
          Not a member? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
