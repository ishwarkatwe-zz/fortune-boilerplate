import {Component, OnDestroy, OnInit} from '@angular/core';
import {PingService} from './ping.service';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss'],
  providers: [PingService]
})
export class PingComponent implements OnInit, OnDestroy {

  msg;
  sub;

  constructor(private _pingService: PingService) {
  }

  ngOnInit() {
    this.sub = this._pingService.ping().subscribe(res => {
      this.msg = res;
    }, err => {

    });
  }

  ngOnDestroy(): void {

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
