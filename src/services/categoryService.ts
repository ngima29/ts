import * as Sequelize from 'sequelize';
import { Op, WhereOptions } from 'sequelize';
import slug from 'slug';
import { SequlizeQueryGenerator } from '../helpers';
import {
 CategoryInterface,
 ArgsCategoryInterface,
 InputCategoryInterface
} from '../interfaces'

import {CategoryRepository} from '../repositories'

export class CategoryService {
  private repository: CategoryRepository
  constructor() {
    this.repository = new CategoryRepository()
  }

  async create(input: InputCategoryInterface): Promise<CategoryInterface> {
    console.log(input)
    const categorySlug = slug(input.name);
    const existingCategory = await this.repository.findOne({
       where:{ slug: categorySlug, type:input.type}
    })
    if (existingCategory)  throw new Error(`Category name already Exist`);
    input.slug = categorySlug;
    const category = await this.repository.create(input);
    return category;
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<CategoryInterface> {
    const categoryExists = await this.repository.findByPk(id)

    if (!categoryExists)  throw new Error(`category ${id} does not exist`);

    return categoryExists;
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputCategoryInterface
  ): Promise<CategoryInterface> {
      const categoryExists = await this.repository.findByPk(id)
      if (!categoryExists)  throw new Error(`category ${id} does not exist`);
      if(input.name){
        const categorySlug = slug(input.name.toString());
        const existingCategory = await this.repository.findOne({
          where:{ slug:categorySlug, type:input.type },
        })
        if(existingCategory) throw new Error(`category Name: ${input.name} is already exist`);
        input.slug = categorySlug;
      }
    await this.repository.updateOne({
      id: id,
      input: input,
    })

    return this.findByPk(id)
  }

  async deleteOne(id: number): Promise<boolean> {
    const categoryExists = await this.repository.findByPk(id);
    if (!categoryExists) throw new Error(`category: ${id} does not exist!`);

    const remove = await this.repository.deleteOne(id);
    if (remove === 0) throw new Error(`category: ${id} does not exist!`);
    return true;
  }

  findAndCountAll({ offset, limit, query, sort, order, type  }: ArgsCategoryInterface): Promise<{
    count: number;
    rows: CategoryInterface[];
  }> {
    let where: WhereOptions<any> = {};
    if (query) {
      where = {
        ...where,
        [Sequelize.Op.or]: SequlizeQueryGenerator.searchRegex({
          query,
          columns: ['name','type'],
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

