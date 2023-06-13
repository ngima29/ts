import Joi from "joi";
import { stringSchema } from "./schemas";
import {list} from "../utils";
import { CategoryTypeEnum } from "../enums";

const createCategory = Joi.object({
  name: stringSchema.label("Name").required(),
  type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)).required(),

});

const updateCategory = Joi.object({
  name: stringSchema.label("Name"),
  type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)),

  });

export { createCategory,updateCategory };