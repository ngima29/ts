import { LoanInterface, InputLoanInterface } from "../interfaces";
import { Loan } from "../models";
import { BaseRepository } from "./baseRepository";

export class LoanRepository extends BaseRepository<
InputLoanInterface,
LoanInterface> {
  constructor() {
    super(Loan);
  }
}
