import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification, NotificationTypeEnum } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _subject = new Subject<Notification>();
  private _idx = 0;

  constructor() {}

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000) {
    this._subject.next(
      new Notification(
        this._idx++,
        NotificationTypeEnum.INFO,
        title,
        message,
        timeout
      )
    );
  }

  success(title: string, message: string, timeout = 3000) {
    this._subject.next(
      new Notification(
        this._idx++,
        NotificationTypeEnum.SUCCESS,
        title,
        message,
        timeout
      )
    );
  }

  warning(title: string, message: string, timeout = 3000) {
    this._subject.next(
      new Notification(
        this._idx++,
        NotificationTypeEnum.WARNING,
        title,
        message,
        timeout
      )
    );
  }

  error(title: string, message: string, timeout = 0) {
    this._subject.next(
      new Notification(
        this._idx++,
        NotificationTypeEnum.ERROR,
        title,
        message,
        timeout
      )
    );
  }
}
