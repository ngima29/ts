import { buildSubgraphSchema } from '@apollo/subgraph';
import {
  cashFlowResolvers,
  categoryResolvers,
  goalResolvers,
  investmentResolvers,
  loanResolvers,
  userResolvers,
} from '../resolvers';
import {
  cashFlowDefs,
  CategoryDefs,
  GoalDefs,
  InvestmentDefs,
  LoanDefs,
  userDefs,
} from '../typeDefs';

export const schema = buildSubgraphSchema([
  { typeDefs: cashFlowDefs, resolvers: cashFlowResolvers },
  { typeDefs: CategoryDefs, resolvers: categoryResolvers },
  { typeDefs: GoalDefs, resolvers: goalResolvers },
  { typeDefs: InvestmentDefs, resolvers: investmentResolvers },
  { typeDefs: LoanDefs, resolvers: loanResolvers },
  { typeDefs: userDefs, resolvers: userResolvers },
]);