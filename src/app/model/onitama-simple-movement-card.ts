import {OnitamaMove} from './onitama-move';

export class OnitamaSimpleMovementCard {
  public name: string;
  public movesAvailable: OnitamaMove[];
  public studentOnlyMoves: OnitamaMove[] | undefined;
  public masterOnlyMoves: OnitamaMove[] | undefined;

  constructor(name: string, movesAvailable: OnitamaMove[], studentOnlyMoves: OnitamaMove[] | undefined = undefined, masterOnlyMoves: OnitamaMove[] | undefined = undefined) {
    this.name = name;
    this.movesAvailable = movesAvailable;
    this.studentOnlyMoves = studentOnlyMoves;
    this.masterOnlyMoves = masterOnlyMoves;
  }
}
