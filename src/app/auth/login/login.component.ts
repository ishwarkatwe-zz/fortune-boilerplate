import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  title: string;

  constructor(private _route: Router,
              private formBuilder: FormBuilder,
              private _authService: AuthService) {
    this.title = environment.app.brand.name;
    localStorage.clear();
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.submitted = false;
    this.loading = false;

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onAuthSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authService.onLogin(this.loginForm.value).subscribe(res => {
      this.loading = false;
      this._route.navigate(['home']);
    }, err => {
      this.loading = false;
      console.error(err);
    });
  }
}
