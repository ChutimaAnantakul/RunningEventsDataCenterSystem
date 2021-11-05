import React , { Component }from "react";

class EditProfile extends Component  {
  state={
    profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  }
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };
    render() {
      const { profileImg} = this.state
      return (
        <>
          <div class="container">
            <div class="row">
            <div class="col-10">
                    <div class="limipro">
                      <div class=" p-l-50  p-t-65 p-b-34">
                        <form class="profile100-form validate-form" >
                          <span class="pro100-form-title p-b-49">
                            Edit Profile
                          </span>
                          <div className="page">
				<div className="container">
					<div className="img-holder">
						<img src={profileImg} alt="" id="img" className="img" />
					</div>
					<input className="imgedit" type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
					{/* <div className="label">
          <label className="image-upload" htmlFor="input">
						<i className="material-icons">add_photo_alternate</i>
						Choose your Photo
					</label>
          </div> */}
				</div>
			</div>
                          <div class="row">
                            <div class="col-6">
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Username is reauired"
                              >
                                <span class="editpro" htmlFor="name">
                                  Name
                                </span>
                                <input
                                  class="inpro"
                                  type="text"
                                  id="name"
                                  ref={this.nameElRef}
                                  name="username"
                                  placeholder="Pima Suhansa"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf206;"
                                ></span>
                              </div>

                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Idcard is reauired"
                              >
                                <span class="editpro" htmlFor="idcard">
                                  ID Card Number
                                </span>
                                <input
                                  class="inpro"
                                  type="number"
                                  id="idcard"
                                  ref={this.idcardElRef}
                                  name="idcard"
                                  placeholder="1234567891234"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf2c3;"
                                ></span>
                              </div>

                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Gender is reauired"
                              >
                                <span class="editpro" htmlFor="gender">
                                  Gender
                                </span>

                                <input
                                  class="inpro"
                                  type="text"
                                  id="gender"
                                  ref={this.genderElRef}
                                  name="gender"
                                  placeholder="หญิง"
                                />
                                <span
                                  class="focus-input100 "
                                  data-symbol="&#xf211;"
                                ></span>
                              </div>

                              </div>

                              <div class="col-6">
                                
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="birthdate is reauired"
                              >
                                <span
                                  class="editpro"
                                  htmlFor="birthdate"
                                >
                                  Birthdate
                                </span>

                                <input
                                  class="inpro"
                                  type="date"
                                  id="birthdate"
                                  ref={this.birthdateElRef}
                                  name="birthdate"
                                  placeholder="birthdate"
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
                                <span class="editpro" htmlFor="phone">
                                  Phone
                                </span>
                                <input
                                  class="inpro"
                                  type="number"
                                  id="phone"
                                  ref={this.phoneElRef}
                                  name="phone"
                                  placeholder="0981453265"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf2b6;"
                                ></span>
                              </div>
                              
                              <div
                                class="wrap-input100 validate-input m-b-23"
                                data-validate="Email is reauired"
                              >
                                <span class="editpro" htmlFor="email">
                                  Email
                                </span>
                                <input
                                  class="inpro"
                                  type="text"
                                  id="email"
                                  ref={this.emailElRef}
                                  name="email"
                                  placeholder="wt@gmail.com"
                                />
                                <span
                                  class="focus-input100"
                                  data-symbol="&#xf159;"
                                ></span>
                              </div>

                              {/* <div
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
                              </div> */}

                            </div>
                          </div>

                          {/* <div class="pro100-form-btn">
                            <div class="row pro100-form-btn">
                              <div claas="col-12">
                                <div class="wrap-pro100-form-btn">
                                  <div class="pro100-form-bgbtn"></div>
                                  <button
                                    class="pro100-form-btn  "
                                    type="submit"
                                  >
                                    Update 
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <a href="/profile" className='btn btn-primary my-2'>
            Update Profile
          </a>

                          <div class="flex-col-c p-t-50"></div>
                        </form>
                      </div>
                    </div>
                    {/* </div> */}

                    <div id="dropDownSelect1"></div>
                  </div>
            
            </div>  
          </div> 
          
        </>
      );

    }
  
};
export default EditProfile;
