import {Component, OnInit} from '@angular/core';
import {PingService} from './ping.service';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss'],
  providers: [PingService]
})
export class PingComponent implements OnInit {
  msg;

  constructor(private _pingService: PingService) {
  }

  ngOnInit() {
    this._pingService.ping().subscribe(res => {
      this.msg = res;
    }, err => {

    });
  }

}
