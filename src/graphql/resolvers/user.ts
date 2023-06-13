import { InformationEvent } from 'http';
import {
  ContextInterface,
  InputUserInterface,
  InputLoginInterface
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {
    signUp,
    updateUser,
    login
} from '../../validators';
import {SuccessResponse} from "../../helpers"
 import {UserService} from "../../services"

export const userResolvers:any = { 
    Mutation: {
    createUser: async (
      parent: ParentNode,
      args: { input: InputUserInterface },
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
      Validator.check(signUp, args.input);
      const data = await new UserService().create(args.input);
      return SuccessResponse.send({
        message: 'User  is successfully created.',
        data: data,
      });
    },

    login: async (
        parent: ParentNode,
        args: { input: InputLoginInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Validator.check(login, args.input);
        const data = await new UserService().login(args.input);
        return SuccessResponse.send({
          message: 'Successfully Login.',
          data: data,
        });
      },

    updateUser: async (
        parent: ParentNode,
        args: {  id: number; input: InputUserInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        Validator.check(updateUser, args.input);
        const data = await new UserService().updateOne(args.id,args.input);
        return SuccessResponse.send({
          message: 'User  is successfully Updated.',
          data: data,
        });
      },
    deleteUser: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
         await new UserService().deleteOne(args.id);
        return SuccessResponse.send({
          message: 'User is successfully Deleted.'
        });
      }

},
Query: {
    user: async (
        parent: ParentNode,
        args: {  id: number },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
        Guard.grant(contextValue.user);
        const data= await new UserService().findByPk(args.id);
        return SuccessResponse.send({
          message: 'User is successfully Fetched.',
          data: data
        });
      }

}
}