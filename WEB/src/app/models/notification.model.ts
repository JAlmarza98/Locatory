export class Notification {
  constructor(
    public id: number,
    public type: NotificationTypeEnum,
    public title: string,
    public message: string,
    public timeout: number
  ) {}
}

export enum NotificationTypeEnum {
  SUCCESS = 0,
  WARNING = 1,
  ERROR = 2,
  INFO = 3,
}
