import { Injectable } from '@angular/core';
import onitamaCards from './onitama-cards.json';
import {OnitamaMovementCard} from '../model/onitama-movement-card';
import {BoardGameScore} from '../enums/board-game-score';

@Injectable({
  providedIn: 'root'
})
export class OnitamaCardBoardService {
  get defaultMovementCardMiddle(): OnitamaMovementCard {
    return this._defaultMovementCardMiddle;
  }

  get defaultMovementCardsOpponent(): OnitamaMovementCard[] {
    return this._defaultMovementCardsOpponent;
  }

  get defaultMovementCardsPlayer(): OnitamaMovementCard[] {
    return this._defaultMovementCardsPlayer;
  }

  get onitamaCards(): OnitamaMovementCard[] {
    return this._onitamaCards;
  }

  public static NEW_BOARD: string[][] = [
    ["r", "r", "R", "r", "r"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["b", "b", "B", "b", "b"]
  ];
  private _onitamaCards: OnitamaMovementCard[] = [];
  private _defaultMovementCardsPlayer: OnitamaMovementCard[] = [];
  private _defaultMovementCardsOpponent: OnitamaMovementCard[] = [];
  private _defaultMovementCardMiddle: OnitamaMovementCard = new OnitamaMovementCard(onitamaCards[4].name, onitamaCards[4].movesAvailable,
    onitamaCards[4].studentOnlyMoves, onitamaCards[4].masterOnlyMoves,
    onitamaCards[4].stampColor, onitamaCards[4].quote,
    onitamaCards[4].movementBias, onitamaCards[4].expansion);

  constructor() { }

  public copyBoard(board: string[][]): string[][] {
    let newBoard: string[][] = [];
    for (let i = 0; i < board.length; i++) {
      newBoard.push([...board[i]]);
    }
    return newBoard;
  }

  public rotateBoard(board: string[][]): string[][] {
    let newBoard: string[][] = [];
    for (let i = 0; i < board.length; i++) {
      newBoard.push([...board[4-i].reverse()]);
    }
    return newBoard;
  }

  public getNewBoard(): string[][] {
    return this.copyBoard(OnitamaCardBoardService.NEW_BOARD);
  }

  public init(): void {
    for (let card of onitamaCards) {
      this._onitamaCards.push(new OnitamaMovementCard(card.name, card.movesAvailable, card.studentOnlyMoves, card.masterOnlyMoves,
        card.stampColor, card.quote, card.movementBias, card.expansion));
    }
  }

  public getAllExpansions(): Set<string> {
    let expansionSet = new Set<string>();
    for (let card of this._onitamaCards) {
      expansionSet.add(card.expansion);
    }
    return expansionSet;
  }

  public getAllCardsFromExpansion(expansion: string): OnitamaMovementCard[] {
    return [...this._onitamaCards.filter(card => card.expansion === expansion)];
  }

  public getAllCards(): OnitamaMovementCard[] {
    return [...this._onitamaCards];
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

  public getCardFromName(name: string): OnitamaMovementCard | undefined {
    return [...this._onitamaCards].find(card => card.name === name);
  }

  public checkBoardForWins(board: string[][], playingAs: string, currentTurn: string): BoardGameScore {
    if (!board) {
      return BoardGameScore.INVALID_BOARD;
    }
    let redMasterOnBoard: boolean = false;
    let blueMasterOnBoard: boolean = false;
    for (let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'R') {
          redMasterOnBoard = true;
        }
        if (board[i][j] === 'B') {
          blueMasterOnBoard = true;
        }
      }
    }
    if (!redMasterOnBoard && !blueMasterOnBoard) {
      return BoardGameScore.INVALID_BOARD;
    }
    if (!redMasterOnBoard && blueMasterOnBoard) {
      return BoardGameScore.BLUE_WIN;
    }
    if (redMasterOnBoard && !blueMasterOnBoard) {
      return BoardGameScore.RED_WIN;
    }
    if (playingAs !== currentTurn) {
      if (playingAs.toUpperCase() === board[0][2]) {
        return playingAs === 'r' ? BoardGameScore.RED_WIN : BoardGameScore.BLUE_WIN;
      }
      if (playingAs === 'r' && board[4][2] === 'B') {
        return BoardGameScore.BLUE_WIN;
      }
      if (playingAs === 'b' && board[4][2] === 'R') {
        return BoardGameScore.RED_WIN;
      }
    } else {
      if (playingAs.toUpperCase() === board[4][2]) {
        return playingAs === 'r' ? BoardGameScore.RED_WIN : BoardGameScore.BLUE_WIN;
      }
      if (playingAs === 'b' && board[4][2] === 'B') {
        return BoardGameScore.BLUE_WIN;
      }
      if (playingAs === 'r' && board[4][2] === 'R') {
        return BoardGameScore.RED_WIN;
      }
    }
    return BoardGameScore.UNDETERMINED;
  }
}
