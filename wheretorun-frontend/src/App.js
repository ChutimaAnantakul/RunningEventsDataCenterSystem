import React, { Component } from "react";
import "./App.css";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
// import App from "./App";

import Navbar from "./components/layout/Navbar";
import NavbarOrg from "./components/layout/NavbarOrg";
import Footer from "./components/layout/Footer";
import Loginmember from "./components/Login/Login";
import LoginOrganizer from "./components/Login/LoginOrganizer";
import Registermember from "./components/Register/Register";
import RegisterOrganizer from "./components/Register/RegisterOrganizer";
import Profile from "./components/Profile";
import Events from "./components/Events";
import Historydate from "./components/Historydate";
import AuthContext from "./components/context/auth-context";
import AuthOrgContext from "./components/context/auth-org-context"
import EditProfile from "./components/EditProfile";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  loginOrg = (token, organizerId, tokenExpiration) => {
    this.setState({ token: token, organizerId: organizerId });
  };


  logout = () => {
    this.setState({ token: null, userId: null });
  };

  logoutOrg  = () => {
    this.setState({ token: null, organizerId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <Navbar />
            <main>
              <Switch>
                {!this.state.token && (<Redirect from="/" to="/login" exact />)}
            
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && (<Redirect from="/login" to="/events" exact />)}
                <Route path="/register" component={Registermember} />
                <Route path="/organizer" component={RegisterOrganizer} />
                <Route path="/events" component={Events} /> 
                <Route path="/loginorg" component={LoginOrganizer} />
                <Route path="/historydate" component={Historydate} />
                {!this.state.token && ( <Route path="/login" component={Loginmember} /> )}
                {this.state.token && (
                  <Route path="/profile" component={Profile} />
                )}
                <Route path="/profile" component={Profile} />
                <Route path="/editprofile" component={EditProfile} />
              </Switch>
            </main>
            <Footer />
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
