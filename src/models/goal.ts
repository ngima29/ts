import * as Sequelize from 'sequelize';
import {Database} from './instance';
import {GoalModelInterface} from '../interfaces';
import {GoalCategoryEnum} from '../enums';

const sequelize = Database.sequelize;

const Goal = sequelize.define<GoalModelInterface>(
    'goals',
    {
      id: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
            type: Sequelize.ENUM(GoalCategoryEnum.expenses,GoalCategoryEnum.income,GoalCategoryEnum.investment,GoalCategoryEnum.others),
            allowNull: false,
          },
        startDate:{
            type: Sequelize.DATEONLY,
            allowNull:false,
          },
        endDate: {
            type: Sequelize.DATEONLY,
            allowNull:false,
          },

        totalAmount: {
            type : Sequelize.NUMBER,
            allowNull: false,
          },
        currentAmount: {
            type : Sequelize.NUMBER,
            allowNull: false,
          },
        remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
          }

    },{
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                name: 'goals_slug_type_startDate_endDate',
                fields: ['slug','type','startDate','endDate'],
                where: {
                    deleted_at : null,
                },
            },
        ],

    },
);

export {Goal};