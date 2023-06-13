import * as Sequelize from 'sequelize';
import {Database} from './instance';
import {InvestmentModelInterface} from '../interfaces';
import {InvestmentTypeEnum} from "../enums";
const sequelize = Database.sequelize;

const Investment = sequelize.define<InvestmentModelInterface>(
    'investments',
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
      type: {
            type : Sequelize.ENUM(InvestmentTypeEnum.bond,InvestmentTypeEnum.commodity,InvestmentTypeEnum.mutualFund,InvestmentTypeEnum.others,InvestmentTypeEnum.realEstate,InvestmentTypeEnum.sip,InvestmentTypeEnum.stock),
            allowNull: false,
          },
      amount:{
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
      date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

    },{
        timestamps: true,
        paranoid: true,
        indexes: [
          {
              unique: true,
              name: 'investments_slug_type',
              fields: ['slug','type'],
              where :{
                  deleted_at: null,
              },
          },
      ],
    },
);

export {Investment};