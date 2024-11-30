import {Component, Input} from '@angular/core';
import {OnitamaService} from '../onitama.service';

@Component({
  selector: 'app-onitama-piece',
  templateUrl: './onitama-piece.component.html',
  styleUrl: './onitama-piece.component.scss'
})
export class OnitamaPieceComponent {
  @Input() piece: string = '-';
  @Input() row: number = -1;
  @Input() col: number = -1;

  public getClassForPiece(piece: string) {
    switch (piece) {
      case 'B':
        return 'piece blue-king';
      case 'b':
        return 'piece blue-pawn';
      case 'R':
        return 'piece red-king';
      case 'r':
        return 'piece red-pawn';
      default:
        return 'piece';
    }
  }

  public getPieceId(): string {
    return `piece-${this.col}-${this.row}`;
  }
}
