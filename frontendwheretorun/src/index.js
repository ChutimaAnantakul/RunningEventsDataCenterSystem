import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider } from "@apollo/client";

import Navbar from './components/layout/Navbar'
import Register from './components/Register'
import Login from './components/Login';
import Forget from './components/Forget';

const apolloClient = new ApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forget" component={Forget} />

        </Switch>
      </BrowserRouter>
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
