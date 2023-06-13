import {ArraySchema, ObjectSchema } from "joi";

class Validator {
  private static instance : Validator;
  private constructor() {};

   static get (): Validator {
    if(!Validator.instance){
      Validator.instance = new Validator();
    }
    return Validator.instance;
   }
   check = (schema: ObjectSchema | ArraySchema, input: object)=>{
    const {value, error} = schema.validate(input,{
      abortEarly: false,
    });
    if(error) throw error;
   };
}
const validator = Validator.get();

export { validator as Validator};