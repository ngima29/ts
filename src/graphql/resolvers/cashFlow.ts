import { InformationEvent } from 'http';
import { defaultOrder, defaultSort, pgMaxLimit, pgMinLimit } from '../../config';
import {
  ContextInterface,
  InputCashFlowInterface,
  ArgsCashFlowInterface,
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {
    createCashFlow,updateCashFlow
} from '../../validators';
import {SuccessResponse} from "../../helpers"
 import {CashFlowService, CategoryService} from "../../services"
import { any } from 'joi';

export const cashFlowResolvers:any = { 
    Mutation: {
    createCashFlow: async (
      parent: ParentNode,
      args: { input: InputCashFlowInterface },
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
      const user = Guard.grant(contextValue.user)
      Validator.check(createCashFlow, args.input);
      args.input.userId = user.id;
      const categoryExist = await new CategoryService().findByPk(args.input.categoryId);
      if(!categoryExist) throw new Error(`Category  ${args.input.categoryId} does not exist`);
      if( args.input.type !==  categoryExist.type) throw new Error(`Category  ${args.input.categoryId} is  ${categoryExist.type} types`);
      
      const data = await new CashFlowService().create(args.input);
      return SuccessResponse.send({
        message: 'Transaction  is successfully created.',
        data: data,
      });
    },

    updateCashFlow: async (
        parent: ParentNode,
        args: {  id: number; input: InputCashFlowInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
       const user= Guard.grant(contextValue.user);
        Validator.check(updateCashFlow, args.input);
        args.input.userId = user.id;
        const categoryExist = await new CategoryService().findByPk(args.input.categoryId);
        if(!categoryExist) throw new Error(`Category  ${args.input.categoryId} does not exist`);
        if( args.input.type !==  categoryExist.type) throw new Error(`Category  ${args.input.categoryId} is  ${categoryExist.type} types`);
      
        const data = await new CashFlowService().updateOne(args.id,args.input);
        return SuccessResponse.send({
          message: 'Transaction  is successfully Updated.',
          data: data,
        });
      },
      
    deleteCashFlow: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
         await new CashFlowService().deleteOne(args.id);
        return SuccessResponse.send({
          message: 'Transaction is successfully Deleted.'
        });
      }

},
Query: {
    cashFlow: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        const data= await new CashFlowService().findByPk(args.id);
        return SuccessResponse.send({
          message: 'Transaction is successfully Fetched.',
          data: data
        });
      },
    cashFlows: async (
        parent: ParentNode,
        args: ArgsCashFlowInterface,
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
      
  
        const { count, rows: data } = await new CashFlowService().findAndCountAll({
          offset,
          limit,
          query,
          sort,
          order,
          type,
        });
  
        return SuccessResponse.send({
          message: 'Transaction  list is successfully fetched.',
          data: data,
          count: count,
        });
      },

}
}