import gql from "graphql-tag";

const Getusers =gql`
{
  users {
    name
    email
    password
  }
}
`;
export default Getusers