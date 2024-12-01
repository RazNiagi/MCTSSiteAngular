import {Component, Input} from '@angular/core';
import {OnitamaMovementCard} from '../../model/onitama-movement-card';
import {OnitamaMovementBias} from '../../enums/onitama-movement-bias';
import {WidthHeight} from '../../model/width-height';

@Component({
  selector: 'app-onitama-movement-card',
  templateUrl: './onitama-movement-card.component.html',
  styleUrl: './onitama-movement-card.component.scss'
})
export class OnitamaMovementCardComponent {
  @Input() movementCard: OnitamaMovementCard = new OnitamaMovementCard('def', [], undefined, undefined, 'r', 'quote', OnitamaMovementBias.NEUTRAL, 'def');
  @Input() selected: boolean = false;
  @Input() widthHeight: WidthHeight = new WidthHeight('160px', '90px');

  public getMovementCardSelectedClass(): string {
    return this.selected ? 'selected' : '';
  }

  public getUniqueId(): string {
    return this.movementCard.name.toLowerCase().split(' ').join('-') + '-container';
  }

  public getWidthHeightForMiniGrid(): WidthHeight {
    let el = document.getElementById(this.getUniqueId());
    if (el !== null) {
      let height = el.offsetHeight;
      let width = el.offsetWidth - 24;
      let squareNum = Math.min(width, height);
      let squareParam = squareNum * .95 + 'px';
      return new WidthHeight(squareParam, squareParam);
    }
    return new WidthHeight('50px', '50px');
  }

  public shouldDisplayQuote(): boolean {
    return parseInt(this.widthHeight.width) > 271;
  }

  public getHeightDependingOnQuoteDisplay() {
    if (!this.shouldDisplayQuote()) {
      return {height: '100%'};
    }
    return {height: '70%'};
  }

  public getStampColor(): string {
    return this.movementCard.stampColor === 'b' ? 'blue' : 'red';
  }
}
