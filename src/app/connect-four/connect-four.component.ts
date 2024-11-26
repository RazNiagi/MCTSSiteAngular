import {Component, inject, OnInit} from '@angular/core';
import {ConnectFourService} from './connect-four.service';
import {MatDialog} from '@angular/material/dialog';
import {ConnectFourNewGameDialogComponent} from './connect-four-new-game-dialog/connect-four-new-game-dialog.component';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrl: './connect-four.component.scss',
})
export class ConnectFourComponent implements OnInit {
  readonly dialog = inject(MatDialog);

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

  public openNewGameDialog(): void {
    const dialogRef = this.dialog.open(ConnectFourNewGameDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this._connectFourService.botLevel = result;
      this.resetBoard();
    })
  }
}
