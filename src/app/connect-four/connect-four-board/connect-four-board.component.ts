import {Component} from '@angular/core';
import {ConnectFourService} from '../connect-four.service';
import {RowCol} from '../../model/row-column';

@Component({
  selector: 'app-connect-four-board',
  templateUrl: './connect-four-board.component.html',
  styleUrl: './connect-four-board.component.scss'
})
export class ConnectFourBoardComponent {
  constructor(private _connectFourService: ConnectFourService) {
  }

  public getCurrentBoard(): string[][] {
    return this._connectFourService.getCurrentBoard();
  }

  public getGhostLocation(): RowCol {
    return this._connectFourService.getGhostLocation();
  }

  public isGhostLocation(row: number, column: number): boolean {
    let ghostLocation = this.getGhostLocation();
    return ghostLocation.row === row && ghostLocation.column === column;
  }

  public setGhostLocation(column: number): void {
    this._connectFourService.setGhostLocation(column);
  }

  public resetGhostLocation(): void {
    this._connectFourService.resetGhostPiece();
  }

  public getCurrentTurn(): string {
    return this._connectFourService.getCurrentTurn();
  }

  public getColorIfNotGhostLocation(row: number, column: number): string {
    if (!this.isLoading() && !this.isGameOver() && this.isGhostLocation(row, column)) {
      return this.getCurrentTurn();
    }
    return this.getCurrentBoard()[row][column];
  }

  public attemptMove(column: number): void {
    this._connectFourService.attemptMove(column);
  }

  public isLoading(): boolean {
    return this._connectFourService.isLoading();
  }

  public isGameOver(): boolean {
    return this._connectFourService.isGameOver();
  }
}
