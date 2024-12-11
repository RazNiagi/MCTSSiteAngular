import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OnitamaService} from './onitama.service';
import {OnitamaSettingsDialogComponent} from './onitama-settings-dialog/onitama-settings-dialog.component';
import {OnitamaMovementCard} from '../model/onitama-movement-card';
import {WidthHeight} from '../model/width-height';
import {OnitamaNewGameDialogComponent} from './onitama-new-game-dialog/onitama-new-game-dialog.component';

@Component({
  selector: 'app-onitama',
  templateUrl: './onitama.component.html',
  styleUrl: './onitama.component.scss'
})
export class OnitamaComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  public onitamaBoardDimensions = new WidthHeight('500px', '500px');
  public movementCardDimensions: WidthHeight = new WidthHeight('160px', '90px');

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
    const dialogRef = this.dialog.open(OnitamaSettingsDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._onitamaService.options = result;
        this._onitamaService.saveOptionsToLocalStorage();
      }
    })
  }

  onResize(): void {
    let el = document.getElementById('onitama-container-column');
    if (el !== null) {
      this.calculateBoardDimensions(el);
    }
    let movementCardEl = document.getElementById('opponent-movement-card-0');
    if (movementCardEl !== null) {
      this.calculateMovementCardDimensions(movementCardEl);
    }
  }

  public calculateBoardDimensions(el: HTMLElement): void {
    let heightPerSquare = el.offsetHeight / 5;
    let widthPerSquare = (el.offsetWidth - 24) / 5;
    let squareSide = Math.min(heightPerSquare, widthPerSquare);
    let squareParam = (5 * squareSide) + 'px';
    this.onitamaBoardDimensions = new WidthHeight(squareParam, squareParam);
  }

  public calculateMovementCardDimensions(el: HTMLElement): void {
    let heightPerSquare = el.offsetHeight / 9;
    let widthPerSquare = (el.offsetWidth - 24) / 16;
    let squareSide = Math.min(heightPerSquare, widthPerSquare);
    let height: string = (9 * squareSide) * .95 + 'px';
    let width: string = (16 * squareSide) * .95 + 'px';
    this.movementCardDimensions = new WidthHeight(width, height);
  }

  public getBotLevel(): number {
    return this._onitamaService.getBotLevel();
  }

  public openNewGameDialog(): void {
    const dialogRef = this.dialog.open(OnitamaNewGameDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (typeof result === 'number') {
          this._onitamaService.botLevel = result;
          this.resetBoard();
        } else {
          this._onitamaService.loadNewBoard(result);
        }
      }
    })
  }

  public selectMovementCard(name: string): void {
    if (this._onitamaService.getCurrentTurn() !== this._onitamaService.playingCurrentGameAs || this._onitamaService.gameOver) {
      return;
    }
    this._onitamaService.selectedMovementCard = this._onitamaService.selectedMovementCard === name
      ? ''
      : name;
  }

  public getPlayerMovementCards(): OnitamaMovementCard[] {
    return this._onitamaService.getPlayerMovementCards();
  }

  public getOpponentMovementCards(): OnitamaMovementCard[] {
    return this._onitamaService.getOpponentMovementCards();
  }

  public getMiddleMovementCard(): OnitamaMovementCard {
    return this._onitamaService.getMiddleMovementCard();
  }

  public isCardSelected(name: string): boolean {
    return this._onitamaService.selectedMovementCard === name;
  }
}
