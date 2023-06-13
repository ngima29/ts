import { InformationEvent } from 'http';
import { defaultOrder, defaultSort, pgMaxLimit, pgMinLimit } from '../../config';
import {
  ContextInterface,
  InputGoalInterface,
  ArgsGoalInterface
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {createGoal,updateGoal} from '../../validators';
import {SuccessResponse} from "../../helpers"
 import {GoalService} from "../../services"

export const goalResolvers:any = { 
    Mutation: {
    createGoal: async (
      parent: ParentNode,
      args: { input: InputGoalInterface },
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
        const user = Guard.grant(contextValue.user);
        Validator.check(createGoal, args.input);
        args.input.userId = user.id;
      
      const data = await new GoalService().create(args.input);
      return SuccessResponse.send({
        message: 'Goal is successfully created.',
        data: data,
      });
    },

    updateGoal: async (
        parent: ParentNode,
        args: {  id: number; input: InputGoalInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {

        const user = Guard.grant(contextValue.user);
        Validator.check(updateGoal, args.input);
        args.input.userId = user.id;
        const data = await new GoalService().updateOne(args.id,args.input);
        return SuccessResponse.send({
          message: 'Goal  is successfully Updated.',
          data: data,
        });
      },
    deleteGoal: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
         await new GoalService().deleteOne(args.id);
        return SuccessResponse.send({
          message: 'Goal is successfully Deleted.'
        });
      }

},
Query: {
    goal: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        const data= await new GoalService().findByPk(args.id);
        return SuccessResponse.send({
          message: 'Goal is successfully Fetched.',
          data: data
        });
      },
    goals: async (
        parent: ParentNode,
        args: ArgsGoalInterface,
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        let { offset, limit, query, sort, order, type } = args;
        offset = offset && offset > 0 ? offset - 1 : 0;
        limit = limit ? limit : pgMinLimit;
        limit = Math.min(limit, pgMaxLimit);
        query = query ? query : undefined;
        order = order ? order : defaultOrder;
        sort = sort ? sort : defaultSort;
        type = type ? type : undefined;
      
  
        const { count, rows: data } = await new GoalService().findAndCountAll({
          offset,
          limit,
          query,
          sort,
          order,
          type,
        });
  
        return SuccessResponse.send({
          message: 'Goal  list is successfully fetched.',
          data: data,
          count: count,
        });
      },

}
}