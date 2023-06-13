import { InputCashFlowInterface, CashFlowInterface } from "../interfaces";
import { CashFlow } from "../models";
import { BaseRepository } from "./baseRepository";

export class CashFlowRepository extends BaseRepository<
InputCashFlowInterface,
CashFlowInterface> {
  constructor() {
    super(CashFlow);
  }
}
