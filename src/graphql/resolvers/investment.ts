import { InformationEvent } from 'http';
import { defaultOrder, defaultSort, pgMaxLimit, pgMinLimit } from '../../config';
import {
  ContextInterface,
  InputInvestmentInterface,
  ArgsInvestmentInterface
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {
  createInvestment,updateInvestment
} from '../../validators';
import {SuccessResponse} from "../../helpers"
 import {InvestmentService} from "../../services"

export const investmentResolvers:any = { 
    Mutation: {
    createInvestment: async (
      parent: ParentNode,
      args: { input: InputInvestmentInterface },
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
      const user = Guard.grant(contextValue.user)
      Validator.check(createInvestment, args.input);
      args.input.userId = user.id;
      const data = await new InvestmentService().create(args.input);
      return SuccessResponse.send({
        message: 'Investment  is successfully created.',
        data: data,
      });
    },

    updateInvestment: async (
        parent: ParentNode,
        args: {  id: number; input: InputInvestmentInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
       const user= Guard.grant(contextValue.user);
        Validator.check(updateInvestment, args.input);
        args.input.userId = user.id;
        const data = await new InvestmentService().updateOne(args.id,args.input);
        return SuccessResponse.send({
          message: 'Investment  is successfully Updated.',
          data: data,
        });
      },
      
  deleteInvestment: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
         await new InvestmentService().deleteOne(args.id);
        return SuccessResponse.send({
          message: 'Investment is successfully Deleted.'
        });
      }

},
Query: {
  investment: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        const data= await new InvestmentService().findByPk(args.id);
        return SuccessResponse.send({
          message: 'Investment is successfully Fetched.',
          data: data
        });
      },
  investments: async (
        parent: ParentNode,
        args: ArgsInvestmentInterface,
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
      
  
        const { count, rows: data } = await new InvestmentService().findAndCountAll({
          offset,
          limit,
          query,
          sort,
          order,
          type,
        });
  
        return SuccessResponse.send({
          message: 'Investments  list is successfully fetched.',
          data: data,
          count: count,
        });
      },

}
}