import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {ForgetComponent} from './auth/forget/forget.component';
import {MasterComponent} from './master/master.component';
import {HomeComponent} from './master/home/home.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {MasterGuard} from './master/master.guard';
import {SearchComponent} from './master/search/search.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'forget', component: ForgetComponent},
      {path: 'logout', canActivate: [MasterGuard], component: LogoutComponent}
    ]
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [MasterGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'search', component: SearchComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // <-- debugging purposes only
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
