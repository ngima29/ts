import * as Sequelize from "sequelize";
import { CategoryModelInterface} from '../interfaces';
import { Database } from "./instance";
import {CategoryTypeEnum} from '../enums'

const sequelize = Database.sequelize;

const Category = sequelize.define<CategoryModelInterface>(
    'categories',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          userId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
      type:{
            type: Sequelize.ENUM(CategoryTypeEnum.expenses,CategoryTypeEnum.income,CategoryTypeEnum.others),
            allowNull:false,
        },

    },{
        timestamps :true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                name: 'categories_slug_type',
                fields: ['slug','type'],
                where :{
                    deleted_at: null,
                },
            },
        ],
    },
);

export { Category};