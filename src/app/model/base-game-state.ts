import {BoardGameScore} from '../enums/board-game-score';

export class BaseGameState {
  private board: string[][];
  private currentTurn: string;
  private boardGameScore: BoardGameScore;

  constructor(board: string[][], currentTurn: string, boardGameScore: BoardGameScore = BoardGameScore.UNDETERMINED) {
    this.board = board;
    this.currentTurn = currentTurn;
    this.boardGameScore = boardGameScore;
  }

  public setCurrentTurn(turn: string): void {
    this.currentTurn = turn;
  }

  public getCurrentTurn(): string {
    return this.currentTurn;
  }

  public setBoard(board: string[][]): void {
    this.board = board;
  }

  public getBoard(): string[][] {
    return this.board;
  }

  public setBoardGameScore(boardGameScore: BoardGameScore): void {
    this.boardGameScore = boardGameScore;
  }

  public getBoardGameScore(): BoardGameScore {
    return this.boardGameScore;
  }
}
