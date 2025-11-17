import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OnitamaGameState} from '../model/onitama-game-state';
// import onitamaCards from './onitama-cards.json';
import {OnitamaMovementCard} from '../model/onitama-movement-card';
import {BoardGameScore} from '../enums/board-game-score';
import {OnitamaOptions} from '../model/onitama-options';
import {OnitamaMove} from '../model/onitama-move';
import {OnitamaGameStateDto} from '../model/onitama-game-state-dto';
import {
  ConnectionErrorSnackbarComponent
} from '../shared/connection-error-snackbar/connection-error-snackbar.component';
import {LevelErrorSnackbarComponent} from '../shared/level-error-snackbar/level-error-snackbar.component';
import {OnitamaMovementBias} from '../enums/onitama-movement-bias';
import {OnitamaCardBoardService} from './onitama-card-board.service';
import {OnitamaLoadGameDetails} from '../model/onitama-load-game-details';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnitamaService {
  get disabledCards(): string[] {
    return this._disabledCards;
  }
  set disabledCards(value: string[]) {
    this._disabledCards = value;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }
  set gameOver(value: boolean) {
    this._gameOver = value;
  }

  get playingCurrentGameAs(): string {
    return this._playingCurrentGameAs;
  }

  get selectedPiece(): OnitamaMove {
    return this._selectedPiece;
  }
  set selectedPiece(value: OnitamaMove) {
    this._selectedPiece = value;
  }

  get selectedMovementCard(): string {
    return this._selectedMovementCard;
  }
  set selectedMovementCard(value: string) {
    this._selectedMovementCard = value;
  }

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

  private API_BASE_URL: string = environment.BASE_URL + '/api/onitama';
  private _loading: boolean = false;
  private _botLevel: number = 1;
  private _gameOver: boolean = false;
  private _currentGameState: OnitamaGameState | undefined;
  private _enabledCards: Map<string, boolean> = new Map<string, boolean>();
  private _options: OnitamaOptions = new OnitamaOptions('r');
  private _selectedMovementCard: string = '';
  private _selectedPiece: OnitamaMove = new OnitamaMove(-1, -1);
  private _playingCurrentGameAs: string = 'r';
  private _previousGameState: OnitamaGameState | undefined;
  // These cards are disabled currently because they are split student and master moves which is not supported in the current implementation
  private _disabledCards: string[] = ["Mejika", "Okija", "Kumo", "Sasori"];

  constructor(private _http: HttpClient, private _onitamaCardBoardService: OnitamaCardBoardService) { }

  public init() {
    this._onitamaCardBoardService.init();
    this.setEnabledCards();
  }

  public setEnabledCards() {
    if (sessionStorage.getItem('onitamaOptions')) {
      this.options = Object.assign(new OnitamaOptions('r'), JSON.parse(<string>sessionStorage.getItem('onitamaOptions'), this.reviver));
      for (let [cardName, enabled] of this.options.enabledCards) {
        this._enabledCards.set(cardName, enabled);
      }
    } else {
      this.resetEnabledCards();
    }
  }

  public saveOptionsToLocalStorage(): void {
    sessionStorage.setItem('onitamaOptions', JSON.stringify(this.options, this.replacer));
  }

  public replacer(key: any, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries())
      };
    } else {
      return value;
    }
  }

  public reviver(key: any, value: any) {
    if (typeof value === 'object' && value !==null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

  public resetEnabledCards(): void {
    for (let card of this._onitamaCardBoardService.onitamaCards) {
      this._enabledCards.set(card.name, !this._disabledCards.includes(card.name));
      this.options.enabledCards.set(card.name, !this._disabledCards.includes(card.name));
    }
    this.saveOptionsToLocalStorage();
  }

  public isLoading(): boolean {
    return this._loading;
  }

  public resetBoard(): void {
    this.setEnabledCards();
    this.setColorPlayingAs();
    this.generateNewBoardFromEnabledCards();
  }

  public generateNewBoardFromEnabledCards(): void {
    let cardsEnabled = this._onitamaCardBoardService.getAllCards();
    for (let [cardName, enabled] of this._enabledCards) {
      if (!enabled) {
        cardsEnabled.splice(cardsEnabled.findIndex(card => card.name === cardName), 1);
      }
    }
    if (cardsEnabled.length < 5) {
      this._snackbar.open('Not enough cards enabled to start the game', 'Ok', {
        duration: 3000
      });
      return;
    }
    this.shuffleArray(cardsEnabled);
    let middleCard: OnitamaMovementCard = cardsEnabled[0];
    cardsEnabled.shift();
    let redPlayerCards: OnitamaMovementCard[] = [];
    redPlayerCards.push(cardsEnabled[0]);
    cardsEnabled.shift();
    redPlayerCards.push(cardsEnabled[0]);
    cardsEnabled.shift();
    let bluePlayerCards: OnitamaMovementCard[] = [];
    bluePlayerCards.push(cardsEnabled[0]);
    cardsEnabled.shift();
    bluePlayerCards.push(cardsEnabled[0]);
    cardsEnabled.shift();
    let newBoard: string[][] = this._onitamaCardBoardService.getNewBoard();
    if (this.playingCurrentGameAs === 'b') {
      newBoard = this._onitamaCardBoardService.rotateBoard(newBoard);
    }
    this._currentGameState = new OnitamaGameState(newBoard, middleCard.stampColor, BoardGameScore.UNDETERMINED,
      bluePlayerCards, redPlayerCards, middleCard);
    this._gameOver = false;
    if (this.playingCurrentGameAs !== this.getCurrentTurn()) {
      this._currentGameState.setBoard(this._onitamaCardBoardService.rotateBoard(this.getCurrentBoard()));
      this.retrieveMove();
    }
  }

  public loadNewBoard(loadGameDetails: OnitamaLoadGameDetails): void {
    this._currentGameState = new OnitamaGameState(loadGameDetails.getBoard(), loadGameDetails.getCurrentTurn(), loadGameDetails.getBoardGameScore(),
      loadGameDetails.bluePlayerMovementCards, loadGameDetails.redPlayerMovementCards, loadGameDetails.middleCard);
    this._playingCurrentGameAs = loadGameDetails.playingAs;
    this._botLevel = loadGameDetails.botLevel;
    this._gameOver = false;
    if (this.playingCurrentGameAs !== this.getCurrentTurn()) {
      this.retrieveMove();
    }
  }

  public shuffleArray(array: any[]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public getCurrentBoard(): string[][] {
    return this._currentGameState ? this._currentGameState.getBoard() : OnitamaCardBoardService.NEW_BOARD;
  }

  public getCurrentTurn(): string {
    return this._currentGameState ? this._currentGameState.getCurrentTurn() : 'r';
  }

  public setColorPlayingAs(): void {
    this._playingCurrentGameAs = this._options.playAsColor;
  }

  public getPlayerMovementCards(): OnitamaMovementCard[] {
    if (this._currentGameState) {
      if (this._playingCurrentGameAs === 'r') {
        return this._currentGameState.redPlayerMovementCards;
      } else {
        return this._currentGameState.bluePlayerMovementCards;
      }
    }
    return this._onitamaCardBoardService.defaultMovementCardsPlayer;
  }

  public getOpponentMovementCards(): OnitamaMovementCard[] {
    if (this._currentGameState) {
      if (this._playingCurrentGameAs === 'b') {
        return this._currentGameState.redPlayerMovementCards;
      } else {
        return this._currentGameState.bluePlayerMovementCards;
      }
    }
    return this._onitamaCardBoardService.defaultMovementCardsOpponent;
  }

  public getMiddleMovementCard(): OnitamaMovementCard {
    if (this._currentGameState) {
      return this._currentGameState.middleCard;
    }
    return this._onitamaCardBoardService.defaultMovementCardMiddle;
  }

  public makeMove(row: number, col: number): void {
    if (!this._currentGameState) {
      return;
    }
    this._loading = true;
    let previousBlueCards: OnitamaMovementCard[] = [OnitamaMovementCard.copy(this._currentGameState.bluePlayerMovementCards[0]),
      OnitamaMovementCard.copy(this._currentGameState.bluePlayerMovementCards[1])];
    let previousRedCards: OnitamaMovementCard[] = [OnitamaMovementCard.copy(this._currentGameState.redPlayerMovementCards[0]),
      OnitamaMovementCard.copy(this._currentGameState.redPlayerMovementCards[1])];
    this._previousGameState = new OnitamaGameState(this._onitamaCardBoardService.copyBoard(this._currentGameState.getBoard()),
      this._currentGameState.getCurrentTurn(),
      this._currentGameState.getBoardGameScore(),
      previousBlueCards,
      previousRedCards,
      OnitamaMovementCard.copy(this._currentGameState.middleCard));
    this._currentGameState.switchTurn();
    this.getCurrentBoard()[row][col] = this.getCurrentBoard()[this.selectedPiece.x][this.selectedPiece.y];
    this.getCurrentBoard()[this.selectedPiece.x][this.selectedPiece.y] = '-';
    this.selectedPiece = new OnitamaMove(-1, -1);
    this.swapMiddleCard(this._selectedMovementCard);
    this._selectedMovementCard = '';
    this._currentGameState.setBoard(this._onitamaCardBoardService.rotateBoard(this._currentGameState.getBoard()));
    this._currentGameState.setBoardGameScore(this._onitamaCardBoardService.checkBoardForWins(this._currentGameState.getBoard(),
      this.playingCurrentGameAs, this.getCurrentTurn()));
    if (this._currentGameState.getBoardGameScore() !== BoardGameScore.UNDETERMINED) {
      this.popSnackbarIfApplicable();
      this._gameOver = true;
      this._loading = false;
      return;
    }
    this.retrieveMove();
  }

  public retrieveMove(): void {
    this._loading = true;
    if (!this._currentGameState) {
      return;
    }
    let gameStateDTO: OnitamaGameStateDto = new OnitamaGameStateDto(this._currentGameState, this._botLevel);
    this._http.post<OnitamaGameState>(this.API_BASE_URL + '/make-move', gameStateDTO).subscribe(
      {
        next: data => {
          if (this._currentGameState) {
            this._currentGameState = Object.assign(this._currentGameState, data);
            this.fixMovementBiases();
            if (this._currentGameState.getBoardGameScore() !== BoardGameScore.UNDETERMINED) {
              this.popSnackbarIfApplicable();
              this._gameOver = true;
            }
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
          if (error.status === 400) {
            if (error.error === 'Level must be between 1 and 10') {
              this._snackbar.openFromComponent(LevelErrorSnackbarComponent, {
                duration: 3000
              });
            }
          }
          if (this._previousGameState) {
            this._currentGameState = this._previousGameState;
          }
          this._loading = false;
        }
      }
    )
  }

  public fixMovementBiases(): void {
    if (!this._currentGameState) {
      return;
    }
    for (let card of this._currentGameState?.redPlayerMovementCards) {
      this.fixMovementBias(card);
    }
    for (let card of this._currentGameState?.bluePlayerMovementCards) {
      this.fixMovementBias(card);
    }
    this.fixMovementBias(this._currentGameState.middleCard);
  }

  public fixMovementBias(card: OnitamaMovementCard): void {
    // @ts-ignore
    if (card.movementBias === 'LEFT') {
      card.movementBias = OnitamaMovementBias.LEFT;
    } else { // @ts-ignore
      if (card.movementBias === 'RIGHT') {
            card.movementBias = OnitamaMovementBias.RIGHT;
          } else {
            card.movementBias = OnitamaMovementBias.NEUTRAL;
          }
    }
  }

  public swapMiddleCard(name: string): void {
    if (!this._currentGameState) {
      return;
    }
    if (this._playingCurrentGameAs === 'r') {
      let replacementIndex: number = this._currentGameState.redPlayerMovementCards.findIndex(card => card.name === name);
      if (replacementIndex !== -1) {
        this._currentGameState.redPlayerMovementCards.push(this._currentGameState.middleCard);
        this._currentGameState.middleCard = this._currentGameState.redPlayerMovementCards[replacementIndex];
        this._currentGameState.redPlayerMovementCards.splice(replacementIndex, 1);
      }
    } else {
      let replacementIndex: number = this._currentGameState.bluePlayerMovementCards.findIndex(card => card.name === name);
      if (replacementIndex !== -1) {
        this._currentGameState.bluePlayerMovementCards.push(this._currentGameState.middleCard);
        this._currentGameState.middleCard = this._currentGameState.bluePlayerMovementCards[replacementIndex];
        this._currentGameState.bluePlayerMovementCards.splice(replacementIndex, 1);
      }
    }
  }

  public popSnackbarIfApplicable(): void {
    if (!this._currentGameState) {
      return;
    }
    switch (this._currentGameState.getBoardGameScore()) {
      case BoardGameScore.RED_WIN:
        this._snackbar.open('Red wins!', 'Ok', {
          duration: 3000
        })
        break;
      case BoardGameScore.BLUE_WIN:
        this._snackbar.open('Blue wins!', 'Ok', {
          duration: 3000
        })
        break;
      case BoardGameScore.UNDETERMINED:
      default:
        break;
    }
  }
}
