import {BaseGameState} from './base-game-state';
import {BoardGameScore} from '../enums/board-game-score';

export class OnitamaSimpleGameState extends BaseGameState {
  private bluePlayerMovementCards: string[];
  private redPlayerMovementCards: string[];
  private middleCard: string;
  private boardString: string;

  constructor(board: string[][], currentTurn: string, boardGameScore: BoardGameScore = BoardGameScore.UNDETERMINED,
              bluePlayerMovementCards: string[] = [], redPlayerMovementCards: string[] = [], middleCard: string = '',
              boardString: string = '') {
    super(board, currentTurn, boardGameScore);
    this.bluePlayerMovementCards = bluePlayerMovementCards;
    this.redPlayerMovementCards = redPlayerMovementCards;
    this.middleCard = middleCard;
    this.boardString = boardString;
  }
}
