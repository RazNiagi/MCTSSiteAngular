import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {WidthHeight} from '../../model/width-height';
import {OnitamaMove} from '../../model/onitama-move';
import {OnitamaMovementBias} from '../../enums/onitama-movement-bias';

@Component({
  selector: 'app-onitama-movement-card-mini-grid',
  templateUrl: './onitama-movement-card-mini-grid.component.html',
  styleUrl: './onitama-movement-card-mini-grid.component.scss'
})
export class OnitamaMovementCardMiniGridComponent implements OnChanges {
  @Input() widthHeight: WidthHeight = new WidthHeight('50px', '50px');
  @Input() listOfMoves: OnitamaMove[] = [new OnitamaMove(1, 1)];
  @Input() movementBias: OnitamaMovementBias = OnitamaMovementBias.NEUTRAL;
  public squaresThatShouldBeHighlighted: OnitamaMove[] = [];
  public numsReverse = [4, 3, 2, 1, 0];
  public nums = [0, 1, 2, 3, 4];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['listOfMoves']) {
      this.squaresThatShouldBeHighlighted = [];
      for (let movement of this.listOfMoves) {
        this.squaresThatShouldBeHighlighted.push(new OnitamaMove(2 + movement.x, 2 + movement.y));
      }
    }

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

  public getClassesForSquare(row: number, col: number, applicableTo: string = ''): string {
    if (row === 2 && col === 2) {
      return 'middle-square';
    }
    if (applicableTo === 'general' && this.squaresThatShouldBeHighlighted.length > 0) {
      for (let coords of this.squaresThatShouldBeHighlighted) {
        if (coords.x === col && coords.y === row) {
          return this.getClassFromMovementBias(this.movementBias);
        }
      }
    }
    return '';
  }
}
