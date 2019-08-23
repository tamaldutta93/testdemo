import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotificationService {
    dialogType: string;
    dialogTitle: string;
    dialogMessg: string;
    dialogTimeout: number;
    dialogProgress: boolean;
    dialogPause: boolean;
    dialogClose: boolean;

    constructor(private _notif_service: NotificationsService) {
    }

    /**********************
     * Custom Notification
     * @param
     * type(string),title(string),[message],
     * [timeout(int),progressbar(boolean),
     * pauseonhover(boolean),clicktoclose(boolean)]
     ************************/
    public initNotification(type: string, title: string, messg: string,
                        timeout: number, progress: boolean, pause: boolean, click: boolean): any {

        this.dialogTitle    =   title;
        this.dialogType     =   type;
        this.dialogMessg    =   messg;
        this.dialogTimeout  =   timeout;
        this.dialogProgress =   progress;
        this.dialogPause    =   pause;
        this.dialogClose    =   click;

        this.showNotification();
    }

    public showNotification(): any {
        switch (this.dialogType) {
            case 'error':
            this._notif_service.error(
                this.dialogTitle,
                this.dialogMessg,
                {
                  timeOut: this.dialogTimeout,
                  showProgressBar: this.dialogProgress,
                  pauseOnHover: this.dialogPause,
                  clickToClose: this.dialogClose
            });
            break;

            case 'success':
            this._notif_service.success(
                this.dialogTitle,
                this.dialogMessg,
                {
                  timeOut: this.dialogTimeout,
                  showProgressBar: this.dialogProgress,
                  pauseOnHover: this.dialogPause,
                  clickToClose: this.dialogClose
            });
            break;

            case 'alert':
            this._notif_service.alert(
                this.dialogTitle,
                this.dialogMessg,
                {
                  timeOut: this.dialogTimeout,
                  showProgressBar: this.dialogProgress,
                  pauseOnHover: this.dialogPause,
                  clickToClose: this.dialogClose
            });
            break;


            case 'info':
            this._notif_service.info(
                this.dialogTitle,
                this.dialogMessg,
                {
                  timeOut: this.dialogTimeout,
                  showProgressBar: this.dialogProgress,
                  pauseOnHover: this.dialogPause,
                  clickToClose: this.dialogClose
            });
            break;

            case 'warn':
            this._notif_service.warn(
                this.dialogTitle,
                this.dialogMessg,
                {
                  timeOut: this.dialogTimeout,
                  showProgressBar: this.dialogProgress,
                  pauseOnHover: this.dialogPause,
                  clickToClose: this.dialogClose
            });
            break;
        }
    }
}
