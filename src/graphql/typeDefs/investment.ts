import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const InvestmentDefs: DocumentNode = gql`
#graphql


 enum InvestmentType {
    stock 
    commodity
    mutualFund 
    realEstate 
    sip 
    bond
    others 
   }
input InputInvestment {
    name: String
    type: InvestmentType
    amount: Int
    remarks: String
    date: String
}

 type Investment {
    id: Int
    userId: Int
    name: String
    type: InvestmentType
    amount: Int
    remarks: String
    date: String
}
 
 type SingleInvestment {
  message: String
  data: Investment
 }

 type PaginationInvestments {
  message: String
  data: [Investment]
 }



extend type Mutation {
 createInvestment(input: InputInvestment!): SingleInvestment
 updateInvestment(id:Int!, input: InputInvestment!):SingleInvestment
 deleteInvestment(id:Int!):Message
}

extend type Query {
    investment(id:Int!): SingleInvestment
    investments(offset: Int, limit: Int, query: String, sort: SortEnum, order: String, type: InvestmentType): PaginationInvestments
}

`;