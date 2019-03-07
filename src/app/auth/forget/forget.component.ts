import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  title: string;
  resetForm: FormGroup;
  submitted: boolean;
  loading: boolean;

  constructor(private _route: Router,
              private _formBuilder: FormBuilder) {
    this.title = environment.app.brand.name;
  }

  get f() {
    return this.resetForm.controls;
  }

  ngOnInit() {
    this.submitted = false;
    this.loading = false;

    this.resetForm = this._formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  onAuthSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
  }

}
