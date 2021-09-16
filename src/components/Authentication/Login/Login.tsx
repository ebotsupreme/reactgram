import { useState, useEffect } from "react";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";

import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    if (email && password) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [email, password]);

  const handleInputField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (id === "outlined-email") {
      setEmail(value);
    } else if (id === "outlined-password-input") {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    console.log("handleLogin clicked");
  };

  return (
    <div className="Login-container">
      <div className="Login-login-container">
        <div className="Login-logo-container">
          <h1 className="Login-logo">Reactgram</h1>
        </div>
        <div>
          <form>
            <div className="Login-input">
              <TextField
                id="outlined-email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                className="Login-textfield"
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                value={email}
                onChange={handleInputField}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                className="Login-textfield"
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                value={password}
                onChange={handleInputField}
              />
              <Button
                variant="contained"
                color="primary"
                className="Login-button"
                fullWidth
                onClick={handleLogin}
                style={{
                  textTransform: "lowercase",
                  backgroundColor: !isBtnDisabled ? "#0095f6" : "#c4e7ff",
                }}
                disableElevation
                disabled={isBtnDisabled}
              >
                Log In
              </Button>
            </div>
          </form>
          <div className="Login-or-container">
            <div className="Login-line"></div>
            <div className="Login-or">Or</div>
            <div className="Login-line"></div>
          </div>
          <div className="Login-facebook">
            <Button
              variant="contained"
              color="primary"
              className="Login-fb-button"
              fullWidth
              startIcon={<FacebookIcon />}
              onClick={() => console.log("fb btn clicked")}
              size="small"
              disableElevation
            >
              Log in with Facebook
            </Button>
          </div>
          <div className="Login-forgot-password-container">
            <Link to="/forgotPassword" className="Login-forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
      <div className="Login-signup-container">
        <div className="Login-signup">
          <p>
            Don't have an account? &nbsp;
            <Link to="signup" className="Login-signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
