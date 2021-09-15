import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "./components/Login/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
