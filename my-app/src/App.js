import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import "./App.css";

//components
import Navbar from "./components/Menu";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import About from "./components/About";
import store from "./store";

//actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

//pages
import snippets from "./pages/snippets";
import references from "./pages/references";
import packages from "./pages/packages";

import bazi from "./pages/demos/bazi";
import voteentry from "./pages/demos/voter/vote-entry";
import vote from "./pages/demos/voter/vote";
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
                <Route path="/snippets" component={snippets} />
                <Route path="/references" component={references} />
                <Route path="/packages" component={packages} />
                <Route path="/about" component={About} />
                <Route path="/demos/bazi" component={bazi} />
                <Route exact path="/demos/vote" component={voteentry} />
                <Route exact path="/demos/vote/:id" component={vote} />
                <Route exact path="/demos/votecreate" component={votecreate} />
              </div>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
