import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { ApolloClient, ApolloProvider } from "@apollo/client";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import Navbar from './components/layout/Navbar'
import Register from './components/Register'
import Login from './components/Login';
import Profile from './components/Profile';
// import Home from './components/Home';
import Forget from './components/Forget';

const apolloClient = new ApolloClient();

// const client = new ApolloClient({
//   uri: process.env.REACT_APP_API_URI,
//   cache: new InMemoryCache(),
// });

ReactDOM.render(

  // <ApolloProvider client={apolloClient}>
  //       <Router>
  //         <div>
  //         <Navbar />
  //         {/* <Route path="/" component={Home} /> */}
  //         <Route path="/profile" component={Profile} />
  //         <Route path="/register" component={Register} />
  //         <Route path="/login" component={Login} />
  //         <Route path="/forget" component={Forget} />
  //         </div>
  //       </Router>
  //       </ApolloProvider>,
  <React.StrictMode>
    <Navbar />
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" component={Home} /> */}
          <Route path="/profile" component={Profile} />
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
