import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OnitamaGameState} from '../model/onitama-game-state';
import onitamaCards from './onitama-cards.json';
import {OnitamaMovementCard} from '../model/onitama-movement-card';
import {BoardGameScore} from '../enums/board-game-score';
import {OnitamaOptions} from '../model/onitama-options';

@Injectable({
  providedIn: 'root'
})
export class OnitamaService {
  get options(): OnitamaOptions {
    return this._options;
  }

  set options(value: OnitamaOptions) {
    this._options = value;
  }
  private _snackbar = inject(MatSnackBar);
  set botLevel(value: number) {
    this._botLevel = value;
  }

  public getBotLevel(): number {
    return this._botLevel;
  }

  private API_BASE_URL: string = 'http://localhost:8080/onitama';
  private static NEW_BOARD: string[][] = [
    ["r", "r", "R", "r", "r"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["b", "b", "B", "b", "b"]
  ];
  private _loading: boolean = false;
  private _botLevel: number = 1;
  private _gameOver: boolean = false;
  private _onitamaCards: OnitamaMovementCard[] = [];
  private _currentGameState: OnitamaGameState | undefined;
  private _enabledCards: Map<string, boolean> = new Map<string, boolean>();
  private _options: OnitamaOptions = new OnitamaOptions('r');

  constructor(private _http: HttpClient) { }

  public init() {
    for (let card of onitamaCards) {
      this._onitamaCards.push(new OnitamaMovementCard(card.name, card.movesAvailable, card.studentOnlyMoves, card.masterOnlyMoves,
        card.stampColor, card.quote, card.movementBias, card.expansion));
    }
    this._currentGameState = new OnitamaGameState(this.getNewBoard(), 'r', BoardGameScore.UNDETERMINED,
      [this._onitamaCards[0], this._onitamaCards[1]], [this._onitamaCards[2], this._onitamaCards[3]],
      this._onitamaCards[4]);
    this.setEnabledCards();
  }

  public setEnabledCards() {
    for (let card of this._onitamaCards) {
      this._enabledCards.set(card.name, true);
    }
  }

  public isLoading(): boolean {
    return this._loading;
  }

  public resetBoard(): void {

  }

  public getNewBoard(): string[][] {
    let newBoard: string[][] = [];
    for (let i = 0; i < OnitamaService.NEW_BOARD.length; i++) {
      newBoard.push([...OnitamaService.NEW_BOARD[i]]);
    }
    return newBoard;
  }

  public getCurrentBoard(): string[][] {
    return this._currentGameState ? this._currentGameState.getBoard() : OnitamaService.NEW_BOARD;
  }

  public getAllExpansions(): Set<string> {
    let expansionSet = new Set<string>();
    for (let card of this._onitamaCards) {
      expansionSet.add(card.expansion);
    }
    return expansionSet;
  }

  public getExpansionNameForDisplay(expansion: string): string {
    switch (expansion) {
      case 'base':
        return 'Base';
      case 'senseisPath':
        return 'Sensei\'s Path';
      case 'wayOfTheWind':
        return 'Way of the Wind';
      case 'promotional':
        return 'Promotional';
      default:
        return 'Unknown';
    }
  }

  public getAllCardsFromExpansion(expansion: string): OnitamaMovementCard[] {
    return [...this._onitamaCards.filter(card => card.expansion === expansion)];
  }

  public getAllCards(): OnitamaMovementCard[] {
    return [...this._onitamaCards];
  }
}
