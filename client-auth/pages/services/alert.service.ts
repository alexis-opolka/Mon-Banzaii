import { BehaviorSubject } from 'rxjs';

const alertSubject = new BehaviorSubject(null);

export const alertService = {
  alert: alertSubject.asObservable(),
  success,
  error,
  clear
}

function success(message, showAfterRedirect: Boolean = false ) {
  alertSubject.next({
    type: 'alert-success',
    message,
    showAfterRedirect
  })
}

function error(message, showAfterRedirect: Boolean = false ) {
  alertSubject.next({
    type: 'alert-danger',
    message,
    showAfterRedirect
  })
}

function clear() {

  // if showAfterRedirect flag is true, then the alert is not cleared
  // for one route change (e.g. after successful registration)
  let alert = alertSubject.value;

  if (alert?.showAfterRedirect){
    alert.showAfterRedirect = false;
  } else {
    alert = null;
  }

  alertSubject.next(alert)
}
