import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import { InvestmentTypeEnum } from "../enums";

const createInvestment = Joi.object({
  name: stringSchema.label("Name").required(),
  type: stringSchema.label("Types").valid(...list(InvestmentTypeEnum)).required(),
  amount: positiveIntegerSchema.label("Amount").required(),
  remarks : stringSchema.label("Remarks ").allow(null, ''),
  date: dateSchema.label('Date').required(),
});

const updateInvestment = Joi.object({
    name: stringSchema.label("Name"),
    type: stringSchema.label("Types").valid(...list(InvestmentTypeEnum)),
    amount: positiveIntegerSchema.label("Amount"),
    remarks : stringSchema.label("Remarks "),
    date: dateSchema.label('Date'),
  });

export { createInvestment,updateInvestment };
