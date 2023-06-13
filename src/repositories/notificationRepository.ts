import { NotificationInterface, InputNotificationInterface } from "../interfaces";
import { Notification } from "../models";
import { BaseRepository } from "./baseRepository";

export class NotificationRepository extends BaseRepository<
InputNotificationInterface,
NotificationInterface> {
  constructor() {
    super(Notification);
  }
}
