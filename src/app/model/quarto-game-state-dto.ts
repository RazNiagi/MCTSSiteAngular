import {QuartoGameState} from './quarto-game-state';
import {BoardGameScore} from '../enums/board-game-score';

export class QuartoGameStateDto {
  board: string[][];
  currentTurn: string;
  boardGameScore: BoardGameScore;
  level: number;
  availablePieces: string[];
  selectedPiece: string;

  constructor(gameState: QuartoGameState, botLevel: number) {
    this.board = gameState.getBoard();
    this.currentTurn = gameState.getCurrentTurn();
    this.boardGameScore = gameState.getBoardGameScore();
    this.level = botLevel;
    this.availablePieces = gameState.availablePieces;
    this.selectedPiece = gameState.selectedPiece;
  }
}
