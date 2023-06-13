import { InputInvestmentInterface, InvestmentInterface } from "../interfaces";
import { Investment } from "../models";
import { BaseRepository } from "./baseRepository";

export class InvestmentRepository extends BaseRepository<
InputInvestmentInterface,
InvestmentInterface> {
  constructor() {
    super(Investment);
  }
}
