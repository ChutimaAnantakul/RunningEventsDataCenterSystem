import React from "react";

const Login = () => {
  return (
    <>
      <div class="container register">
        <div class="row">
          <div class="col-md-3 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>Welcome</h3>
            <p>You are 30 seconds away from earning your own money!</p>
            <button type="submit" class="btnRegister" name="" value="">
              <a class="nav-link scrollto" href="/register">
                Register
              </a>
            </button>
            <br />
          </div>
          <div class="col-md-9 register-right">
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 class="register-heading">Apply as a Employee</h3>
                <div class="row register-form">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email *"
                        value=""
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password *"
                        value=""
                      />
                    </div>
                  </div>

                  <div
                    class="tab-pane fade show"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div class="row register-form">
                      <div class="col-md-12">
                        
                        <input type="submit" class="btnLogin" value="Login" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
