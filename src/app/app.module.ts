import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {HttpInterceptorService} from './util/http/http-interceptor.service';
import {ForgetComponent} from './auth/forget/forget.component';
import {HomeComponent} from './master/home/home.component';
import {MasterComponent} from './master/master.component';
import {PingComponent} from './master/ping/ping.component';
import {AuthService} from './auth/auth.service';
import {LogoutComponent} from './auth/logout/logout.component';
import {SearchComponent} from './master/search/search.component';
import {PreloaderComponent} from './util/preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    ForgetComponent,
    HomeComponent,
    MasterComponent,
    PingComponent,
    LogoutComponent,
    SearchComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
