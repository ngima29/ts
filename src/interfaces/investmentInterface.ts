import * as Sequelize from 'sequelize';
import {InvestmentTypeEnum} from "../enums";
import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';

export interface InputInvestmentInterface {
    userId: Sequelize.CreationOptional<number>;
    name: string;
    slug?: string;
    type: InvestmentTypeEnum; // enum (share, mutualFunds, sip, real_eState, others, )
    amount: number;
    remarks?: string;
    date :string;
}

export interface InvestmentInterface extends ModelTimestampExtend  {
    id: Sequelize.CreationOptional<number>;
    userId: Sequelize.CreationOptional<number>;
    name: string;
    slug: string;
    type: InvestmentTypeEnum;
    amount: number;
    remarks: string;
    date :string;
}


export interface InvestmentModelInterface extends Sequelize.Model<Partial<InvestmentInterface >,Partial<InputInvestmentInterface>>,
InvestmentInterface  {};

export  interface ArgsInvestmentInterface extends PaginationOrderSearchExtend{
    type?: InvestmentTypeEnum;
};