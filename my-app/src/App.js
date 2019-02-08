import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import "./main.css";
//import "./App.css";

//components
import Navbar from "./components/Menu";
import ModalContainer from "./components/modal/ModalContainer";
import Footer from "./components/Footer";
import store from "./store";

//actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

//pages
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Landing from "./pages/Landing";
import About from "./pages/About";
import bazi from "./pages/demos/bazi/bazi";
import voteentry from "./pages/demos/voter/vote-entry";
import vote from "./pages/demos/voter/vote";
import VoteResult from "./pages/demos/voter/vote-result";
import votecreate from "./pages/demos/voter/vote-create";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <main>
              <div className="main">
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/about" component={About} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/demos/bazi" component={bazi} />
                <Route exact path="/demos/vote" component={voteentry} />
                <Route exact path="/demos/vote/:id" component={vote} />
                <Route
                  exact
                  path="/demos/vote-result/:id"
                  component={VoteResult}
                />
                <Route exact path="/demos/votecreate" component={votecreate} />
              </div>
            </main>
            <ModalContainer />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
