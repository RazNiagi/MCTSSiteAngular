import {Component} from '@angular/core';
import {QuartoService} from '../quarto.service';

@Component({
  selector: 'app-quarto-board',
  templateUrl: './quarto-board.component.html',
  styleUrl: './quarto-board.component.scss'
})
export class QuartoBoardComponent {
  constructor(private _quartoService: QuartoService) {}

  public getCurrentBoard(): string[][] {
    return this._quartoService.getCurrentBoard();
  }

  public getAvailablePieces(): string[] {
    return this._quartoService.getAvailablePieces();
  }

  public getSelectedPiece(): string {
    return this._quartoService.getSelectedPiece();
  }

  public onPieceSelect(piece: string): void {
    this._quartoService.selectPiece(piece);
  }

  public onCellClick(row: number, col: number): void {
    this._quartoService.placePiece(row, col);
  }

  public isMyTurn(): boolean {
    const playFirst = this._quartoService.getPlayFirst();
    const currentTurn = this._quartoService.getCurrentTurn();
    return (playFirst && currentTurn === 'r') || (!playFirst && currentTurn === 'b');
  }

  public isPieceSelected(): boolean {
    return this.getSelectedPiece() !== '';
  }
}
