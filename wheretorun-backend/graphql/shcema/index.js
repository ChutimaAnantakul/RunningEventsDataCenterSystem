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
    type Organizer{
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
    type LoginOrganizerAuthData{
        organizerId: String!
        token: String!
        tokenExpiration: Int!
    }
    
    input UserInput{
        name: String!
        email: String!
        password: String!
        idcard: String!
        phone: String!
        brithday: String!
        gender: String!
    
    
    }
    input OrganizerInput{
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
        loginOrg(email: String!, password: String!): LoginOrganizerAuthData!
    
    }
    type RootMuattion{
         createUser(userInput: UserInput): User
         createOrganizer(organizerInput: OrganizerInput): Organizer
        

        
    }
    
    schema {
        query : RootQuery
        mutation : RootMuattion
    }
    
    `;
module.exports = buildSchema(newLocal);
