import {BaseGameState} from './base-game-state';
import {BoardGameScore} from '../enums/board-game-score';

export class QuartoGameState extends BaseGameState {
  availablePieces: string[];
  selectedPiece: string;
  advancedMode: boolean = false;
  playerPlayingFirst: boolean = false;


  constructor(board: string[][], currentTurn: string, availablePieces: string[], advancedMode: boolean, playerPlayingFirst: boolean, selectedPiece: string = '', boardGameScore: BoardGameScore = BoardGameScore.UNDETERMINED) {
    super(board, currentTurn, boardGameScore);
    this.availablePieces = availablePieces;
    this.selectedPiece = selectedPiece;
    this.advancedMode = advancedMode;
    this.playerPlayingFirst = playerPlayingFirst;
  }

  public switchTurn(): void {
    this.setCurrentTurn(this.getCurrentTurn() === '1' ? '2' : '1');
  }
}
