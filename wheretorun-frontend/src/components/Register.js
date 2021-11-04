import React, { Component } from "react";


class Register extends Component {
  state = {
    creating: false,
    // events: []
  };

  constructor(props) {
    super(props);
    this.nameElRef = React.createRef();
    this.emailElRef = React.createRef();
    this.passwordElRef = React.createRef();
    this.phoneElRef = React.createRef();
    this.idcardElRef = React.createRef();
    this.genderElRef = React.createRef();
    this.birthdateElRef = React.createRef();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };


  CancelHandler = () => {
    this.setState({ creating: false });
  };

  submitHandler = () => {
    this.setState({ creating: false });
    const name = this.nameElRef.current.value;
    const email = this.emailElRef.current.value;
    const password = this.passwordElRef.current.value;
    const phone = this.phoneElRef.current.value;
    const idcard = this.idcardElRef.current.value;
    const gender = this.genderElRef.current.value;
    const birthdate = this.birthdateElRef.current.value;

    if (
      birthdate.trim().length === 0 ||
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      phone.trim().length === 0 ||
      idcard.trim().length === 0 ||
      gender.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return;
    };

    const user = { name, email, password, phone, idcard, gender, birthdate };
    console.log(user);
  };

  render() {
    return (
    
      <>
        <div class="container register">
          <div class="row">
            <div class="col-md-2 register-left">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3>Welcome</h3>
              <h6>You are 30 seconds away from earning your own money!</h6>
              {/* <input type="submit" name="" value="Login"/><br/> */}
            </div>
            <div class="col-md-10 register-right">
              {/* <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="member-tab"
                    data-toggle="tab"
                    href="#member"
                    role="tab"
                    aria-controls="member"
                    aria-selected="true"
                  >
                    Member
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="organizer-tab"
                    data-toggle="tab"
                    href="#organizer"
                    role="tab"
                    aria-controls="organizer"
                    aria-selected="false"
                  >
                    Organizer
                  </a>
                </li>
                <li class="nav-item">
                                    <a class="nav-link" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Admin</a>
                                </li>
              </ul> */}
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="member"
                  role="tabpanel"
                  aria-labelledby="member-tab"
                >
                  {/* <h3 class="register-heading">Apply as a Employee</h3> */}
                  {/* <div class="row register-form"> */}
                  <div class="col-10">
                    <div class="limiter">
                      <div class=" p-l-50  p-t-65 p-b-34">
                        <form class="login100-form validate-form" >
                          <span class="login100-form-title p-b-49">
                            Register
                          </span>
                          <div class="row">
                            <div class="col-6">
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Username is reauired"
                              >
                                <span class="label-input100" htmlFor="name">
                                  Name
                                </span>
                                <input
                                  class="input100"
                                  type="text"
                                  id="name"
                                  ref={this.nameElRef}
                                  name="username"
                                  placeholder="Type your name"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf206;"
                                ></span>
                              </div>
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Phone is reauired"
                              >
                                <span class="label-input100" htmlFor="phone">
                                  Phone
                                </span>
                                <input
                                  class="input100"
                                  type="number"
                                  id="phone"
                                  ref={this.phoneElRef}
                                  name="phone"
                                  placeholder="xxxxxxxxxx"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf2b6;"
                                ></span>
                              </div>
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Phone is reauired"
                              >
                                <span
                                  class="label-input100"
                                  htmlFor="birthdate"
                                >
                                  Birthdate
                                </span>

                                <input
                                  class=" input100"
                                  type="date"
                                  id="birthdate"
                                  ref={this.birthdateElRef}
                                  name="birthdate"
                                  placeholder="Type your birthdate"
                                />

                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf122;"
                                ></span>
                              </div>

                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Phone is reauired"
                              >
                                <span class="label-input100" htmlFor="gender">
                                  Gender
                                </span>

                                <select
                                  class=" input100"
                                  type="text"
                                  id="gender"
                                  ref={this.genderElRef}
                                  name="gender"
                                  placeholder="Type your gender"
                                  aria-label="Default select example"
                                >
                                  <option>Select Gender</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                                <span
                                  class="focus-input100 "
                                  data-symbol="&#xf211;"
                                ></span>
                              </div>
                            </div>
                            <div class="col-6">
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Idcard is reauired"
                              >
                                <span class="label-input100" htmlFor="idcard">
                                  ID card number
                                </span>
                                <input
                                  class="input100"
                                  type="number"
                                  id="idcard"
                                  ref={this.idcardElRef}
                                  name="idcard"
                                  placeholder="x-xxxx-xxxxx-xx-x"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf2c3;"
                                ></span>
                              </div>

                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Email is reauired"
                              >
                                <span class="label-input100" htmlFor="email">
                                  Email
                                </span>
                                <input
                                  class="input100"
                                  type="text"
                                  id="email"
                                  ref={this.emailElRef}
                                  name="username"
                                  placeholder="wt@gmail.com"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf159;"
                                ></span>
                              </div>
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Password is required"
                              >
                                <span class="label-input100" htmlFor="password">
                                  Password
                                </span>
                                <input
                                  class="input100"
                                  type="text"
                                  id="password"
                                  ref={this.passwordElRef}
                                  name="password"
                                  placeholder="********"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf190;"
                                ></span>
                              </div>

                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Comfirm Password is required"
                              >
                                <span class="label-input100" htmlFor="password">
                                  Comfirm Password
                                </span>
                                <input
                                  class="input100"
                                  type="text"
                                  id="password"
                                  ref=""
                                  name="password"
                                  placeholder="********"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf190;"
                                ></span>
                              </div>
                            </div>
                          </div>

                          <div class="login100-form-btn">
                            <div class="row login100-form-btn">
                              <div claas="col-6">
                                <div class="wrap-login100-form-btn">
                                  <div class="login100-form-bgbtn"></div>
                                  <button
                                    class="login100-form-btn  "
                                    type="submit"
                                    onSubmit={this.submitHandler}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>

                              <div claas="col-6">
                                <br />
                                <div class="wrap-login100-form-btn">
                                  <div class="login100-form-bgbtn"></div>
                                  {/* <button class="login100-form-btn " type ="submit">Login</button> */}
                                  <button
                                    type="button"
                                    class="login100-form-btn"
                                  >
                                    Cancel{" "}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="flex-col-c p-t-50"></div>
                        </form>
                      </div>
                    </div>
                    {/* </div> */}

                    <div id="dropDownSelect1"></div>
                  </div>
                </div>

                <div
                  class="tab-pane fade show"
                  id="organizer"
                  role="tabpanel"
                  aria-labelledby="organizer-tab"
                >
                  {/* <h3 class="register-heading">Apply as a Hirer</h3> */}
                  <div class="col-10 center">
                    <div class="limiter">
                      <div class=" p-l-55 p-r-55 p-t-65 p-b-54">
                        <form class="login100-form validate-form">
                          <span class="login100-form-title p-b-49">
                            Login Organizer
                          </span>

                          <div
                            class="wrap-input100 validate-input m-b-23"
                            data-validate="Username is reauired"
                          >
                            <span class="label-input100">Username</span>
                            <input
                              class="input100"
                              type="text"
                              name="username"
                              placeholder="Type your username"
                            />
                            <span
                              class="focus-input100"
                              data-symbol="&#xf206;"
                            ></span>
                          </div>

                          <div
                            class="wrap-input100 validate-input"
                            data-validate="Password is required"
                          >
                            <span class="label-input100">Password</span>
                            <input
                              class="input100"
                              type="password"
                              name="pass"
                              placeholder="Type your password"
                            />
                            <span
                              class="focus-input100"
                              data-symbol="&#xf190;"
                            ></span>
                          </div>

                          <div class="text-right p-t-8 p-b-31">
                            <a href="#">Forgot password?</a>
                          </div>

                          <div class="container-login100-form-btn">
                            <div class="wrap-login100-form-btn">
                              <div class="login100-form-bgbtn"></div>
                              <button class="login100-form-btn">Login</button>
                            </div>
                          </div>

                          {/* <div class="txt1 text-center p-t-54 p-b-20">
                              <span>Or Sign Up Using</span>
                            </div> */}

                          {/* <div class="flex-c-m">
                              <a href="#" class="login100-social-item bg1">
                                <i class="fa fa-facebook"></i>
                              </a>
    
                              <a href="#" class="login100-social-item bg2">
                                <i class="fa fa-twitter"></i>
                              </a>
    
                              <a href="#" class="login100-social-item bg3">
                                <i class="fa fa-google"></i>
                              </a>
                            </div> */}

                          <div class="flex-col-c p-t-50">
                            <span class="txt1 p-b-17">Or Sign Up Using</span>

                            <a href="/register" class="txt2">
                              Sign Up
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div id="dropDownSelect1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
