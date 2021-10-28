import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Mutation } from "react-apollo";
import Adduser from "../graphql/mutation/Adduser";

// import { Link } from 'react-router-dom';
// import { TextInput } from 'react-native-paper';

const Register = () => {
  const [startDate, setStartDate] = useState(new Date());
  let name, email, password, idcard, phone, brithday, gender;
  return (
    <>
      <Mutation
        mutation={Adduser}  onCompleted={() => this.props.history.push('/')}
        
      >
        {(addUser, { loading, error }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          <div class="container register">
            <div class="row">
              <div class="col-md-3 register-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                {/* <h5>ระบบศูนย์รวมข้อมูลงานวิ่ง</h5> */}
                <p>Running Events Data Center System</p>
                <button type="submit" class="btnRegister" name="" value="">
                  <a class="nav-link scrollto" href="/login">
                    Login
                  </a>
                </button>
                <br />
              </div>
              <div class="col-md-9 register-right">
                <ul
                  class="nav nav-tabs nav-justified"
                  id="myTab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      member
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      organizer
                    </a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <h3 class="register-heading">Register Member</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addUser({
                          variables: {
                            name: name.value,
                            email: email.value,
                            password: password.value,
                
                            idcard: idcard.value,
                            phone: phone.value,
                            brithday: brithday.value,
                            gender: gender.value,
                          },
                        });
                        name.value = "";
                        email.value = "";
                        password.value = "";
                        
                        idcard.value = "";
                        phone.value = "";
                        brithday.value = "";
                        gender.value = "";
                      }}
                    >
                      <div class="row register-form">
                        <div class="col-md-8">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              name="name"
                              ref={(node) => {
                                name = node;
                              }}
                              placeholder="Name *"
                              value=""
                            />
                          </div>
                        </div>
                        {/* <div class="col-md-6">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Last Name *"
                              value=""
                            />
                          </div>
                        </div> */}
                        <div class="form-group">
                          <input
                            type="text"
                            class="formtwo"
                            name="email"
                            ref={(node) => {
                              email = node;
                            }}
                            placeholder="Email *"
                            value=""
                          />
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              name="password"
                              ref={(node) => {
                                password = node;
                              }}
                              placeholder="Password *"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              name="password"
                              ref={(node) => {
                                password = node;
                              }}
                              placeholder="Confirm password *"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              name="idcard"
                              ref={(node) => {
                                idcard = node;
                              }}
                              placeholder="ID Card *"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              name="phone"
                              ref={(node) => {
                                phone = node;
                              }}
                              placeholder="Telephone *"
                              value=""
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div>
                            <DatePicker
                              class="datep"
                              name="brithday"
                              ref={(node) => {
                                brithday = node;
                              }}
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div
                            class="form-group"
                            name="gender"
                            ref={(node) => {
                              gender = node;
                            }}
                          >
                            <div class="maxl">
                              <label class="radio inline">
                                <input
                                  type="radio"
                                  name="gender"
                                  value="male"
                                  checked
                                />
                                <span> Male </span>
                              </label>
                              &nbsp; &nbsp;
                              <label class="radio inline">
                                <input
                                  type="radio"
                                  name="gender"
                                  value="female"
                                />
                                <span> Female </span>
                              </label>
                            </div>
                          </div>
                          <input
                            type="submit"
                            class="btnLogin"
                            value="Register"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    class="tab-pane fade show"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <h3 class="register-heading">Register Organizer</h3>
                    <div class="row register-form">
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="First Name *"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Last Name *"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="formtwo"
                          placeholder="Email *"
                          value=""
                        />
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Password *"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Confirm Password *"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="ID Card *"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Telephone *"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div>
                          <DatePicker
                            class="datep"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                        {/* <div class="form-group">
                                                <div class="maxl">
                                                    <label class="radio inline">
                                                        <input type="radio" name="gender" value="male" checked />
                                                        <span> Male </span>
                                                    </label>
                                                    <label class="radio inline">
                                                        <input type="radio" name="gender" value="female" />
                                                        <span>Female </span>
                                                    </label>
                                                </div>
                                            </div> */}
                      </div>
                      <div class="col-md-6">
                        {/* <div class="form-group">
                                                <select class="form-control">
                                                    <option class="hidden" selected disabled>Please select your Sequrity Question</option>
                                                    <option>What is your Birthdate?</option>
                                                    <option>What is Your old Phone Number</option>
                                                    <option>What is your Pet Name?</option>
                                                </select>
                                            </div> */}
                        {/* <div class="form-group">
                                                <input type="text" class="form-control" placeholder="ID Card *" value="" />
                                            </div> */}
                        <div class="form-group">
                          <div class="maxl">
                            <label class="radio inline">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked
                              />
                              <span> Male </span>
                            </label>
                            &nbsp; &nbsp;
                            <label class="radio inline">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                              />
                              <span> Female </span>
                            </label>
                          </div>
                        </div>
                        <input
                          type="submit"
                          class="btnLogin"
                          value="Register"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>;
        }};
      </Mutation>
    </>
  );
};

export default Register;
