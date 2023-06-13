import * as Sequelize from 'sequelize';
import { Op, WhereOptions } from 'sequelize';
import slug from 'slug';
import {
   LoanInterface,
   InputLoanInterface,
   ArgsLoanInterface
} from '../interfaces'
import { SequlizeQueryGenerator } from '../helpers';
import {LoanRepository} from '../repositories'

export class LoanService {
  private repository: LoanRepository
  constructor() {
    this.repository = new LoanRepository()
  }

  async create(input: InputLoanInterface): Promise<LoanInterface> {
    const loanSlug = slug(input.remarks);
    const existingLoan= await this.repository.findOne({
       where:{ slug: loanSlug,type:input.type , amount:input.amount},
    })

    if (existingLoan) throw new Error("Loan is already Exist");
    input.slug = loanSlug;
    const loan = await this.repository.create(input);
    return loan;
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<LoanInterface> {
    const loanExists = await this.repository.findByPk(id)
    if (!loanExists) throw new Error(`Loan: ${id} does not exist!`)
    return loanExists;
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputLoanInterface
  ): Promise<LoanInterface> {
      const loanExists = await this.repository.findByPk(id)
       if (!loanExists) throw new Error(`Loan: ${id} does not exist!`)

       if(input.remarks){
        const loanRemarksSlug = slug(input.remarks.toString());
        const existingLoanSlug = await this.repository.findOne({
          where:{ slug:loanRemarksSlug, type:input.type },
        })
        if(existingLoanSlug) throw new Error(`Investment Name: ${input.remarks} is already exist`);
        input.slug = loanRemarksSlug;
      }
    await this.repository.updateOne({
      id: id,
      input: input,
    })
    return this.findByPk(id)
  }

  async deleteOne(id: number): Promise<boolean> {
    const loanExists = await this.repository.findByPk(id);
    if (!loanExists) throw new Error(`Loan: ${id} does not exist`);
  
    const remove = await this.repository.deleteOne(id);
    if (remove === 0) throw new Error(`Loan: ${id} does not exist`);
    return true;
  }

  findAndCountAll({ offset, limit, query, sort, order, status, type  }: ArgsLoanInterface): Promise<{
    count: number;
    rows: LoanInterface[];
  }> {
    let where: WhereOptions<any> = {
      // deleted_at: null,
    };
    if (query) {
      where = {
        ...where,
        [Sequelize.Op.or]: SequlizeQueryGenerator.searchRegex({
          query,
          columns: ['type','amount','status'],
        }),
      };
    }
    if(status) {
      where = { ...where, status:status };
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

