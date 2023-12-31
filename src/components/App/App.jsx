import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// PAGES
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Nav from "../Nav/Nav";
import "./App.css";
import "../../../src/input.css";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import WelcomePage from "../WelcomePage/WelcomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ActionPage from "../ActionPage/ActionPage";
import HomePage from "../HomePage/HomePage";
import SettingsModal from "../SettingsModal/SettingsModal";
import FeaturedPage from "../FeaturedPage/FeaturedPage";
import OwnerNodes from "../OwnerNodes/OwnerNodes";
import UserNodes from "../UserNodes/UserNodes";
import FeaturedModal from "../FeaturedReplyModal/FeaturedModal";

// TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const user = useSelector((store) => store.user);

  // SETTING MODAL
  const openSettings = () => {
    setSettingsOpen(true);
  };
  const closeSettings = () => {
    setSettingsOpen(false);
  };

  // DISPLAY
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCH_NODE" });
    dispatch({ type: "FETCH_POST" });
    dispatch({ type: "FETCH_NODE_ASSOCIATION" });
    dispatch({ type: "FETCH_CURRENT_NODE" });
    dispatch({ type: "FETCH_PUBLIC_POSTS" });
    dispatch({ type: "FETCH_LIKES" });
  }, []);

  return (
    <div className={`bg-bkg/.7 text-text ${isDarkMode ? "light" : "dark"}`}>
      <Router>
        {/* Toastify */}
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          limit={1}
        />

{/* Nav */}
        {user.id && <Nav />}

        {/* Setting */}
        <SettingsModal
          openSettings={openSettings}
          closeSettings={closeSettings}
          isDarkMode={isDarkMode}
        />

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/welcome" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/home"
          >
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ActionPage else shows LoginPage
            exact
            path="/action"
          >
            <ActionPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows FeaturedPage else shows LoginPage
            exact
            path="/featured"
          >
            <FeaturedPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows FeaturedPage else shows LoginPage
            exact
            path="/featured"
          >
            <FeaturedModal />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows OnwerNode else shows LoginPage
            exact
            path="/owner"
          >
            <OwnerNodes />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/usernodes"
          >
            <UserNodes />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/inputcode"
          >
            <ActionPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/createnode"
          >
            <ActionPage />
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /home page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /home page
              <Redirect to="/action" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/welcome">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /home page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the WelcomePage
              <WelcomePage />
            )}
          </Route>

          <Route exact path="/action">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /home page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the ActionPage
              <ActionPage />
            )}
          </Route>

          <Route exact path="/inputcode">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /home page
              <Redirect to="/inputcode" />
            ) : (
              // Otherwise, show the ActionPage
              <ActionPage />
            )}
          </Route>
          <Route exact path="/createnode">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /home page
              <Redirect to="/createnode" />
            ) : (
              // Otherwise, show the ActionPage
              <ActionPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </div>
    // </div>
  );
}

export default App;
