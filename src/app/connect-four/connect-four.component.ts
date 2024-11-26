import {Component, OnInit} from '@angular/core';
import {ConnectFourService} from './connect-four.service';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrl: './connect-four.component.scss'
})
export class ConnectFourComponent implements OnInit {
  constructor(private _connectFourService: ConnectFourService) {
  }

  public isLoading(): boolean {
    return this._connectFourService.isLoading();
  }

  public ngOnInit(): void {
    this.resetBoard();
  }

  public resetBoard(): void {
    this._connectFourService.resetBoard();
  }
}
