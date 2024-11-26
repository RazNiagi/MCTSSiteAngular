import {Injectable} from '@angular/core';
import {RowCol} from '../model/row-column';
import {ConnectFourGameState} from '../model/connect-four-game-state';
import {HttpClient} from '@angular/common/http';
import {BoardGameScore} from '../enums/board-game-score';
import {ConnectFourGameStateDto} from '../model/connect-four-game-state-dto';

@Injectable({
  providedIn: 'root'
})
export class ConnectFourService {

  private API_BASE_URL: string = 'http://localhost:8080/connect-four';
  private static EMPTY_BOARD: string[][] = [
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"]
  ];
  private _loading: boolean = false;
  private _ghostLocation: RowCol = new RowCol(-1, -1);
  private _botLevel: number = 1;
  private _gameOver: boolean = false;
  private _currentGameState = new ConnectFourGameState(this.getEmptyBoard(), 'r');
  private _lastPlacedPiece: RowCol = new RowCol(-1, -1);
  constructor(private _httpClient: HttpClient) { }

  public getCurrentBoard(): string[][] {
    return this._currentGameState.getBoard();
  }

  public getEmptyBoard(): string[][] {
    let newBoard: string[][] = [];
    for (let i = 0; i < ConnectFourService.EMPTY_BOARD.length; i++) {
      newBoard.push([...ConnectFourService.EMPTY_BOARD[i]]);
    }
    return newBoard;
  }

  public getCurrentTurn(): string {
    return this._currentGameState.getCurrentTurn();
  }

  getGhostLocation(): RowCol {
    return this._ghostLocation;
  }

  setGhostLocation(column: number) {
    this._ghostLocation = new RowCol(this.getNextPieceRow(column), column);
  }

  public resetGhostPiece(): void {
    this._ghostLocation = new RowCol(-1, -1);

  }

  public getNextPieceRow(column: number): number {
    for (let i = 0; i < 6; i++) {
      if (this._currentGameState.getBoard()[i][column] === '-') {
        return i;
      }
    }
    return -1;
  }

  public canMakeMove(column: number): boolean {
    return this._currentGameState.getBoard()[5][column] === '-' && !this._gameOver;
  }

  public attemptMove(column: number): void {
    console.log('attempting move for col', column);
    if (this.canMakeMove(column)) {
      this.makeMove(column);
    }
  }

  public makeMove(column: number): void {
    if (this._ghostLocation.column === -1) {
      return;
    }
    this._loading = true;
    this._currentGameState.getBoard()[this.getGhostLocation().row][this.getGhostLocation().column] = this._currentGameState.getCurrentTurn();
    this._lastPlacedPiece = new RowCol(this.getGhostLocation().row, this.getGhostLocation().column);
    this._currentGameState.switchTurn();
    const newScore = this.evaluateBoardForWin(this._currentGameState);
    if (newScore !== BoardGameScore.UNDETERMINED) {
      this._gameOver = true;
      this._loading = false;
      return;
    }
    // Make call to the api then set the current game state to the return
    this._httpClient.post<ConnectFourGameState>(this.API_BASE_URL + '/make-move', new ConnectFourGameStateDto(this._currentGameState, this._botLevel)).subscribe(
      {
        next: data => {
          this._currentGameState = Object.assign(this._currentGameState, data);
          this.setGhostLocation(column);
          if (this._currentGameState.getBoardGameScore() !== BoardGameScore.UNDETERMINED) {
            this._gameOver = true;
          }
          this._loading = false;
      },
        error: error => {
          console.error(error.error);
          this._currentGameState.getBoard()[this._lastPlacedPiece.row][this._lastPlacedPiece.column] = '-';
          this._currentGameState.switchTurn();
          this._loading = false;
      }
    });
  }

  public isLoading(): boolean {
    return this._loading;
  }

  public isGameOver(): boolean {
    return this._gameOver;
  }

  public resetBoard(): void {
    this._loading = true;
    this._currentGameState = new ConnectFourGameState(this.getEmptyBoard(), 'r');
    this._gameOver = false;
    this.resetGhostPiece();
    this._loading = false;
  }

  public evaluateBoardForWin(gameState: ConnectFourGameState): BoardGameScore {
    let redWin: boolean = false;
    let yellowWin: boolean = false;
    let board: string[][] = gameState.getBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        if (j <= 3) {
          if (this.checkDiagonalRight(board, i, j) || this.checkHorizontalRight(board, i, j)) {
            if (board[i][j] === 'r') {
              redWin = true;
            }
            if (board[i][j] === 'y') {
              yellowWin = true;
            }
          }
        }
        if (j >= 3) {
          if (this.checkDiagonalLeft(board, i, j) || this.checkHorizontalLeft(board, i, j)) {
            if (board[i][j] === 'r') {
              redWin = true;
            }
            if (board[i][j] === 'y') {
              yellowWin = true;
            }
          }
        }
        if (this.checkVertical(board, i, j)) {
          if (board[i][j] === 'r') {
            redWin = true;
          }
          if (board[i][j] === 'y') {
            redWin = true;
          }
        }
      }
    }
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.checkHorizontalRight(board, i, j)) {
          if (board[i][j] === 'r') {
            redWin = true;
          }
          if (board[i][j] === 'y') {
            yellowWin = true;
          }
        }
      }
    }
    if (redWin && yellowWin) {
      return BoardGameScore.INVALID_BOARD;
    }
    if (redWin) {
      return BoardGameScore.RED_WIN;
    }
    if (yellowWin) {
      return BoardGameScore.YELLOW_WIN;
    }
    if (this.isBoardFull(board)) {
      return BoardGameScore.TIE;
    }
    return BoardGameScore.UNDETERMINED;
  }

  private isBoardFull(board: string[][]): boolean {
    for (let piece of board[5]) {
      if (piece === '-') {
        return false;
      }
    }
    return true;
  }

  private checkVertical(board: string[][], row: number, col: number): boolean {
    return this.areFourSameColor(board[row][col], board[row + 1][col], board[row + 2][col], board[row + 3][col])
  }

  private checkHorizontalLeft(board: string[][], row: number, col: number): boolean {
    return this.areFourSameColor(board[row][col], board[row][col - 1], board[row][col - 2], board[row][col - 3])
  }

  private checkHorizontalRight(board: string[][], row: number, col: number): boolean {
    return this.areFourSameColor(board[row][col], board[row][col + 1], board[row][col + 2], board[row][col + 3])
  }

  private checkDiagonalLeft(board: string[][], row: number, col: number): boolean {
    return this.areFourSameColor(board[row][col], board[row + 1][col - 1], board[row + 2][col - 2], board[row + 3][col - 3])
  }

  private checkDiagonalRight(board: string[][], row: number, col: number): boolean {
    return this.areFourSameColor(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])
  }

  private areFourSameColor(a: string, b: string, c: string, d: string): boolean {
    return a === b && a === c && a === d && a !== '-';
}
}
