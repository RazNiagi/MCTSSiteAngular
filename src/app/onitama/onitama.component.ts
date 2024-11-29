import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OnitamaService} from './onitama.service';
import {OnitamaSettingsComponent} from './onitama-settings/onitama-settings.component';
import {NewGameDialogComponent} from '../shared/new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-onitama',
  templateUrl: './onitama.component.html',
  styleUrl: './onitama.component.scss'
})
export class OnitamaComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  public onitamaBoardDimensions = {
    height: '100%',
    width: '100%'
  }

  constructor(private _onitamaService: OnitamaService) {
  }

  public isLoading(): boolean {
    return this._onitamaService.isLoading();
  }

  public ngOnInit(): void {
    this._onitamaService.init();
    this.resetBoard();
    this.onResize();
  }

  public resetBoard(): void {
    this._onitamaService.resetBoard();
  }

  public openSettingsDialog(): void {
    const dialogRef = this.dialog.open(OnitamaSettingsComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._onitamaService.options = result;
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
    let heightPerSquare = el.offsetHeight / 5;
    let widthPerSquare = (el.offsetWidth - 24) / 5;
    let squareSide = Math.min(heightPerSquare, widthPerSquare);
    let squareParam = (5 * squareSide) + 'px';
    this.onitamaBoardDimensions = {
      height: squareParam,
      width: squareParam
    };
  }

  public getBotLevel(): number {
    return this._onitamaService.getBotLevel();
  }

  public openNewGameDialog(): void {
    const dialogRef = this.dialog.open(NewGameDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._onitamaService.botLevel = result;
        this.resetBoard();
      }
    })
  }
}
