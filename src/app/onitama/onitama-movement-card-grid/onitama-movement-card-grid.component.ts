import {Component, Input, OnInit} from '@angular/core';
import {OnitamaMovementCard} from '../../model/onitama-movement-card';
import {OnitamaMove} from '../../model/onitama-move';
import {OnitamaMovementBias} from '../../enums/onitama-movement-bias';

@Component({
  selector: 'app-onitama-movement-card-grid',
  templateUrl: './onitama-movement-card-grid.component.html',
  styleUrl: './onitama-movement-card-grid.component.scss'
})
export class OnitamaMovementCardGridComponent implements OnInit {
  @Input() movementCard: OnitamaMovementCard | undefined;
  public squaresThatShouldBeHighlighted: OnitamaMove[] = [];
  public squaresThatShouldBeHighlightedStudent: OnitamaMove[] = [];
  public squaresThatShouldBeHighlightedMaster: OnitamaMove[] = [];
  public numsReverse = [4, 3, 2, 1, 0];
  public nums = [0, 1, 2, 3, 4];

  ngOnInit() {
    if (this.movementCard?.movesAvailable) {
      for (let movement of this.movementCard?.movesAvailable) {
        this.squaresThatShouldBeHighlighted.push(new OnitamaMove(2 + movement.x, 2 + movement.y));
      }
    }
    if (this.movementCard?.studentOnlyMoves && this.movementCard.studentOnlyMoves.length > 0) {
      for (let movement of this.movementCard.studentOnlyMoves) {
        this.squaresThatShouldBeHighlightedStudent.push(new OnitamaMove(2 + movement.x, 2 + movement.y));
      }
    }
    if (this.movementCard?.masterOnlyMoves && this.movementCard.masterOnlyMoves.length > 0) {
      for (let movement of this.movementCard.masterOnlyMoves) {
        this.squaresThatShouldBeHighlightedMaster.push(new OnitamaMove(2 + movement.x, 2 + movement.y));
      }
    }
  }

  public getClassesForSquare(row: number, col: number, applicableTo: string = ''): string {
    if(this.movementCard?.movementBias === undefined) {
      return '';
    }
    if (row === 2 && col === 2) {
      return 'middle-square';
    }
    if (applicableTo === 'general' && this.squaresThatShouldBeHighlighted.length > 0) {
      for (let coords of this.squaresThatShouldBeHighlighted) {
        if (coords.x === col && coords.y === row) {
          return this.getClassFromMovementBias(this.movementCard?.movementBias || OnitamaMovementBias.NEUTRAL);
        }
      }
    } else {
      if (applicableTo === 'master' && this.squaresThatShouldBeHighlightedMaster.length > 0) {
        for (let coords of this.squaresThatShouldBeHighlightedMaster) {
          if (coords.x === col && coords.y === row) {
            return this.getClassFromMovementBias(this.movementCard?.movementBias || OnitamaMovementBias.NEUTRAL);
          }
        }
      }
      if (applicableTo === 'student' && this.squaresThatShouldBeHighlightedStudent.length > 0) {
        for (let coords of this.squaresThatShouldBeHighlightedStudent) {
          if (coords.x === col && coords.y === row) {
            return this.getClassFromMovementBias(this.movementCard?.movementBias || OnitamaMovementBias.NEUTRAL);
          }
        }
      }
    }
    return '';
  }

  public getClassFromMovementBias(movementBias: OnitamaMovementBias): string {
    if (movementBias === OnitamaMovementBias.LEFT) {
      return 'left-bias-movement-square';
    }
    if (movementBias === OnitamaMovementBias.RIGHT) {
      return 'right-bias-movement-square';
    }
    return 'neutral-bias-movement-square';
  }

  public getLetterForMiddleSquare(row: number, col: number, applicableTo: string): string {
    if (row === 2 && col === 2) {
      return applicableTo === 'student' ? 'S' : 'M';
    }
    return '';
  }

  doesCardHaveStudentMasterMoves() {
    if (this.movementCard?.studentOnlyMoves && this.movementCard.studentOnlyMoves.length > 0) {
      return {
        height: '287px'
      }
    }
    return {
      height: '135px'
    };
  }

  getStyleForHeightTbody() {
    if (this.movementCard?.studentOnlyMoves && this.movementCard.studentOnlyMoves.length > 0) {
      return {
        height: '258.3px'
      }
    }
    return {
      height: '120.5px'
    };
  }
}
