import {Component, Input} from '@angular/core';
import {OnitamaService} from '../onitama.service';
import {WidthHeight} from '../../model/width-height';
import {OnitamaMove} from '../../model/onitama-move';
import {OnitamaMovementCard} from '../../model/onitama-movement-card';
import {OnitamaCardBoardService} from '../onitama-card-board.service';

@Component({
  selector: 'app-onitama-board',
  templateUrl: './onitama-board.component.html',
  styleUrl: './onitama-board.component.scss'
})
export class OnitamaBoardComponent {
  public range5: number[] = [0, 1, 2, 3, 4];
  public reverseRange5: number[] = [4, 3, 2, 1, 0];

  @Input() widthHeight: WidthHeight = new WidthHeight('100px', '100px');

  constructor(private _onitamaService: OnitamaService, private _onitamaCardBoardService: OnitamaCardBoardService) {
  }

  public getCurrentBoard(): string[][] {
    return this._onitamaService.getCurrentBoard();
  }

  public getReverseBoard(): string[][] {
    return this._onitamaCardBoardService.rotateBoard(this._onitamaCardBoardService.copyBoard(this._onitamaService.getCurrentBoard()));
  }

  public getPieceWidthHeight(): WidthHeight {
    let sideLength: number = (parseInt(this.widthHeight.width) / 5) * 0.9;
    let slString: string = sideLength + 'px';
    return new WidthHeight(slString, slString);
  }

  public selectPiece(row: number, col: number): void {
    if (this._onitamaService.getCurrentTurn() !== this._onitamaService.playingCurrentGameAs || this._onitamaService.gameOver) {
      return;
    }
    if (this._onitamaService.selectedPiece.x === row && this._onitamaService.selectedPiece.y === col) {
      this._onitamaService.selectedPiece = new OnitamaMove(-1, -1);
      return;
    }
    if (this._onitamaService.getCurrentBoard()[row][col].toLowerCase() !== this._onitamaService.playingCurrentGameAs) {
      return;
    }
    this._onitamaService.selectedPiece = new OnitamaMove(row, col);
  }

  public isSelectedPiece(row: number, col: number): boolean {
    return this._onitamaService.selectedPiece.x === row && this._onitamaService.selectedPiece.y === col;
  }

  public getValidMoveClass(row: number, col: number): string {
    return this.isValidEndMove(row, col) ? 'valid-move' : 'invalid-move';
  }

  public getTempleClass(row: number, col: number): string {
    if (this._onitamaService.playingCurrentGameAs === 'r') {
      if (row === 0 && col === 2) {
        return this.isCurrentlyPlayersTurn() ? 'red-temple' : 'blue-temple';
      }
      if (row === 4 && col === 2) {
        return this.isCurrentlyPlayersTurn() ? 'blue-temple' : 'red-temple';
      }
    } else {
      if (row === 0 && col === 2) {
        return this.isCurrentlyPlayersTurn() ? 'blue-temple' : 'red-temple';
      }
      if (row === 4 && col === 2) {
        return this.isCurrentlyPlayersTurn() ? 'red-temple' : 'blue-temple';
      }
    }
    return '';
  }

  public getTableSquareClass(row: number, col: number): string {
    let toReturn: string = this.getValidMoveClass(row, col);
    let templeClass: string = this.getTempleClass(row, col);
    if (templeClass) {
      toReturn = toReturn + ' ' + templeClass;
    }
    return toReturn;
  }

  public isValidEndMove(row: number, col: number): boolean {
    if (!this._onitamaService.selectedMovementCard || this._onitamaService.selectedPiece.x === -1 || this._onitamaService.selectedPiece.y === -1) {
      return false;
    }
    let selectedMoveCard: OnitamaMovementCard | undefined = this._onitamaCardBoardService.getAllCards().find(card => card.name === this._onitamaService.selectedMovementCard);
    if (selectedMoveCard) {
      for (let move of selectedMoveCard.movesAvailable) {
        if (this._onitamaService.selectedPiece.y - move.x === col && this._onitamaService.selectedPiece.x + move.y === row) {
          return this._onitamaService.getCurrentBoard()[row][col].toLowerCase() !== this._onitamaService.playingCurrentGameAs;
        }
      }
    }
    return false;
  }

  public selectPieceOrMove(row: number, col: number) {
    if (this.isValidEndMove(row, col)) {
      this._onitamaService.makeMove(row, col);
    } else {
      this.selectPiece(row, col);
    }
  }

  public isCurrentlyPlayersTurn(): boolean {
    return this._onitamaService.playingCurrentGameAs === this._onitamaService.getCurrentTurn();
  }
}
