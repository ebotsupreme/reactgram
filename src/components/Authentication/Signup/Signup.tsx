import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import "./Signup.css";
import { SignupUserWithEmailAndPassword } from "../../../hooks/useAuth";

interface IUser {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  // const [error, setError] = useState(null);
  const [iUser, setIUser] = useState<IUser>();

  const history = useHistory();

  useEffect(() => {
    // may need to validate here first
    if (email && fullname && username && password) {
      handleUser();
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [email, fullname, username, password]);

  const handleInputField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    switch (id) {
      case "outlined-email":
        setEmail(value);
        break;
      case "outlined-fullname":
        setFullname(value);
        break;
      case "outlined-username":
        setUsername(value);
        break;
      case "outlined-password-input":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSignup = () => {
    console.log("handleLogin clicked");
    console.log(email, fullname, username, password);
    console.log("user set: ", iUser);
    if (iUser) {
      SignupUserWithEmailAndPassword(iUser);
      // route user to dashboard upon success
      // need to implement history.push here, might need redux.
    }
  };

  const handleUser = () => {
    setIUser({
      email,
      fullname,
      username,
      password,
    });
  };

  return (
    <div className="Signup-container">
      <div className="Signup-signup-container">
        <div className="Signup-logo-container">
          <h1 className="Signup-logo">Reactgram</h1>
        </div>
        <div className="Signup-header-text">
          Sign up to see photos from your friends.
        </div>
        <div>
          <div className="Signup-facebook">
            <Button
              variant="contained"
              color="primary"
              className="Signup-fb-button"
              fullWidth
              startIcon={<FacebookIcon />}
              onClick={() => console.log("fb btn clicked")}
              size="small"
              disableElevation
              style={{
                textTransform: "lowercase",
              }}
            >
              Log in with Facebook
            </Button>
          </div>
          <div className="Signup-or-container">
            <div className="Signup-line"></div>
            <div className="Signup-or">Or</div>
            <div className="Signup-line"></div>
          </div>
          <form>
            <div className="Signup-input">
              <TextField
                name="email"
                id="outlined-email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                className="Signup-textfield"
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                value={email}
                onChange={handleInputField}
              />
              <TextField
                name="fullname"
                id="outlined-fullname"
                label="Full Name"
                type="text"
                variant="outlined"
                fullWidth
                className="Signup-textfield"
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                value={fullname}
                onChange={handleInputField}
              />
              <TextField
                name="username"
                id="outlined-username"
                label="User Name"
                type="text"
                variant="outlined"
                fullWidth
                className="Signup-textfield"
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                value={username}
                onChange={handleInputField}
              />
              <TextField
                name="password"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                className="Signup-textfield"
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                value={password}
                onChange={handleInputField}
              />
              <Button
                variant="contained"
                color="primary"
                className="Signup-button"
                fullWidth
                onClick={handleSignup}
                style={{
                  textTransform: "lowercase",
                  backgroundColor: !isBtnDisabled ? "#0095f6" : "#c4e7ff",
                }}
                disableElevation
                disabled={isBtnDisabled}
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="Signup-login-container">
        <div className="Signup-login">
          <p>
            Have an account? &nbsp;
            <Link to="login" className="Signup-login-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
