import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Notification, NotificationTypeEnum} from '../models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private subject = new Subject<Notification>();
  private idx = 0;

  constructor() {}

  getObservable(): Observable<Notification> {
    return this.subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000): void {
    this.subject.next(new Notification(this.idx++, NotificationTypeEnum.INFO, title, message, timeout));
  }

  success(title: string, message: string, timeout = 3000): void {
    this.subject.next(new Notification( this.idx++, NotificationTypeEnum.SUCCESS, title, message, timeout));
  }

  warning(title: string, message: string, timeout = 3000): void {
    this.subject.next(new Notification(this.idx++, NotificationTypeEnum.WARNING, title, message, timeout));
  }

  error(title: string, message: string, timeout = 0): void {
    this.subject.next(new Notification(this.idx++, NotificationTypeEnum.ERROR, title, message, timeout));
  }
}
