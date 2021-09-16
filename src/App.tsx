import Login from "./components/Authentication/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import SignUp from "./components/Authentication/Signup/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
