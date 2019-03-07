import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  logo: string;
  brand: string;
  user: object;
  copyright: string;

  constructor(private _auth: AuthService) {
    this.brand = environment.app.brand.name;
    this.logo = environment.app.brand.logo;
    this.user = this._auth.user;
    this.copyright = environment.app.brand.copyright;
  }

  ngOnInit() {
  }

}
