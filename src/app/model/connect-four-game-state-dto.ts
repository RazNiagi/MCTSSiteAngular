import {ConnectFourGameState} from './connect-four-game-state';

export class ConnectFourGameStateDto extends ConnectFourGameState {
  public level: number = 1;
  constructor(connectFourGameState: ConnectFourGameState, level: number = 1) {
    super(connectFourGameState.getBoard(), connectFourGameState.getCurrentTurn(), connectFourGameState.getBoardGameScore());
    this.level = level;
  }
}
