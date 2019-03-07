import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  boolPreLoader: boolean = false;
  max: number = 0;
  per: number = 0;
  showHide: boolean = false;

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this._authService.loaderSubject.subscribe(res => {
      this.showHide = true;

      if (res > this.max) {
        this.max = res;
      }
      this.per = 100 - ((res / this.max) * 100);

      if (this.per < 10) {
        this.per = 10;
      }
      this.boolPreLoader = (res > 0) ? true : false;

      if (this.per === 100) {
        setTimeout(() => {
          this.showHide = false;
        }, 200);
      }
    });
  }

}
