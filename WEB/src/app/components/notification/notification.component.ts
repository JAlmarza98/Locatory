import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification, NotificationTypeEnum } from 'src/app/models';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  notificationType = NotificationTypeEnum;
  private _subscription: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this._subscription = this.notificationService
      .getObservable()
      .subscribe((notification) => this._addNotification(notification));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public close(notification: Notification): void {
    this.notifications = this.notifications.filter(
      (notif) => notif.id !== notification.id
    );
  }

  private _addNotification(notification: Notification): void {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  className(notification: Notification): string {
    let style: string;

    switch (notification.type) {
      case NotificationTypeEnum.SUCCESS:
        style = 'success';
        break;

      case NotificationTypeEnum.WARNING:
        style = 'warning';
        break;

      case NotificationTypeEnum.ERROR:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }
}
