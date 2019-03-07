import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {mapTo, tap} from 'rxjs/internal/operators';
import {BehaviorSubject} from 'rxjs';

interface CacheFailed {
  request: any;
  error: any;
  handler: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loaderSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public _preLoader: boolean;
  public _user;
  public _accessToken;
  public _refreshToken;

  get preLoader() {
    return this._preLoader;
  }

  set preLoader(value) {
    if (value) {
      this.loaderSubject.next(this.loaderSubject.value + 1);
    } else {
      this.loaderSubject.next(this.loaderSubject.value - 1);
    }
    this._preLoader = value;
  }

  constructor(public http: HttpClient) {
    this.doLoginUser = this.doLoginUser.bind(this);
  }

  get user() {
    this._user = JSON.parse(localStorage.getItem('user'));
    return this._user;
  }

  set user(value) {
    localStorage.setItem('user', JSON.stringify(value));
    this._user = value;
  }

  get accessToken() {
    this._accessToken = localStorage.getItem('access_token');
    return this._accessToken;
  }

  set accessToken(value) {
    localStorage.setItem('access_token', value);
    this._accessToken = value;
  }

  get refreshToken() {
    this._refreshToken = localStorage.getItem('refresh_token');
    return this._refreshToken;
  }

  set refreshToken(value) {
    localStorage.setItem('refresh_token', value);
    this._refreshToken = value;
  }


  addCredientials() {
    return new HttpHeaders()
      .set('Authorization', 'Basic ' +
        btoa(environment.app.baseAuth.username + ':' + environment.app.baseAuth.password));
  }


  onLogin(objData) {

    // User login

    if (objData.username && objData.password) {

      const headers = this.addCredientials();

      const fd = new FormData();
      fd.append('username', objData.username);
      fd.append('password', objData.password);
      fd.append('grant_type', 'password');
      return this.http.post(environment.app.baseURL + 'token', fd, {headers})
        .pipe(
          tap(tokens => this.doLoginUser(tokens))
        );
    }
  }

  onRefreshToken() {

    // Refresh token login on 400 error

    const headers = this.addCredientials();

    if (this.accessToken && this.refreshToken) {
      const fd = new FormData();
      fd.append('refresh_token', this.refreshToken);
      fd.append('access_token', this.accessToken);
      fd.append('grant_type', 'refresh_token');
      return this.http.post(environment.app.baseURL + 'token', fd, {headers})
        .pipe(
          tap(tokens => this.doLoginUser(tokens)),
        );
    }
  }

  onLogout() {
    return this.http.get(environment.app.baseURL + 'ping')
      .pipe(
        tap(res => this.doLogoutUser(res)),
      );
    ;
  }

  doLoginUser(tokens) {

    // Setting values in localStorage

    this.user = tokens;
    if (tokens['access_token']) {
      this.accessToken = tokens['access_token'];
    }
    if (tokens['refresh_token']) {
      this.refreshToken = tokens['refresh_token'];
    }
  }

  doLogoutUser(user) {
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
  }
}
