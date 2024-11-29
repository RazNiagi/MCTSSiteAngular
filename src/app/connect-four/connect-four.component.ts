import {Component, inject, OnInit} from '@angular/core';
import {ConnectFourService} from './connect-four.service';
import {MatDialog} from '@angular/material/dialog';
import {NewGameDialogComponent} from '../shared/new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrl: './connect-four.component.scss',
})
export class ConnectFourComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public connectFourBoardDimensions = {
    height: '100%',
    width: '100%'
  }

  constructor(private _connectFourService: ConnectFourService) {
  }

  public isLoading(): boolean {
    return this._connectFourService.isLoading();
  }

  public ngOnInit(): void {
    this.resetBoard();
    this.onResize();
  }

  public resetBoard(): void {
    this._connectFourService.resetBoard();
  }

  public openNewGameDialog(): void {
    const dialogRef = this.dialog.open(NewGameDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._connectFourService.botLevel = result;
        this.resetBoard();
      }
    })
  }

  onResize(): void {
    let el = document.getElementById('connect-four-container-column');
    if (el !== null) {
      this.calculateBoardDimensions(el);
    }
  }

  public calculateBoardDimensions(el: HTMLElement): void {
    let heightPerSquare = el.offsetHeight / 6;
    let widthPerSquare = (el.offsetWidth - 24) / 7;
    let squareSide = Math.min(heightPerSquare, widthPerSquare);
    let heightParam = (6 * squareSide) + 'px';
    let widthParam = (7 * squareSide) + 'px';
    this.connectFourBoardDimensions = {
      height: heightParam,
      width: widthParam
    };
  }

  public getBotLevel(): number {
    return this._connectFourService.getBotLevel();
  }
}
