import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="Login-container">
      <div className="Login-login-container">
        <div className="Login-logo-container">
          <h1 className="Login-logo">Reactgram</h1>
        </div>
        <div className="Login-input-top-container">
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
              />
              <Button
                variant="contained"
                color="primary"
                className="Login-button"
                fullWidth
                onClick={() => console.log("clicked")}
                style={{ textTransform: "lowercase" }}
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
              onClick={() => console.log("Login with facebook")}
              size="small"
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
        <div className="Login-input-bottom-container"></div>
      </div>
      <div className="Login-signup-container">
        <div className="Login-signup">
          <p>
            Don't have an account? &nbsp;
            <Link to="signUp" className="Login-signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
