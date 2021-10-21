import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Register = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        {/* <h5>ระบบศูนย์รวมข้อมูลงานวิ่ง</h5> */}
                        <p>Running Events Data Center System</p>
                        <button type="submit" class="btnRegister" name="" value=""><a class="nav-link scrollto" href="/login">Login</a></button><br />
                    </div>
                    <div class="col-md-9 register-right">
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">member</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">organizer</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Register Member</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="First Name *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Last Name *" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="formtwo" placeholder="Email *" value="" />
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Password *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Confirm Password *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="ID Card *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Telephone *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div >
                                            <DatePicker
                                                class="datep"
                                                selected={startDate}
                                                onChange={date => setStartDate(date)}

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
                                                    <input type="radio" name="gender" value="male" checked />
                                                    <span> Male </span>
                                                </label>&nbsp; &nbsp;
                                                <label class="radio inline">
                                                    <input type="radio" name="gender" value="female" />
                                                    <span> Female </span>
                                                </label>
                                            </div>
                                        </div>
                                        <input type="submit" class="btnLogin" value="Register" />
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3 class="register-heading">Register Organizer</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="First Name *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Last Name *" value="" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="formtwo" placeholder="Email *" value="" />
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Password *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Confirm Password *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="ID Card *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Telephone *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div >
                                            <DatePicker
                                                class="datep"
                                                selected={startDate}
                                                onChange={date => setStartDate(date)}

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
                                                    <input type="radio" name="gender" value="male" checked />
                                                    <span> Male </span>
                                                </label>&nbsp; &nbsp;
                                                <label class="radio inline">
                                                    <input type="radio" name="gender" value="female" />
                                                    <span> Female </span>
                                                </label>
                                            </div>
                                        </div>
                                        <input type="submit" class="btnLogin" value="Register" />
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
export default Register