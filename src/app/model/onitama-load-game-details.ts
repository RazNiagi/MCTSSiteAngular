import {OnitamaGameState} from './onitama-game-state';

export class OnitamaLoadGameDetails extends OnitamaGameState {
  public botLevel;
  public playingAs;
  constructor(onitamaGameState: OnitamaGameState, botLevel: number = 1, playingAs: string = 'r') {
    super(onitamaGameState.getBoard(), onitamaGameState.getCurrentTurn(), onitamaGameState.getBoardGameScore(),
      onitamaGameState.bluePlayerMovementCards, onitamaGameState.redPlayerMovementCards, onitamaGameState.middleCard);
    this.botLevel = botLevel;
    this.playingAs = playingAs;
  }
}
