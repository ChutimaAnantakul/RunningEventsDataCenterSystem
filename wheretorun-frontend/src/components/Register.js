import React, { Component } from "react";

import AuthContext from "./context/auth-context";

class Register extends Component {
  state = {
    isRegister: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.phoneRef = React.createRef();
    this.idcardRef = React.createRef();
    this.genderRef = React.createRef();
    this.birthdateRef = React.createRef();
    // this.imageRef = React.createRef();
  }

  CancelHandler = () => {
    this.setState({ isRegister: false });
  };

  ComfirmHandler = () => {
    this.setState({ isRegister: false });
    const name = this.nameRef.current.value;
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;
    const phone = this.phoneRef.current.value;
    const idcard = this.idcardRef.current.value;
    const gender = this.genderRef.current.value;
    const birthdate = this.birthdateRef.current.value;
    // const image = this.imageRef.current.value;

    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      phone.trim().length === 0 ||
      idcard.trim().length === 0 ||
      gender.trim().length === 0 ||
      birthdate.trim().length === 0 
      // image.trim().length === 0
    ) {
      return;
    }

    const user = { name, email, password, phone, idcard, gender, birthdate };
    console.log(user);

    let requestBody = {
      query: `
          mutation {
            createUser(userInput:{name:"${name}", email:"${email}", password:"${password}", idcard:"${idcard}", phone:"${phone}", brithday:"${birthdate}", gender:"${gender}"}){
              name
              email
              password
              idcard
              phone
              brithday
              gender
              
            }
        }
    `,
    };


    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });





  };

  render() {
    return (
      <React.Fragment>
        {this.state.isRegister && (
          <>
            <div className="container register">
              <div className="row">
                <div className="col-md-2 register-left">
                  <img
                    src="https://image.ibb.co/n7oTvU/logo_white.png"
                    alt=""
                  />
                  <h3>Welcome</h3>
                  <h6>You are 30 seconds away from earning your own money!</h6>
                  {/* <input type="submit" name="" value="Login"/><br/> */}
                </div>
                <div className="col-md-10 register-right">
                  {/* <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
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
                <li className="nav-item">
                  <a
                    className="nav-link"
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
                <li className="nav-item">
                                    <a className="nav-link" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Admin</a>
                                </li>
              </ul> */}
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="member"
                      role="tabpanel"
                      aria-labelledby="member-tab"
                    >
                      {/* <h3 className="register-heading">Apply as a Employee</h3> */}
                      {/* <div className="row register-form"> */}
                      <div className="col-10">
                        <div className="limiter">
                          <div className=" p-l-50  p-t-65 p-b-34">
                            <form
                              className="login100-form validate-form"
                              onSubmit={this.ComfirmHandler}
                              onCancel={this.modalCancelHandler}
                            >
                              <span className="login100-form-title p-b-49">
                                Register
                              </span>
                              <div className="row">
                                <div className="col-6">
                                  <div
                                    className="wrap-input100 validate-input m-b-23"
                                    data-validate="Username is reauired"
                                  >
                                    <span
                                      className="label-input100"
                                      htmlFor="name"
                                    >
                                      Name
                                    </span>
                                    <input
                                      className="input100"
                                      type="text"
                                      id="name"
                                      ref={this.nameRef}
                                      name="username"
                                      placeholder="Type your name"
                                    />
                                    <span
                                      className="focus-input100"
                                      data-symbol="&#xf206;"
                                    ></span>
                                  </div>
                                  <div
                                    className="wrap-input100 validate-input m-b-23"
                                    data-validate="Phone is reauired"
                                  >
                                    <span
                                      className="label-input100"
                                      htmlFor="phone"
                                    >
                                      Phone
                                    </span>
                                    <input
                                      className="input100"
                                      type="text"
                                      id="phone"
                                      ref={this.phoneRef}
                                      name="phone"
                                      placeholder="xxxxxxxxxx"
                                    />
                                    <span
                                      className="focus-input100"
                                      data-symbol="&#xf2b6;"
                                    ></span>
                                  </div>
                                  <div
                                    className="wrap-input100 validate-input m-b-23"
                                    data-validate="Phone is reauired"
                                  >
                                    <span
                                      className="label-input100"
                                      htmlFor="birthdate"
                                    >
                                      Birthdate
                                    </span>

                                    <input
                                      className=" input100"
                                      type="date"
                                      id="birthdate"
                                      ref={this.birthdateRef}
                                      name="birthdate"
                                      placeholder="Type your birthdate"
                                    />

                                    <span
                                      className="focus-input100"
                                      data-symbol="&#xf122;"
                                    ></span>
                                  </div>

                                  <div
                                    className="wrap-input100 validate-input m-b-23"
                                    data-validate="Phone is reauired"
                                  >
                                    <span
                                      className="label-input100"
                                      htmlFor="gender"
                                    >
                                      Gender
                                    </span>

                                    <select
                                      className=" input100"
                                      type="text"
                                      id="gender"
                                      ref={this.genderRef}
                                      name="gender"
                                      placeholder="Type your gender"
                                      aria-label="Default select example"
                                    >
                                      <option>Select Gender</option>
                                      <option>Male</option>
                                      <option>Female</option>
                                    </select>
                                    <span
                                      className="focus-input100 "
                                      data-symbol="&#xf211;"
                                    ></span>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div
                                    className="wrap-input100 validate-input m-b-23"
                                    data-validate="Idcard is reauired"
                                  >
                                    <span
                                      className="label-input100"
                                      htmlFor="idcard"
                                    >
                                      ID card number
                                    </span>
                                    <input
                                      className="input100"
                                      type="text"
                                      id="idcard"
                                      ref={this.idcardRef}
                                      name="idcard"
                                      placeholder="x-xxxx-xxxxx-xx-x"
                                    />
                                    <span
                                      className="focus-input100"
                                      data-symbol="&#xf2c3;"
                                    ></span>
                                  </div>

                                  <div
                                    className="wrap-input100 validate-input m-b-23"
                                    data-validate="Email is reauired"
                                  >
                                    <span
                                      className="label-input100"
                                      htmlFor="email"
                                    >
                                      Email
                                    </span>
                                    <input
                                      className="input100"
                                      type="text"
                                      id="email"
                                      ref={this.emailRef}
                                      name="username"
                                      placeholder="wt@gmail.com"
                                    />
                                    <span
                                      className="focus-input100"
                                      data-symbol="&#xf159;"
                                    ></span>
                                  </div>
                                  <div
                            class="wrap-input100 validate-input m-b-23"
                            data-validate="Password is required"
                          >
                            <span class="label-input100" htmlFor="Password">Password</span>
                            <input
                              class="input100"
                              type="password"
                              id="password"
                              ref={this.passwordRef}
                              name="password"
                              placeholder="Type your password"
                            />
                            <span
                              class="focus-input100"
                              data-symbol="&#xf190;"
                            ></span>
                          </div>

                                  <div
                                    className="wrap-input100 validate-input m-b-23"
                                    data-validate="Comfirm Password is required"
                                  >
                                    <span
                                      className="label-input100"
                                      htmlFor=""
                                    >
                                      Comfirm Password
                                    </span>
                                    <input
                                      class="input100"
                                      type="password"
                                      id="password"
                                      name="password"
                                      placeholder="Type your password"
                                    />
                                    <span
                                      className="focus-input100"
                                      data-symbol="&#xf190;"
                                    ></span>
                                  </div>
                                </div>
                              </div>

                              <div className="login100-form-btn">
                                <div className="row login100-form-btn">
                                  <div claas="col-6">
                                    <div className="wrap-login100-form-btn">
                                      <div className="login100-form-bgbtn"></div>
                                      <button
                                        className="login100-form-btn  "
                                        type="submit"
                                        onClick={this.onSubmit}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>

                                  <div claas="col-6">
                                <br />
                                <div className="wrap-login100-form-btn">
                                  <div className="login100-form-bgbtn"></div>
                                  {/* <button className="login100-form-btn " type ="submit">Login</button> */}
                                  <button
                                    type="button"
                                    className="login100-form-btn"
                                    onClick={this.CancelHandler}
                                    href="/register"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                                </div>
                              </div>

                              <div className="flex-col-c p-t-50"></div>
                            </form>
                          </div>
                        </div>
                        {/* </div> */}

                        <div id="dropDownSelect1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default Register;
