import {Component, Input} from '@angular/core';
import {OnitamaService} from '../onitama.service';
import {WidthHeight} from '../../model/width-height';
import {OnitamaMove} from '../../model/onitama-move';
import {OnitamaMovementCard} from '../../model/onitama-movement-card';

@Component({
  selector: 'app-onitama-board',
  templateUrl: './onitama-board.component.html',
  styleUrl: './onitama-board.component.scss'
})
export class OnitamaBoardComponent {
  public range5: number[] = [0, 1, 2, 3, 4];
  public reverseRange5: number[] = [4, 3, 2, 1, 0];

  @Input() widthHeight: WidthHeight = new WidthHeight('100px', '100px');

  constructor(private _onitamaService: OnitamaService) {
  }

  public getCurrentBoard(): string[][] {
    return this._onitamaService.getCurrentBoard();
  }

  public getReverseBoard(): string[][] {
    return this._onitamaService.rotateBoard(this._onitamaService.copyBoard(this._onitamaService.getCurrentBoard()));
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

  public isValidEndMove(row: number, col: number): boolean {
    if (!this._onitamaService.selectedMovementCard || this._onitamaService.selectedPiece.x === -1 || this._onitamaService.selectedPiece.y === -1) {
      return false;
    }
    let selectedMoveCard: OnitamaMovementCard | undefined = this._onitamaService.getAllCards().find(card => card.name === this._onitamaService.selectedMovementCard);
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

  public isLoading(): boolean {
    return this._onitamaService.isLoading();
  }
}
