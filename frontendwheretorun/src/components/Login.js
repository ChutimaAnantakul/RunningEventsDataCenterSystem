import React from "react";

const Login = () => {
  return (
    <>
      <div class="container register">
        <div class="row">
          <div class="col-md-3 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            {/* <h5>ระบบศูนย์รวมข้อมูลงานวิ่ง</h5> */}
            <p>Running Events Data Center System</p>
            <button type="submit" class="btnRegister" name="" value="">
              <a class="nav-link scrollto" href="/register">
                Register
              </a>
            </button>
            <br />
          </div>
          <div class="col-md-9 register-right">
            <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">member</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">organizer</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">admin</a>
              </li>
            </ul>
            <br></br>
            <div class="col-md-9 register-right">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="heading">Login</div>
                  <div class="row register-form">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Email *"
                          value=""
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="password"
                          className="login-input"
                          placeholder="Password *"
                          value=""
                        />
                      </div>
                    </div>
                    <a class="forget" href="/forget">forget password ?</a>
                    <div class="col-md-12">

                      <input type="submit" className="btnin" value="Login" />
                    </div>

                    {/* <div
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
                  </div> */}
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
