import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const userDefs: DocumentNode = gql`
#graphql

 enum Gender {
   male
   female
   other
   }

   enum SortEnum {
        desc
        asc
    }

input InputUserSignUp {
    fullName: String
    gender: Gender
    email: String
    password: String
}

 type User {
    id: Int
    fullName: String
    gender: Gender
    email: String
}
input InputLogin {
    email:String!
    password:String!
}
type UserToken {
        user: User
        token: String
    }
type Login {
        message: String
        data: UserToken
    }

input ForgetPassword {
    email: String!
}
 input ChangePassword {
   old_password: String!
   new_password: String!
 }
 
 type SingleUser {
  message: String
  data: User
 }

type Message {
 message: String
}

extend type Mutation {
 createUser(input: InputUserSignUp!): SingleUser
 updateUser(id:Int!, input: InputUserSignUp!):SingleUser
 deleteUser(id:Int!):Message
 login(input: InputLogin): Login
 forgetPassword(input: ForgetPassword): Message
 changePassword(Input: ChangePassword): Message
}

extend type Query {
    user(id:Int!): SingleUser
}

`;