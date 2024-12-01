import {BaseGameState} from './base-game-state';
import {BoardGameScore} from '../enums/board-game-score';
import {OnitamaMovementCard} from './onitama-movement-card';

export class OnitamaGameState extends BaseGameState {
  public bluePlayerMovementCards: OnitamaMovementCard[];
  public redPlayerMovementCards: OnitamaMovementCard[];
  public middleCard: OnitamaMovementCard;

  public switchTurn(): void {
    this.setCurrentTurn(this.getCurrentTurn() === 'r' ? 'b' : 'r');
  }

  constructor(board: string[][], currentTurn: string, boardGameScore: BoardGameScore = BoardGameScore.UNDETERMINED,
              bluePlayerMovementCards: OnitamaMovementCard[] = [], redPlayerMovementCards: OnitamaMovementCard[] = [], middleCard: OnitamaMovementCard) {
    super(board, currentTurn, boardGameScore);
    this.bluePlayerMovementCards = bluePlayerMovementCards;
    this.redPlayerMovementCards = redPlayerMovementCards;
    this.middleCard = middleCard;
  }
}
