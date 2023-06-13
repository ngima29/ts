import * as Sequelize from 'sequelize';
import { Op, WhereOptions } from 'sequelize';
import slug from 'slug';
import { SequlizeQueryGenerator } from '../helpers';
import {
 ArgsGoalInterface,
 InputGoalInterface,
 GoalInterface
} from '../interfaces'

import {GoalRepository} from '../repositories'

export class GoalService {
  private repository: GoalRepository
  constructor() {
    this.repository = new GoalRepository()
  }

  async create(input: InputGoalInterface): Promise<GoalInterface> {
    const goalSlug = slug(input.name);
    const existingGoal = await this.repository.findOne({
       where:{ slug: goalSlug, type:input.type}
    })
    if (existingGoal)  throw new Error(`goal name already Exist`);
    input.slug = goalSlug;
    const goal = await this.repository.create(input);
    return await this.repository.findByPk(goal.id);
  }

  async findByPk(id: number, options = { exclude: ['deletedAt'] }): Promise<GoalInterface> {
    const goalExists = await this.repository.findByPk(id);
  
    if (!goalExists) {
      throw new Error(`Goal ${id} does not exist`);
    }
  
    const currentDate = new Date();
    const progressPercentage = (goalExists.currentAmount / goalExists.totalAmount) * 100;
    const goalEndDate = new Date(goalExists.endDate);
    goalEndDate.setHours(0, 0, 0, 0);

    const startDate = new Date(goalExists.startDate);
    startDate.setHours(0, 0, 0, 0);
    const totalDays = Math.ceil((goalEndDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    let remainingDays = Math.ceil((goalEndDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
    remainingDays = (remainingDays < 0)? remainingDays = 0:remainingDays;

    const updatedGoal: GoalInterface = {
      id: goalExists.id,
      userId: goalExists.userId,
      name: goalExists.name,
      slug: goalExists.slug,
      type: goalExists.type,
      startDate: goalExists.startDate,
      endDate: goalExists.endDate,
      totalAmount: goalExists.totalAmount,
      currentAmount: goalExists.currentAmount,
      remarks: goalExists.remarks,
      remainingDays,
      progressPercentage,
      totalDays,
      createdAt:goalExists.createdAt,
      updatedAt: goalExists.updatedAt,
    }  
    return updatedGoal
  }
  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputGoalInterface
  ): Promise<GoalInterface> {
      const goalExists = await this.repository.findByPk(id)
      if (!goalExists)  throw new Error(`goal ${id} does not exist`);
      if(input.name){
        const goalSlug = slug(input.name.toString());
        const existingGoal = await this.repository.findOne({
          where:{ slug:goalSlug, type:input.type },
        })
        if(existingGoal) throw new Error(`goal Name: ${input.name} is already exist`);
        input.slug = goalSlug;
      }
    await this.repository.updateOne({
      id: id,
      input: input,
    })

    return this.findByPk(id)
  }

  async deleteOne(id: number): Promise<boolean> {
    const goalExists = await this.repository.findByPk(id);
    if (!goalExists) throw new Error(`goal: ${id} does not exist!`);

    const remove = await this.repository.deleteOne(id);
    if (remove === 0) throw new Error(`goal: ${id} does not exist!`);
    return true;
  }

  async findAndCountAll({ offset, limit, query, sort, order, type }: ArgsGoalInterface): Promise<{ count: number; rows: GoalInterface[] }> {
    let where: WhereOptions<any> = {};
    if (query) {
      where = {
        ...where,
        [Sequelize.Op.or]: SequlizeQueryGenerator.searchRegex({
          query,
          columns: ['name', 'type'],
        }),
      };
    }
    if (type) {
      where = { ...where, type: type };
    }
    const currentDate = new Date();
    const result = await this.repository.findAndCountAll({
      where,
      offset,
      limit,
      order: [[order, sort]],
      distinct: true,
    });
    const rowsWithCalculatedFields = result.rows.map((row: GoalInterface) => {
      const progressPercentage = (row.currentAmount / row.totalAmount) * 100;
      const goalEndDate = new Date(row.endDate);
      goalEndDate.setHours(0, 0, 0, 0);
      const startDate = new Date(row.startDate);
      startDate.setHours(0, 0, 0, 0);
      const totalDays = Math.ceil((goalEndDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
      let remainingDays = Math.ceil((goalEndDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
      remainingDays = (remainingDays < 0)? remainingDays = 0:remainingDays;
      const updatedGoal: GoalInterface = {
        id: row.id,
        userId: row.userId,
        name: row.name,
        slug: row.slug,
        type: row.type,
        startDate: row.startDate,
        endDate: row.endDate,
        totalAmount: row.totalAmount,
        currentAmount: row.currentAmount,
        remarks: row.remarks,
        remainingDays,
        progressPercentage,
        totalDays,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      };
  
      return updatedGoal;
    });
  
    return {
      count: result.count,
      rows: rowsWithCalculatedFields,
    };
  }
  
  }

