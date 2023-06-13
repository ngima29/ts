import { InformationEvent } from 'http';
import { defaultOrder, defaultSort, pgMaxLimit, pgMinLimit } from '../../config';
import {
  ContextInterface,
  InputCategoryInterface,
  ArgsCategoryInterface,
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {
    createCategory,updateCategory
} from '../../validators';
import {SuccessResponse} from "../../helpers"
 import {CategoryService} from "../../services"

export const categoryResolvers:any = { 
    Mutation: {
  createCategory: async (
      parent: ParentNode,
      args: { input: InputCategoryInterface },
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
      const user = Guard.grant(contextValue.user)
      Validator.check(createCategory, args.input);
      args.input.userId = user.id;
      const data = await new CategoryService().create(args.input);
      return SuccessResponse.send({
        message: 'Category  is successfully created.',
        data: data,
      });
    },

    updateCategory: async (
        parent: ParentNode,
        args: {  id: number; input: InputCategoryInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
       const user= Guard.grant(contextValue.user);
        Validator.check(updateCategory, args.input);
         args.input.userId = user.id;
        const data = await new CategoryService().updateOne(args.id,args.input);
        return SuccessResponse.send({
          message: 'Category  is successfully Updated.',
          data: data,
        });
      },
      
deleteCategory: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
         await new CategoryService().deleteOne(args.id);
        return SuccessResponse.send({
          message: 'Category is successfully Deleted.'
        });
      }

},
Query: {
    category: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        const data= await new CategoryService().findByPk(args.id);
        return SuccessResponse.send({
          message: 'Category is successfully Fetched.',
          data: data
        });
      },
  categories: async (
        parent: ParentNode,
        args: ArgsCategoryInterface,
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
      
  
        const { count, rows: data } = await new CategoryService().findAndCountAll({
          offset,
          limit,
          query,
          sort,
          order,
          type,
        });
  
        return SuccessResponse.send({
          message: 'Category  list is successfully fetched.',
          data: data,
          count: count,
        });
      },

}
}