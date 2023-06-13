import * as Sequelize from 'sequelize';
import { Op, WhereOptions } from 'sequelize';
import slug from 'slug';
import {
   CashFlowInterface,
   InputCashFlowInterface,
   ArgsCashFlowInterface
} from '../interfaces'
import { SequlizeQueryGenerator } from '../helpers';
import {CashFlowRepository} from '../repositories'

export class CashFlowService {
  private repository: CashFlowRepository
  constructor() {
    this.repository = new CashFlowRepository()
  }

  async create(input: InputCashFlowInterface): Promise<CashFlowInterface> {
    const existingCashFlow= await this.repository.findOne({
       where:{ categoryId: input.categoryId,type:input.type , remarks: input.remarks, date:input.date, amount:input.amount},
    })
    if (existingCashFlow) throw new Error("this Transaction is already Exist");
 
    const cashFlow = await this.repository.create(input);
    return cashFlow;
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<CashFlowInterface> {
    const cashFlowExists = await this.repository.findByPk(id)
    if (!cashFlowExists) throw new Error(`Transaction: ${id} does not exist!`)
    return cashFlowExists;
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputCashFlowInterface
  ): Promise<CashFlowInterface> {
      const cashFlowExists = await this.repository.findByPk(id)
       if (!cashFlowExists) throw new Error(`Transaction: ${id} does not exist!`)
       const existingCashFlow= await this.repository.findOne({
        where:{ categoryId: input.categoryId,type:input.type , remarks: input.remarks, date:input.date, amount:input.amount},
     })
    await this.repository.updateOne({
      id: id,
      input: input,
    })
    return this.findByPk(id)
  }

  async deleteOne(id: number): Promise<boolean> {
    const cashFlowExists = await this.repository.findByPk(id);
    if (!cashFlowExists) throw new Error(`Transaction: ${id} does not exist`);
  
    const remove = await this.repository.deleteOne(id);
    if (remove === 0) throw new Error(`Transaction: ${id} does not exist`);
    return true;
  }

  findAndCountAll({ offset, limit, query, sort, order, type  }: ArgsCashFlowInterface): Promise<{
    count: number;
    rows: CashFlowInterface[];
  }> {
    let where: WhereOptions<any> = {
      // deleted_at: null,
    };
    if (query) {
      where = {
        ...where,
        [Sequelize.Op.or]: SequlizeQueryGenerator.searchRegex({
          query,
          columns: ['type','amount','categoryId'],
        }),
      };
    }
    if(type) {
        where = { ...where, type:type };
      }
    return this.repository.findAndCountAll({
      where,
      offset,
      limit,
      order: [[order, sort]],
      distinct: true,
    });
  }
  }

