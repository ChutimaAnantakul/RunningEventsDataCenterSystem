import React from "react";


const Navbar = () => {
  return (
    <>
      <header id="header" class="d-flex align-items-center">
        <div class="container d-flex align-items-center justify-content-between">

          <h1 class="logo"><a href="/">Running Center<span>.</span></a></h1>


          <nav id="navbar" class="navbar">
            <ul>
              <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
              {/* <li><a class="nav-link scrollto" href="#about">About</a></li> */}
              <li><a class="nav-link scrollto" href="#services">running list</a></li>
              <li><a class="nav-link scrollto " href="#portfolio">history data</a></li>
              <li><a class="nav-link scrollto" href="#team">calendar</a></li>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              {/* <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
                <ul>
                  <li><a href="#">Drop Down 1</a></li>
                  <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                    <ul>
                      <li><a href="#">Deep Drop Down 1</a></li>
                      <li><a href="#">Deep Drop Down 2</a></li>
                      <li><a href="#">Deep Drop Down 3</a></li>
                      <li><a href="#">Deep Drop Down 4</a></li>
                      <li><a href="#">Deep Drop Down 5</a></li>
                    </ul>
                  </li>
                </ul>
              </li> */}
              <button type="button" class="btn btn-warning col-2 mx-auto"><a class="nav-link scrollto" href="/login">Login</a></button>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </>
  );
};
export default Navbar;
