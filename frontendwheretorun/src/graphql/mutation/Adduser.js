import gql from "graphql-tag";

const Adduser = gql`
    mutation Adduser(
        $name: String!,
        $email: String!,
        $password: String!,
        $idcard: Number!,
        $phone: Number!,
        $brithday: String!,
        $gender: String!,) {
        addUser(
            name: $name,
            email: $email,
            password: $password,
            idcard: $idcard,
            phone: $phone,
            brithday: $brithday,
            gender: $gender) {
            _id
        }
    }
`;

export default Adduser