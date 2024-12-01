import {OnitamaGameState} from './onitama-game-state';

export class OnitamaGameStateDto extends OnitamaGameState {
  public level: number = 1;
  constructor(onitamaGameState: OnitamaGameState, level: number) {
    super(onitamaGameState.getBoard(), onitamaGameState.getCurrentTurn(), onitamaGameState.getBoardGameScore(),
      onitamaGameState.bluePlayerMovementCards, onitamaGameState.redPlayerMovementCards, onitamaGameState.middleCard)
    this.level = level;
  }
}
