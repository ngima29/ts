import * as Sequelize from "sequelize";
import { Database } from "./instance";
import { NotificationModelInterface } from "../interfaces";


const sequelize = Database.sequelize;

const Notification = sequelize.define<NotificationModelInterface>(
  'notifications',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    readAt: {
      type: Sequelize.STRING,
    },
    data:{
        type: Sequelize.TEXT,
    }
  },
  {
    timestamps: true,
    paranoid: true,
  },
);



export { Notification };
