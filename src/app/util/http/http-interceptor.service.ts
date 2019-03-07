import {Injectable, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, EMPTY, Observable, throwError} from 'rxjs';
import {take, filter, catchError, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {tap} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';

declare var bootbox: any;
declare var toastr: any;

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  isRefreshing: boolean = false;

  isErrorModel: boolean = false;
  errorModelSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private _router: Router,
              public _authService: AuthService) {

  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        token: token
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.accessToken && !req.url.includes('token')) {
      req = this.addToken(req, this._authService.accessToken);
    }
    this._authService.preLoader = true;
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this._authService.preLoader = false;
          }
        },
        (err: any) => {
          this._authService.preLoader = false;


          if (err instanceof HttpErrorResponse
            && err.status !== 400
            && err.status !== 401
            && environment.app.error.showToaster) {
            toastr['error'](`Error ${err['status']}`, `${err['message']}`);
          }

        }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          return this.tokenRefreshHandler(req, next);
        } else if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.loginModelHandler(req, next);
        } else {

          if (environment.app.error.showErrorDialog) {
            this.logFailedRequest(req, next, error);
          }

          return throwError(error);
        }
      }));
  }


  loginModelHandler(req: HttpRequest<any>, next: HttpHandler) {

    let user = this._authService.user;

    var person = prompt('Session Expired, Please enter password for re-login :' + user['userId'], 'Your password here');
    if (person != null) {
      let objData = {
        'username': user['userId'],
        'password': person
      }

      return this._authService.onLogin(objData).pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token['access_token']);
          return next.handle(this.addToken(req, token['access_token']));
        })
      );
    } else {
      this._router.navigateByUrl('/auth/logout');
      return EMPTY;
    }
  }

  tokenRefreshHandler(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this._authService.onRefreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token['access_token']);
          return next.handle(this.addToken(req, token['access_token']));
        }),
        catchError(error => {
          return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(accessToken => {
              return next.handle(this.addToken(req, accessToken));
            })
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(req, accessToken));
        })
      );
    }
  }

  logFailedRequest(req, next, error) {

    if (!this.isErrorModel) {
      this.isErrorModel = true;
      this.errorModelSubject.next(null);


      this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(req, accessToken));
        })
      );

      let msg = `Error ${error['status']} - ${error['message']}\n\nClick on 'Ok' to retry or 'Cancel' to logout.
      `;


      var flag = confirm(environment.app.error.title + ' , ' + environment.app.error.retryMessage + '\n \n' + msg);
      if (flag) {
        this.isErrorModel = false;
        this.errorModelSubject.next(this._authService.accessToken);
        return next.handle(this.addToken(req, this._authService.accessToken));
      } else {
        this._router.navigateByUrl('/auth/logout');
        return EMPTY;
      }
    } else {
      return this.errorModelSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(req, accessToken));
        })
      );
    }
  }

}
