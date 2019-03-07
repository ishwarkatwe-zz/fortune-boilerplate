import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    // this._authService.onLogout().subscribe(res => {
    //   this._router.navigateByUrl('/');
    // }, err => {
    //   localStorage.clear();
    //   window.location.reload();
    // });
    localStorage.clear();
    window.location.reload();
  }

}
