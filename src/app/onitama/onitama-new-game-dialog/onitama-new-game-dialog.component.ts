import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {WidthHeight} from '../../model/width-height';
import {OnitamaCardBoardService} from '../onitama-card-board.service';
import {OnitamaLoadGameDetails} from '../../model/onitama-load-game-details';
import {OnitamaGameState} from '../../model/onitama-game-state';
import {BoardGameScore} from '../../enums/board-game-score';
import {OnitamaMovementCard} from '../../model/onitama-movement-card';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-onitama-new-game-dialog',
  templateUrl: './onitama-new-game-dialog.component.html',
  styleUrl: './onitama-new-game-dialog.component.scss'
})
export class OnitamaNewGameDialogComponent implements OnInit {
  public botLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public botLevel: number = 1;
  public newGameOrLoadPosition: string = 'newGame';
  public playAs: string = 'r';
  public currentTurn: string = 'r';
  public editorBoardWidthHeight: WidthHeight = new WidthHeight('300px', '300px');
  public cardNameList: string[] = [];
  public selectedCards: string[] = [];
  public playerCards: string[] = ['Tiger', 'Crab'];
  public opponentCards: string[] = ['Monkey', 'Crane'];
  public middleCard: string = 'Dragon';
  readonly dialogRef = inject(MatDialogRef<OnitamaNewGameDialogComponent>);
  private _snackbar = inject(MatSnackBar);
  public currentBoard: string[][] = [
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"]
  ];

  constructor(private _onitamaCardBoardService: OnitamaCardBoardService) {
  }

  public ngOnInit() {
    this.cardNameList = this._onitamaCardBoardService.getAllCards().map(card => card.name).sort();
    this.updateSelectedCards();
  }

  public onCancelClick(): void {
    this.dialogRef.close()
  }

  public onPlayClick(): void {
    if (this.newGameOrLoadPosition === 'newGame') {
      this.dialogRef.close(this.botLevel);
    } else {
      const shouldClose: boolean = this.alertIfBoardIsSolved();
      if (shouldClose) {
        this.dialogRef.close(new OnitamaLoadGameDetails(this.buildGameState(), this.botLevel, this.playAs));
      }
    }
  }

  public alertIfBoardIsSolved(): boolean {
    let score: BoardGameScore = this._onitamaCardBoardService.checkBoardForWins(this.currentBoard, this.playAs, this.currentTurn);
    switch (score) {
      case BoardGameScore.INVALID_BOARD:
        this._snackbar.open('The board provided is currently invalid.', 'Ok', {
          duration: 3000
        });
        return false;
      case BoardGameScore.BLUE_WIN:
        this._snackbar.open('The board is already solved. Blue wins.', 'Ok', {
          duration: 3000
        });
        return false;
      case BoardGameScore.RED_WIN:
        this._snackbar.open('The board is already solved. Red wins.', 'Ok', {
          duration: 3000
        });
        return false;
      case BoardGameScore.UNDETERMINED:
      default:
        return true;
    }
  }

  public buildGameState(): OnitamaGameState {
    let playerCards: OnitamaMovementCard[] = [];
    for (let card of this.playerCards) {
      let moveCard: OnitamaMovementCard | undefined = this._onitamaCardBoardService.getCardFromName(card);
      if (moveCard) {
        playerCards.push(moveCard);
      }
    }
    let opponentCards: OnitamaMovementCard[] = [];
    for (let card of this.opponentCards) {
      let moveCard: OnitamaMovementCard | undefined = this._onitamaCardBoardService.getCardFromName(card);
      if (moveCard) {
        opponentCards.push(moveCard);
      }
    }
    let middleCard: OnitamaMovementCard = this._onitamaCardBoardService.getCardFromName(this.middleCard)
      || this._onitamaCardBoardService.getAllCards()[0];
    if (this.playAs === 'r') {
      return new OnitamaGameState(this.currentBoard, this.currentTurn, BoardGameScore.UNDETERMINED,
        opponentCards, playerCards, middleCard);
    } else {
      return new OnitamaGameState(this.currentBoard, this.currentTurn, BoardGameScore.UNDETERMINED,
        playerCards, opponentCards, middleCard);
    }
  }

  public shouldShowControlsForLoadingPosition() {
    return this.newGameOrLoadPosition === 'loadPosition';
  }

  public getAllUnselectedCards(): string[] {
    return this.cardNameList.filter(card => !this.selectedCards.includes(card));
  }

  public onResize(): void {
    console.log('resized')
  }

  public updateSelectedCards(): void {
    let slCards: string[] = [];
    slCards.push(...this.playerCards);
    slCards.push(...this.opponentCards);
    slCards.push(this.middleCard);
    this.selectedCards = slCards;
  }

  public setCurrentBoard(board: string[][]): void {
    this.currentBoard = board;
  }
}
