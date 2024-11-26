import {BaseGameState} from './base-game-state';
import {BoardGameScore} from '../enums/board-game-score';

export class ConnectFourGameState extends BaseGameState {
  constructor(board: string[][], currentTurn: string, boardGameScore: BoardGameScore = BoardGameScore.UNDETERMINED) {
    super(board, currentTurn, boardGameScore);
  }

  public switchTurn(): void {
    this.setCurrentTurn(this.getCurrentTurn() === 'r' ? 'y' : 'r');
  }
}
