import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const GoalDefs: DocumentNode = gql`
#graphql


 enum GoalType {
    income 
    expenses 
    investment
    others
   }
input InputGoal {
    name: String
    type: GoalType
    startDate: String
    endDate: String
    totalAmount: Int
    currentAmount: Int
    remarks: String
}

 type Goal {
    id: Int
    userId: Int
    name: String
    slug: String
    type: GoalType
    startDate: String
    endDate: String
    totalAmount: Int
    currentAmount: Int
    remarks: String
    remainingDays: Int
    progressPercentage: Int
    totalDays: Int
}
 
 type SingleGoal {
  message: String
  data: Goal
 }

 type PaginationGoals {
  message: String
  data: [Goal]
 }



extend type Mutation {
 createGoal(input: InputGoal!): SingleGoal
 updateGoal(id:Int!, input: InputGoal!):SingleGoal
 deleteGoal(id:Int!):Message
}

extend type Query {
    goal(id:Int!): SingleGoal
    goals(offset: Int, limit: Int, query: String, sort: SortEnum, order: String,type: GoalType): PaginationGoals
}

`;