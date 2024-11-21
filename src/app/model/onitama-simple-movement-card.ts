import {OnitamaMove} from './onitama-move';

export class OnitamaSimpleMovementCard {
  private name: string;
  private movesAvailable: OnitamaMove[];
  private studentOnlyMoves: OnitamaMove[];
  private masterOnlyMoves: OnitamaMove[];

  constructor(name: string, movesAvailable: OnitamaMove[], studentOnlyMoves: OnitamaMove[], masterOnlyMoves: OnitamaMove[]) {
    this.name = name;
    this.movesAvailable = movesAvailable;
    this.studentOnlyMoves = studentOnlyMoves;
    this.masterOnlyMoves = masterOnlyMoves;
  }
}
