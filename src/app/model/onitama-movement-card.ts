import {OnitamaMovementBias} from '../enums/onitama-movement-bias';
import {OnitamaSimpleMovementCard} from './onitama-simple-movement-card';
import {OnitamaMove} from './onitama-move';

export class OnitamaMovementCard extends OnitamaSimpleMovementCard {
  public stampColor: string;
  public quote: string;
  public movementBias: OnitamaMovementBias;
  public expansion: string;

  constructor(name: string, movesAvailable: OnitamaMove[], studentOnlyMoves: OnitamaMove[] | undefined, masterOnlyMoves: OnitamaMove[] | undefined,
               stampColor: string, quote: string, movementBias: OnitamaMovementBias, expansion: string) {
    super(name, movesAvailable, studentOnlyMoves, masterOnlyMoves);
    this.stampColor = stampColor;
    this.quote = quote;
    this.movementBias = movementBias;
    this.expansion = expansion;
  }

  public static copy(other: OnitamaMovementCard): OnitamaMovementCard {
    return new OnitamaMovementCard(other.name, other.movesAvailable, other.studentOnlyMoves, other.masterOnlyMoves,
      other.stampColor, other.quote, other.movementBias, other.expansion);
  }
}
