import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {QuartoGameState} from '../model/quarto-game-state';
import {QuartoGameStateDto} from '../model/quarto-game-state-dto';
import {QuartoOptions} from '../model/quarto-options';
import {BoardGameScore} from '../enums/board-game-score';
import {ConnectionErrorSnackbarComponent} from '../shared/connection-error-snackbar/connection-error-snackbar.component';
import {LevelErrorSnackbarComponent} from '../shared/level-error-snackbar/level-error-snackbar.component';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {
  private _snackbar = inject(MatSnackBar);
  private API_BASE_URL: string = environment.BASE_URL + '/api/quarto';
  private static EMPTY_BOARD: string[][] = [
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"]
  ];
  private static ALL_PIECES: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

  private _loading: boolean = false;
  private _gameOver: boolean = false;
  private _currentGameState: QuartoGameState;
  private _options: QuartoOptions = new QuartoOptions(false, 1);

  constructor(private _httpClient: HttpClient) {
    this._currentGameState = new QuartoGameState(this.getEmptyBoard(), '1', [...QuartoService.ALL_PIECES], false, this._options.playFirst);
    this.loadOptionsFromSessionStorage();
  }

  public getEmptyBoard(): string[][] {
    return QuartoService.EMPTY_BOARD.map(row => [...row]);
  }

  public getCurrentBoard(): string[][] {
    return this._currentGameState.getBoard();
  }

  public getCurrentTurn(): string {
    return this._currentGameState.getCurrentTurn();
  }

  public getAvailablePieces(): string[] {
    return this._currentGameState.availablePieces;
  }

  public getAllPieceSlots(): string[] {
    const allPieces = [...QuartoService.ALL_PIECES];
    const usedPieces = new Set<string>();

    for (let row of this._currentGameState.getBoard()) {
      for (let cell of row) {
        if (cell !== '-') {
          usedPieces.add(cell);
        }
      }
    }

    if (this._currentGameState.selectedPiece !== '') {
      usedPieces.add(this._currentGameState.selectedPiece);
    }

    return allPieces.map(piece => usedPieces.has(piece) ? '-' : piece);
  }

  public getSelectedPiece(): string {
    return this._currentGameState.selectedPiece;
  }

  public isLoading(): boolean {
    return this._loading;
  }

  public isGameOver(): boolean {
    return this._gameOver;
  }

  public getBotLevel(): number {
    return this._options.botLevel;
  }

  public getPlayFirst(): boolean {
    return this._options.playFirst;
  }

  public getOptions(): QuartoOptions {
    return this._options;
  }

  public setOptions(options: QuartoOptions): void {
    this._options = options;
    this.saveOptionsToSessionStorage();
  }

  private loadOptionsFromSessionStorage(): void {
    const stored = sessionStorage.getItem('quartoOptions');
    if (stored) {
      this._options = Object.assign(new QuartoOptions(), JSON.parse(stored));
    }
  }

  private saveOptionsToSessionStorage(): void {
    sessionStorage.setItem('quartoOptions', JSON.stringify(this._options));
  }

  public resetBoard(): void {
    this._loading = true;
    this._currentGameState = new QuartoGameState(this.getEmptyBoard(), '1', [...QuartoService.ALL_PIECES], false, this._options.playFirst);
    this._gameOver = false;

    if (!this._options.playFirst) {
      this.selectRandomFirstPiece();
    } else {
      this._loading = false;
    }
  }

  private selectRandomFirstPiece(): void {
    const randomIndex = Math.floor(Math.random() * this._currentGameState.availablePieces.length);
    const randomPiece = this._currentGameState.availablePieces[randomIndex];
    this._currentGameState.selectedPiece = randomPiece;
    this._currentGameState.availablePieces = this._currentGameState.availablePieces.filter(p => p !== randomPiece);
    this._currentGameState.switchTurn();
    this._loading = false;
  }

  public selectPieceForOpponent(piece: string): void {
    if (this._loading || this._gameOver || this._currentGameState.selectedPiece !== '') {
      return;
    }

    this._currentGameState.selectedPiece = piece;
    this._currentGameState.availablePieces = this._currentGameState.availablePieces.filter(p => p !== piece);
    this._currentGameState.switchTurn();

    this.retrieveBotPlacement();
  }

  private retrieveBotPlacement(): void {
    this._loading = true;
    const dto = new QuartoGameStateDto(this._currentGameState, this._options.botLevel);

    this._httpClient.post<QuartoGameState>(this.API_BASE_URL + '/place-piece', dto).subscribe({
      next: data => {
        this._currentGameState = Object.assign(this._currentGameState, data);

        if (this._currentGameState.getBoardGameScore() !== BoardGameScore.UNDETERMINED) {
          this.popSnackbarIfApplicable();
          this._gameOver = true;
          this._loading = false;
          return;
        }

        if (this._currentGameState.availablePieces.length === 0 && this._currentGameState.selectedPiece === '') {
          this._currentGameState.setBoardGameScore(BoardGameScore.TIE);
          this.popSnackbarIfApplicable();
          this._gameOver = true;
          this._loading = false;
          return;
        }

        this._loading = false;
      },
      error: error => {
        console.error(error);
        if (error.status === 0) {
          this._snackbar.openFromComponent(ConnectionErrorSnackbarComponent, {
            duration: 3000
          });
        }
        if (error.status === 400 && error.error === 'Level must be between 1 and 10') {
          this._snackbar.openFromComponent(LevelErrorSnackbarComponent, {
            duration: 3000
          });
        }
        this._loading = false;
      }
    });
  }

  public placePiece(row: number, col: number): void {
    if (this._loading || this._gameOver || this._currentGameState.selectedPiece === '' ||
        this._currentGameState.getBoard()[row][col] !== '-') {
      return;
    }

    this._currentGameState.getBoard()[row][col] = this._currentGameState.selectedPiece;
    this._currentGameState.selectedPiece = '';

    const score = this.evaluateBoardForWin();
    if (score !== BoardGameScore.UNDETERMINED) {
      this._currentGameState.setBoardGameScore(score);
      this.popSnackbarIfApplicable();
      this._gameOver = true;
      return;
    }

    if (this._currentGameState.availablePieces.length === 0) {
      this._currentGameState.setBoardGameScore(BoardGameScore.TIE);
      this.popSnackbarIfApplicable();
      this._gameOver = true;
      return;
    }
  }

  private evaluateBoardForWin(): BoardGameScore {
    const board = this._currentGameState.getBoard();
    let hasWin = false;

    // Check rows
    for (let i = 0; i < 4; i++) {
      if (this.checkLine([board[i][0], board[i][1], board[i][2], board[i][3]])) {
        hasWin = true;
        break;
      }
    }

    // Check columns
    if (!hasWin) {
      for (let i = 0; i < 4; i++) {
        if (this.checkLine([board[0][i], board[1][i], board[2][i], board[3][i]])) {
          hasWin = true;
          break;
        }
      }
    }

    // Check diagonals
    if (!hasWin) {
      if (this.checkLine([board[0][0], board[1][1], board[2][2], board[3][3]])) {
        hasWin = true;
      } else if (this.checkLine([board[0][3], board[1][2], board[2][1], board[3][0]])) {
        hasWin = true;
      }
    }

    if (hasWin) {
      // In Quarto, the player who placed the piece that created the winning line wins
      // Since we just placed, the current turn is the winner
      return this._currentGameState.getCurrentTurn() === '1' ? BoardGameScore.PLAYER_1_WIN : BoardGameScore.PLAYER_2_WIN;
    }

    // Check for tie (board full)
    if (this._currentGameState.availablePieces.length === 0 && this._currentGameState.selectedPiece === '') {
      return BoardGameScore.TIE;
    }

    return BoardGameScore.UNDETERMINED;
  }

  private checkLine(pieces: string[]): boolean {
    if (pieces.some(p => p === '-')) {
      return false;
    }

    // Convert pieces to their numeric values (0-15)
    const values = pieces.map(p => p.charCodeAt(0) - 65);

    // Check if all pieces share at least one attribute set to 1
    if ((values[0] & values[1] & values[2] & values[3]) !== 0) {
      return true;
    }

    // Check if all pieces share at least one attribute set to 0
    // XOR with 0x0F (15) flips the lower 4 bits
    const flipped = values.map(v => v ^ 0x0F);
    if ((flipped[0] & flipped[1] & flipped[2] & flipped[3]) !== 0) {
      return true;
    }

    return false;
  }

  private popSnackbarIfApplicable(): void {
    if (this._options.playFirst) {
      switch (this._currentGameState.getBoardGameScore()) {
        case BoardGameScore.PLAYER_1_WIN:
          this.popWinningSnackbar();
          break;
        case BoardGameScore.PLAYER_2_WIN:
          this.popLosingSnackbar();
          break;
        case BoardGameScore.TIE:
          this.popTieSnackbar();
          break;
      }
    } else {
      switch (this._currentGameState.getBoardGameScore()) {
        case BoardGameScore.PLAYER_1_WIN:
          this.popLosingSnackbar();
          break;
        case BoardGameScore.PLAYER_2_WIN:
          this.popWinningSnackbar();
          break;
        case BoardGameScore.TIE:
          this.popTieSnackbar();
          break;
      }
    }
  }

  private popWinningSnackbar(): void {
    this._snackbar.open('You win!', 'Ok', {
      duration: 3000
    });
  }

  private popLosingSnackbar(): void {
    this._snackbar.open('Bot wins!', 'Ok', {
      duration: 3000
    });
  }

  private popTieSnackbar(): void {
    this._snackbar.open('Draw!', 'Ok', {
      duration: 3000
    });
  }

  public getPieceAttributes(piece: string): { brown: boolean, tall: boolean, square: boolean, full: boolean } {
    if (piece === '-') {
      return { brown: false, tall: false, square: false, full: false };
    }
    const value = piece.charCodeAt(0) - 65;
    return {
      brown: (value & 1) !== 0,
      tall: (value & 2) !== 0,
      square: (value & 4) !== 0,
      full: (value & 8) !== 0
    };
  }
}
