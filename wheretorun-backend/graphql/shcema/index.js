const { buildSchema } = require("graphql");

const newLocal = `
    type User{
        _id:String!
        name: String!
        email: String!
        password: String!
        idcard: String!
        phone: String!
        brithday: String!
        gender: String!
    }
    type LoginAuthData{
        userId: String!
        token: String!
        tokenExpiration: Int!
    }
    
    input UserIntput{
        name: String!
        email: String!
        password: String!
        idcard: String!
        phone: String!
        brithday: String!
        gender: String!
    
    }
    
    type RootQuery{
        users:[User!]!
        login(email: String!, password: String!): LoginAuthData!
    
    }
    type RootMuattion{
        createUser(userInput : UserIntput): User
        
    }
    
    schema {
        query : RootQuery
        mutation : RootMuattion
    }
    
    `;
module.exports = buildSchema(newLocal);
