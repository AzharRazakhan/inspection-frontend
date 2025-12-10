import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  toastState = new BehaviorSubject<any>(null);

  success(msg: string) {
    this.show(msg, "success");
  }

  error(msg: string) {
    this.show(msg, "error");
  }

  private show(message: string, type: string) {
    this.toastState.next({ message, type });

    setTimeout(() => {
      this.toastState.next(null);      // auto-hide after 3 sec
    }, 3000);
  }
}
