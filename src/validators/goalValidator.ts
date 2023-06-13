import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import { GoalCategoryEnum } from "../enums";

const createGoal = Joi.object({
  name: stringSchema.label("Name").required(),
  type: stringSchema.label("Types").valid(...list(GoalCategoryEnum)).required(),
  startDate: dateSchema.label('Start Date').required(),
  endDate: dateSchema.label('Ens Date').required(),
  totalAmount: positiveIntegerSchema.label("Interest Rate").required(),
  currentAmount: positiveIntegerSchema.label("Interest Rate").required(),
  remarks : stringSchema.label("Description ").allow(null, ''),
});

const updateGoal = Joi.object({
  name: stringSchema.label("Name"),
  type: stringSchema.label("Types").valid(...list(GoalCategoryEnum)),
  startDate: dateSchema.label('Start Date'),
  endDate: dateSchema.label('Ens Date'),
  totalAmount: positiveIntegerSchema.label("Total Amount"),
  currentAmount: positiveIntegerSchema.label("Current Amount").required(),
  remarks : stringSchema.label("Description "),
  });

export { createGoal,updateGoal };
