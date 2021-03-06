import React, { Component } from "react";   
import { NavLink } from "react-router-dom";
import { Alert } from 'react-alert'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class Registermember extends Component {
   
  state = {
    isRegister: true,
    input: {},
    errors: {},
    isvalid: false,
    message: "",
  };
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
    // this.onChange = this.onChange.bind(this);
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

      confirmAlert({
        // title: 'Confirm to submit',
        message: '???????????????????????????????????????????????????',
        buttons: [
          {
            label: 'close',
            // onClick: () => alert('Click Yes')
          }
          // {
          //   label: 'No',
          //   onClick: () => alert('Click No')
          // }
        ]
      });

     
        // const isEmailValid = this.emailValidation();
        // this.setState(
        //   {
        //     isvalid: isEmailValid,
        //     message: isEmailValid
        //       ? "Email Address is Valid!"
        //       : "Email Address not valid!",
        //   },
        //   () => this.props.onEmailSubmit(this.state)
        // );
    
        
        // if (this.state.isvalid) {
        //   console.log(this.state);
        // }
      
  };

  // onChange(e) {
  //   this.setState({
  //     email: e.target.value,
  //   });
  // }

  // emailValidation() {
  //   const regex =
  //     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   return !(!this.state.email || regex.test(this.state.email) === false);
  // }




  render() {
    const messageTemplate = this.state.message ? (
      <div
        className={"alert alert-" + (this.state.isvalid ? "success" : "danger")}
        role="alert"
      >
        {this.state.message}
      </div>
    ) : (
      ""
    );
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
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li class="nav-item">
                  <NavLink
                    class="nav-link active"
                    id="member-tab"
                    data-toggle="tab"
                    to="/register"
                    role="tab"
                    aria-controls="member"
                    aria-selected="false"
                  >
                    Member
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink
                    class="nav-link"
                    id="organizer-tab"
                    data-toggle="tab"
                    to="/organizer"
                    role="tab"
                    aria-controls="organizer"
                    aria-selected="false"
                  >
                    Organizer
                  </NavLink>
                </li>
               
              </ul>

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
                                      type="number"
                                      id="phone"
                                      ref={this.phoneRef}
                                      name="phone"
                                      placeholder="xxxxxxxxxx"
                                      // maxLength="10"
                                      pattern="^\d{3}-\d{3}-\d{4}$" required 
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
                                      {/* <option></option> */}
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
                                      type="number"
                                      id="idcard"
                                      ref={this.idcardRef}
                                      name="idcard"
                                      placeholder="x-xxxx-xxxxx-xx-x"
                                      // maxLength="13"
                                      // pattern="^\d{1}-\d{4}-\d{5}-\d{2}-\d{1}$" required 
                                      pattern="^\d{13}$" required
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
                                      type="email"
                                      id="email"
                                      ref={this.emailRef}
                                      name="email"
                                      placeholder="wt@gmail.com"
                                      value={this.state.email}
                                      onChange={this.onChange}
                                    />
                                    {/* <div className="text-danger">{this.state.errors.email}</div> */}
                                    <span
                                      className="focus-input100"
                                      data-symbol="&#xf159;"
                                      style={{ color: "red" }}>{this.state.errors["email"]}</span>
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
                              maxLength="8"
                              // value={this.state.input.password} 
                              // onChange={this.handleChange}
                            />
                            {/* <div className="text-danger">{this.state.errors.password}</div> */}
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
                                      maxLength="8"
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
                                        // onClick={this.onSubmit}
                                        onClick={this.onSubmit}
                                          
                                      >

                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                  {messageTemplate}
                                  <div claas="col-6">
                                <br />
                                <div claas="col-6">
                                    <div className="wrap-login100-form-btn">
                                      <div className="login100-form-bgbtn"></div>
                                      <button
                                        className="login100-form-btn  "
                                        type=""
                                        href="/login"
                                          
                                      >

                                        Cancel
                                      </button>
                                    </div>
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

export default Registermember;
