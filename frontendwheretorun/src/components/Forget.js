import React from "react";

const Login = () => {
    return (
        <>
            <div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h5>ระบบศูนย์รวมข้อมูลงานวิ่ง</h5>
                        <p>Running Events Data Center System</p>

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
                                <div class="heading">Reset Password</div>
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


                                    </div>

                                    <div class="col-md-12">

                                        <input type="submit" className="btnin" value="submit" />
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
