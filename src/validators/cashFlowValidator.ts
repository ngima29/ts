import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import { CategoryTypeEnum } from "../enums";

const createCashFlow = Joi.object({
  categoryId : positiveIntegerSchema.label('Category  ID').required(),
  goalId : positiveIntegerSchema.label('Goal  ID').allow(null, ''),
  amount: positiveIntegerSchema.label("Amount").required(),
  remarks : stringSchema.label("Remarks ").allow(null, ''),
  date: dateSchema.label(' Date').required(),
  type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)).required(),
});

const updateCashFlow = Joi.object({
    categoryId : positiveIntegerSchema.label('Category  ID'),
    goalId : positiveIntegerSchema.label('Goal  ID'),
    amount: positiveIntegerSchema.label("Amount"),
    remarks : stringSchema.label("Remarks "),
    date: dateSchema.label(' Date'),
    type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)),
  });

export { createCashFlow,updateCashFlow };
