import * as Sequelize from 'sequelize';
import {LoanStatusEnum, LoanTypeEnum} from '../enums';
import {ModelTimestampExtend, PaginationOrderSearchExtend } from '.';

export interface InputLoanInterface {
  userId : Sequelize.CreationOptional<number>;
  amount: number;
  type: LoanTypeEnum; // enum (Received Loans, Given Loans) or (Borrowings , Lendings)
  remarks: string;
  slug?: string;
  date: string;
  returnDate: string;
  interestRate?: number;
  status: LoanStatusEnum ; // enum (paid , unpaid(default)) 
}

export interface LoanInterface  extends ModelTimestampExtend{
  id: Sequelize.CreationOptional<number>
  userId : Sequelize.CreationOptional<number>;
  amount: number;
  type: LoanTypeEnum; // enum (Received Loans, Given Loans) or (Borrowings , Lendings)
  remarks: string;
  slug: string;
  date: string;
  returnDate: string;
  interestRate: number;
  status: LoanStatusEnum ; // enum (paid , unpaid) 
}


export interface LoanModelInterface extends Sequelize.Model<Partial <LoanInterface>, Partial<InputLoanInterface>>,
LoanInterface {};
export  interface ArgsLoanInterface extends PaginationOrderSearchExtend{
  status?: LoanStatusEnum;
  type?: LoanTypeEnum;
};