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

  public getAllPieceSlots(): string[] {
    return this._quartoService.getAllPieceSlots();
  }

  public getSelectedPiece(): string {
    return this._quartoService.getSelectedPiece();
  }

  public onPieceSelect(piece: string): void {
    if (!this.isPieceSelected() && this.isPlayerTurn() && !this.isLoading() && !this.isGameOver()) {
      this._quartoService.selectPieceForOpponent(piece);
    }
  }

  public isGameOver(): boolean {
    return this._quartoService.isGameOver();
  }

  public onCellClick(row: number, col: number): void {
    if (this.isPieceSelected() && this.isPlayerTurn() && !this.isLoading()) {
      this._quartoService.placePiece(row, col);
    }
  }

  public isLoading(): boolean {
    return this._quartoService.isLoading();
  }

  public isPlayerTurn(): boolean {
    return this._quartoService.getCurrentTurn() === '1';
  }

  public isPieceSelected(): boolean {
    return this.getSelectedPiece() !== '';
  }
}
