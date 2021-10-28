import React  from 'react';
// import { Link } from 'react-router-dom';
import { Query } from 'react-apollo'
import Getusers from '../graphql/mutation/Getusers';

const Profile  = () => {

    return (
        <>
        <Query pollInterval={500} query={Getusers}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
      
            return (
              <div className="container">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      LIST OF BOOKS
                    </h3>
                    {/* <h4><Link to="/create">Add Book</Link></h4> */}
                  </div>
                  <div className="panel-body">
                    <table className="table table-stripe">
                      <thead>
                        <tr>
                          <th>name</th>
                          <th>email</th>
                          <th>password</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.users.map((user, index) => (
                          <tr key={index}>
                            {/* <td><Link to={`/show`}>{user.name}</Link></td> */}
                            <td>{user.name}</td>
                          </tr>
                        ))}
                        <tr>
                            {/* <td><Link to={`/show/${book._id}`}>{book.title}</Link></td> */}
                            <td>{data.users.email}</td>
                          </tr>
                          <tr>
                            {/* <td><Link to={`/show/${book._id}`}>{book.title}</Link></td> */}
                            <td>{data.users.password}</td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
        </>
      );


    
};

export default Profile;