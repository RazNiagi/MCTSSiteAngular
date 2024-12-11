import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WidthHeight} from '../../model/width-height';

@Component({
  selector: 'app-onitama-editor-board',
  templateUrl: './onitama-editor-board.component.html',
  styleUrl: './onitama-editor-board.component.scss'
})
export class OnitamaEditorBoardComponent {
  public range5: number[] = [0, 1, 2, 3, 4];
  public reverseRange5: number[] = [4, 3, 2, 1, 0];
  public selectedPiece: string = '-';
  private currentBoard: string[][] = [
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"]
  ];
  public pieceSelections: string[] = ['r', 'R', 'b', 'B', '-'];

  @Input() widthHeight: WidthHeight = new WidthHeight('100px', '100px');
  @Input() playingAs: string = 'r';
  @Input() currentTurn: string = 'r';
  @Output() boardEmitter: EventEmitter<string[][]> = new EventEmitter<string[][]>();

  constructor() {
  }

  public getCurrentBoard(): string[][] {
    return this.currentBoard;
  }

  public getPieceWidthHeight(): WidthHeight {
    let sideLength: number = (parseInt(this.widthHeight.width) / 5) * 0.9;
    let slString: string = sideLength + 'px';
    return new WidthHeight(slString, slString);
  }

  public onPieceClick(row: number, col: number): void {
    if (this.selectedPiece === 'B') {
      this.removeExistingBlueMasterNotAt(row, col);
    } else if (this.selectedPiece === 'R') {
      this.removeExistingRedMasterNotAt(row, col);
    }
    this.currentBoard[row][col] = this.currentBoard[row][col] === this.selectedPiece ? '-' : this.selectedPiece;
    this.boardEmitter.emit(this.currentBoard);
  }

  public removeExistingBlueMasterNotAt(row: number, col: number): void {
    for (let i = 0; i < this.currentBoard.length; i++) {
      for (let j = 0; j < this.currentBoard[i].length; j++) {
        if (i === row && j === col) { continue; }
        if (this.currentBoard[i][j] === 'B') {
          this.currentBoard[i][j] = '-';
        }
      }
    }
  }

  public removeExistingRedMasterNotAt(row: number, col: number): void {
    for (let i = 0; i < this.currentBoard.length; i++) {
      for (let j = 0; j < this.currentBoard[i].length; j++) {
        if (i === row && j === col) { continue; }
        if (this.currentBoard[i][j] === 'R') {
          this.currentBoard[i][j] = '-';
        }
      }
    }
  }

  public onPieceSelectClick(piece: string): void {
    this.selectedPiece = this.selectedPiece === piece ? '-' : piece;
  }

  public isSelectedPiece(piece: string): boolean {
    return this.selectedPiece === piece;
  }

  public getSelectedPieceClass(piece: string): string {
    return this.isSelectedPiece(piece) ? 'selected' : '';
  }

  public getTempleClass(row: number, col: number): string {
    if (this.playingAs === 'r') {
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

  public isCurrentlyPlayersTurn(): boolean {
    return this.playingAs === this.currentTurn;
  }
}
