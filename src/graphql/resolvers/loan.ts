import { InformationEvent } from 'http';
import { defaultOrder, defaultSort, pgMaxLimit, pgMinLimit } from '../../config';
import {
  ContextInterface,
  InputLoanInterface,
  ArgsLoanInterface
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {createLoan, updateLoan} from '../../validators';
import {SuccessResponse} from "../../helpers"
 import {LoanService} from "../../services"

export const loanResolvers:any = { 
    Mutation: {
      createLoan: async (
        parent: ParentNode,
        args: { input:InputLoanInterface  },
        contextValue: ContextInterface,
        info: InformationEvent,
          ) => {
      const user = Guard.grant(contextValue.user)
      Validator.check(createLoan, args.input);
      args.input.userId = user.id;
      const data = await new LoanService().create(args.input);
      return SuccessResponse.send({
        message: 'Loan  is successfully created.',
        data: data,
      });
    },



    updateLoan: async (
        parent: ParentNode,
        args: {  id: number; input: InputLoanInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
       const user= Guard.grant(contextValue.user);
        Validator.check(updateLoan, args.input);
        args.input.userId = user.id;
        const data = await new LoanService().updateOne(args.id,args.input);
        return SuccessResponse.send({
          message: 'Loan  is successfully Updated.',
          data: data,
        });
      },
    deleteLoan: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
         await new LoanService().deleteOne(args.id);
        return SuccessResponse.send({
          message: 'Loan is successfully Deleted.'
        });
      }

},
Query: {
  loan: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        const data= await new LoanService().findByPk(args.id);
        return SuccessResponse.send({
          message: 'Loan is successfully Fetched.',
          data: data
        });
      },
 loans: async (
        parent: ParentNode,
        args: ArgsLoanInterface,
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        let { offset, limit, query, sort, order, type ,status} = args;
        offset = offset && offset > 0 ? offset - 1 : 0;
        limit = limit ? limit : pgMinLimit;
        limit = Math.min(limit, pgMaxLimit);
        query = query ? query : undefined;
        order = order ? order : defaultOrder;
        sort = sort ? sort : defaultSort;
        type = type ? type : undefined;
        status = status? status : undefined;
      
  
        const { count, rows: data } = await new LoanService().findAndCountAll({
          offset,
          limit,
          query,
          sort,
          order,
          type,
          status,
        });
  
        return SuccessResponse.send({
          message: 'Loan  list is successfully fetched.',
          data: data,
          count: count,
        });
      },

}
}