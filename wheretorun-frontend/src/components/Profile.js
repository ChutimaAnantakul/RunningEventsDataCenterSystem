import React , { Component, Fragment, useEffect, useContext }from "react";
import { Link } from 'react-router-dom';

class Profile extends Component  {
    render() {
      return (
        <>
         <Fragment>
      {/* <Link to='/' className='btn btn-light'>
        Back To Search
      </Link> */}
      {/* Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )} */}
      <div className='card grid-2'>
        <div className='all-center'>
          <img src="https://scontent.furt1-1.fna.fbcdn.net/v/t1.6435-9/164430866_1318562315211137_7151903183422469995_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHEUKXwUe5gj88AnrYLfQrguyVHAmu7asS7JUcCa7tqxCUZvX_mWOm1dyOFN_6wZYb1jqm1Sb3DMZHWsGeA-2Ps&_nc_ohc=U1CuiT40T7sAX9_T8Oq&_nc_ht=scontent.furt1-1.fna&oh=245a26b1995649eb298fc89e58b3c0b1&oe=61A7F564" alt='' className='all-center'  />
        </div>

        <div className="inforpro">
          {/* {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )} */}
        
          <ul>
            <li>
                <Fragment>
                  <span>Name: Pima Suhansa</span> 
                </Fragment>
            </li>
            <li>
                <Fragment>
                  <span>ID Card Number: 1234567891234 </span> 
                </Fragment>
            </li>
            <li>
                <Fragment>
                  <span>Gender: women</span>
                </Fragment>
            </li>
            <li>
                <Fragment>
                  <span>Birthdate: 11-04-1999</span>
                </Fragment>
            </li>
            <li>
                <Fragment>
                  <span>Email: wt@gmail.com</span>
                </Fragment>
            </li>
            <a href="/editprofile" className='btn btn-primary my-1'>
            Edit Profile
          </a>
          </ul>
        </div>
      </div>
      <div className='card grid-2'>
      <table class="styled-table">
    <thead>
        <tr>
            <th>ชื่องานวิ่งที่ติดตาม</th>
            <th>ระยะทาง</th>
            <th>วันวิ่ง</th>
            <th>สถานที่</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>HUA HIN MARATHON 2022</td>
            <td>42.195 Km.</td>
            <td>8 พฤษภาคม 2565</td>
            <td>อำเภอหัวหิน จังหวัดประจวบคีรีขันธ์</td>
        </tr>
        <tr class="active-row">
            <td>King's College Half Marathon 2022</td>
            <td>21K / 10K / 5K Km.</td>
            <td>30 มกราคม 2565</td>
            <td>อ.สามพราน จ.นครปฐม</td>
        </tr>
    </tbody>
</table>
      </div>
      {/* <div className='card text-center'>
        <div className='badge badge-primary'> Followers: </div>
        <div className='badge badge-success'> Following:</div>
        <div className='badge badge-light'> Public Repos: </div>
        <div className='badge badge-dark'> Public Gist: </div>
      </div> */}
      {/* <Repos repos={repos} /> */}
    </Fragment>
          
        </>
      );

    }
  
};
export default Profile;
