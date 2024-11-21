import {OnitamaMovementBias} from '../enums/onitama-movement-bias';
import {OnitamaSimpleMovementCard} from './onitama-simple-movement-card';
import {OnitamaMove} from './onitama-move';

export class OnitamaMovementCard extends OnitamaSimpleMovementCard {
  private stampColor: string;
  private quote: string;
  private movementBias: OnitamaMovementBias;
  private expansion: string;

  constructor(name: string, movesAvailable: OnitamaMove[], studentOnlyMoves: OnitamaMove[], masterOnlyMoves: OnitamaMove[],
               stampColor: string, quote: string, movementBias: OnitamaMovementBias, expansion: string) {
    super(name, movesAvailable, studentOnlyMoves, masterOnlyMoves);
    this.stampColor = stampColor;
    this.quote = quote;
    this.movementBias = movementBias;
    this.expansion = expansion;
  }
}
