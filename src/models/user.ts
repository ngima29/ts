import * as Sequelize from "sequelize";
import { Database } from "./instance";
import { UserModelInterface} from "../interfaces";
const sequelize = Database.sequelize;

const User = sequelize.define<UserModelInterface>(
"users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
        where: {
          deletedAt: null,
        },
      },
    ],
  },
);

export {User};