import * as Sequelize from 'sequelize';
import {GoalCategoryEnum} from '../enums';
import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';
//remaining days and progress percentage front end dekhaune
export interface InputGoalInterface {
    userId : Sequelize.CreationOptional<number>;
    name: string;
    slug?: string;
    type: GoalCategoryEnum;// investment income expenses others
    startDate: string;
    endDate: string;
    totalAmount: number;
    currentAmount: number;
    remarks?: string;
}

export interface GoalInterface extends ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
    userId : Sequelize.CreationOptional<number>;
    name: string;
    slug: string;
    type: GoalCategoryEnum;// investment income expenses
    startDate: string;
    endDate: string;
    totalAmount: number;
    currentAmount: number;
    remarks: string;
    remainingDays: number;
    progressPercentage: number;
    totalDays: number;
}


export interface GoalModelInterface extends Sequelize.Model<Partial<GoalInterface >,Partial<InputGoalInterface>>,
GoalInterface  {};

export  interface ArgsGoalInterface extends PaginationOrderSearchExtend{
    type ?: GoalCategoryEnum;
};
