import React from "react";
import { NavLink } from 'react-router-dom';
import AuthOrgContext from "../context/auth-org-context";

const NavbarOrg = props => (
  <AuthOrgContext.Consumer>
    {contexts => {
       return (
      <>
          <section id="topbar" class="d-flex align-items-center">
            <div class="container d-flex justify-content-center justify-content-md-between">
              <div class="contact-info d-flex align-items-center">
                <i class="bi bi-envelope d-flex align-items-center">
                  <a href="mailto:contact@example.com">contact@example.com</a>
                </i>
                <i class="bi bi-phone d-flex align-items-center ms-4">
                  <span>+1 5589 55488 55</span>
                </i>
              </div>
              <div class="social-links d-none d-md-flex align-items-center">
                <a href="#" class="twitter">
                  <i class="bi bi-twitter"></i>
                </a>
                <a href="#" class="facebook">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#" class="instagram">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="#" class="linkedin">
                  <i class="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </section>
    
         
          <header id="header" class="d-flex align-items-center">
            <div class="container d-flex align-items-center justify-content-between">
              <h1 class="logo">
                <a href="/events">
                  WhereToRun<span>.</span>
                </a>
              </h1>
    
              <a href="/events" class="logo">
                <img src="assets/img/logo.png" alt="" />
              </a>
    
              <nav id="navbar" class="navbar ">
            <ul>
              <li><NavLink class="nav-link scrollto" to="/events">Home</NavLink></li> 
              <li><NavLink class="nav-link scrollto" to="/events">Where To Run</NavLink></li> 
              <li><NavLink class="nav-link scrollto" to="/historydate">History Data</NavLink></li>
              {contexts.token && (  <li><NavLink class="nav-link scrollto" to="">ขอสิทธิ์</NavLink></li> )}
              {contexts.token && ( 
              <li class=" nav-link scrollto dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
                <ul>
                  <React.Fragment>
                  <li><NavLink  class="nav-link scrollto" to="/profile">Profile</NavLink></li> 
                  <li><NavLink to="#" onClick={contexts.logout}>Logout</NavLink></li>
                  </React.Fragment>
                </ul>
            </li>
           )}
            {/* {context.token && ( <li><NavLink type="button" class="btn btn-primary"to="#" onClick={context.logout}>Logout</NavLink></li>)} */}
              
            {!contexts.token && (<li><NavLink type="button" class="btn btn-primary btn-lg btn-block" to="/login">Login</NavLink></li> )}
              
              
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
            </div>
          </header>
         </>
      
      );
}}
  
</AuthOrgContext.Consumer>
);

export default NavbarOrg;
