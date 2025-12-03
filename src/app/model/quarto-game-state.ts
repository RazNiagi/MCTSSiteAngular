import {BaseGameState} from './base-game-state';
import {BoardGameScore} from '../enums/board-game-score';

export class QuartoGameState extends BaseGameState {
  availablePieces: string[];
  selectedPiece: string;

  constructor(board: string[][], currentTurn: string, availablePieces: string[], selectedPiece: string = '', boardGameScore: BoardGameScore = BoardGameScore.UNDETERMINED) {
    super(board, currentTurn, boardGameScore);
    this.availablePieces = availablePieces;
    this.selectedPiece = selectedPiece;
  }

  public switchTurn(): void {
    this.setCurrentTurn(this.getCurrentTurn() === 'r' ? 'b' : 'r');
  }
}
