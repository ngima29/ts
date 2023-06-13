import * as Sequelize from 'sequelize';

export interface InputNotificationInterface {
    type: string;
    readAt: string;
    data: string;
}

export interface NotificationInterface {
    id: Sequelize.CreationOptional<number>
    type: string;
    readAt: string;
    data: string;
}


export interface NotificationModelInterface extends Sequelize.Model<Partial<NotificationInterface>,Partial<InputNotificationInterface>>,
NotificationInterface {}