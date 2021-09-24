import { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/sections/Header";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SingIn";
import ForgotPassword from "./components/pages/ForgotPassword";
import Homepage from "./components/pages/Homepage";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Loader from "./components/UI/Loader";
import { auth, onAuthStateChanged } from "./firebase/config";
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "./store/actions/authActions";
import { RootState } from "./store";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// import Dashboard from "./components/Dashboard/Dashboard";
// import ForgotPassword from "./components/auth/ForgotPassword/ForgotPassword";
// import Login from "./components/auth/Login/Login";
// import Signup from "./components/auth/Signup/Signup";

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("onAuthStaetChanged: ", user);
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  // const [isUserAuthenticated, setUserAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   console.log("token", token);
  //   if (token) {
  //     setUserAuthenticated(true);
  //   }
  // }, [isUserAuthenticated]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>

    //   <div className="App">
    //    <Router>
    //     <Route
    //       exact
    //       path="/"
    //       render={() => {
    //         return isUserAuthenticated ? (
    //           <Redirect to="/" />
    //         ) : (
    //           <Redirect to="/login" />
    //         );
    //       }}
    //     />
    //     <Switch>
    //       <Route exact path="/forgotPassword" component={ForgotPassword} />
    //       <Route exact path="/login" component={Login} />
    //       <Route exact path="/signup" component={Signup} />
    //       <Route exact path="/" component={Dashboard} />
    //     </Switch>
    //   </Router>
    // </div>
  );
};

export default App;
