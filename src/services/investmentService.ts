import * as Sequelize from 'sequelize';
import { Op, WhereOptions } from 'sequelize';
import slug from 'slug';
import { SequlizeQueryGenerator } from '../helpers';
import {
    InvestmentInterface,
   InputInvestmentInterface,
   ArgsInvestmentInterface
} from '../interfaces'

import {InvestmentRepository} from '../repositories'

export class InvestmentService {
  private repository: InvestmentRepository
  constructor() {
    this.repository = new InvestmentRepository()
  }

  async create(input: InputInvestmentInterface): Promise<InvestmentInterface> {
    const investmentSlug = slug(input.name);
    const existingInvestment = await this.repository.findOne({
       where:{ slug: investmentSlug, type:input.type}
    })
    if (existingInvestment)  throw new Error(`Investment name already Exist`);
    input.slug = investmentSlug;
    const investment = await this.repository.create(input);
    return investment;
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<InvestmentInterface> {
    const investmentExists = await this.repository.findByPk(id)

    if (!investmentExists)  throw new Error(`Investment ${id} does not exist`);

    return investmentExists;
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputInvestmentInterface
  ): Promise<InvestmentInterface> {
      const investmentExists = await this.repository.findByPk(id)
      if (!investmentExists)  throw new Error(`Investment ${id} does not exist`);
      if(input.name){
        const investmentSlug = slug(input.name.toString());
        const existingInvestment = await this.repository.findOne({
          where:{ slug:investmentSlug,type:input.type },
        })
        if(existingInvestment) throw new Error(`Investment Name: ${input.name} is already exist`);
        input.slug = investmentSlug;
      }
    await this.repository.updateOne({
      id: id,
      input: input,
    })

    return this.findByPk(id)
  }

  async deleteOne(id: number): Promise<boolean> {
    const investmentExists = await this.repository.findByPk(id);
    if (!investmentExists) throw new Error(`Investment: ${id} does not exist!`);

    const remove = await this.repository.deleteOne(id);
    if (remove === 0) throw new Error(`Investment: ${id} does not exist!`);
    return true;
  }

  findAndCountAll({ offset, limit, query, sort, order, type  }: ArgsInvestmentInterface): Promise<{
    count: number;
    rows: InvestmentInterface[];
  }> {
    let where: WhereOptions<any> = {};
    if (query) {
      where = {
        ...where,
        [Sequelize.Op.or]: SequlizeQueryGenerator.searchRegex({
          query,
          columns: ['name','amount'],
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

