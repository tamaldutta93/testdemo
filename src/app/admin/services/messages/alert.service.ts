import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//import { Message } from 'primeng/primeng';

export class AlertMessage {
    public show: boolean;
    public message: string;
}

@Injectable()
export class AlertService {
    public alertStatus: BehaviorSubject<AlertMessage> = new BehaviorSubject<AlertMessage>({ show: false, message: null });

    showAlert(isShow: boolean, msg: string) {
        const alertObj: AlertMessage = { show: isShow, message: msg };
        this.alertStatus.next(alertObj);
    }
}