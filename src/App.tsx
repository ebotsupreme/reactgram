import { useState, useEffect, FC } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import Login from "./components/Authentication/Login/Login";
import Signup from "./components/Authentication/Signup/Signup";

const App: FC = () => {
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      setUserAuthenticated(true);
    }
  }, [isUserAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Route
          exact
          path="/"
          render={() => {
            return isUserAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Switch>
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
