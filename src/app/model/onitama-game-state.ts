import {OnitamaSimpleMovementCard} from './onitama-simple-movement-card';
import {BaseGameState} from './base-game-state';
import {BoardGameScore} from '../enums/board-game-score';

export class OnitamaGameState extends BaseGameState {
  private bluePlayerMovementCards: OnitamaSimpleMovementCard[];
  private redPlayerMovementCards: OnitamaSimpleMovementCard[];
  private middleCard: OnitamaSimpleMovementCard;

  constructor(board: string[][], currentTurn: string, boardGameScore: BoardGameScore = BoardGameScore.UNDETERMINED,
              bluePlayerMovementCards: OnitamaSimpleMovementCard[] = [], redPlayerMovementCards: OnitamaSimpleMovementCard[] = [], middleCard: OnitamaSimpleMovementCard) {
    super(board, currentTurn, boardGameScore);
    this.bluePlayerMovementCards = bluePlayerMovementCards;
    this.redPlayerMovementCards = redPlayerMovementCards;
    this.middleCard = middleCard;
  }
}
