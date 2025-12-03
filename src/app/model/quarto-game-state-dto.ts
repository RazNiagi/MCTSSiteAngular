import {QuartoGameState} from './quarto-game-state';

export class QuartoGameStateDto {
  gameState: QuartoGameState;
  botLevel: number;

  constructor(gameState: QuartoGameState, botLevel: number) {
    this.gameState = gameState;
    this.botLevel = botLevel;
  }
}
