import * as Sequelize from "sequelize";
import { CashFlowModelInterface} from '../interfaces';
import { Database } from "./instance";
import {CategoryTypeEnum} from "../enums";

const sequelize = Database.sequelize;

const CashFlow = sequelize.define<CashFlowModelInterface>(
    'cash_flows',
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
        categoryId:{
            type: Sequelize.INTEGER,
            references: {
              model: 'categories',
              key: 'id',
            },
        },
        goalId:{
            type: Sequelize.INTEGER,
            allowNull:true,
            references: {
              model: 'goals',
              key: 'id',
            },
        },
        amount:{
            type: Sequelize.NUMBER,
            allowNull: false,   
        },
        remarks:{
            type: Sequelize.STRING,
            allowNull:true,
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false,   
        },
        type: {
            type: Sequelize.ENUM(CategoryTypeEnum.expenses,CategoryTypeEnum.income,CategoryTypeEnum.others),
            allowNull: false,
        }

    },{
        timestamps :true,
        paranoid: true,
    },
);

export { CashFlow};