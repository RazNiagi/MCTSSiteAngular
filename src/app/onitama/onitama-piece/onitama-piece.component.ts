import {Component, Input} from '@angular/core';
import {WidthHeight} from '../../model/width-height';

@Component({
  selector: 'app-onitama-piece',
  templateUrl: './onitama-piece.component.html',
  styleUrl: './onitama-piece.component.scss'
})
export class OnitamaPieceComponent {
  @Input() piece: string = '-';
  @Input() row: number = -1;
  @Input() col: number = -1;
  @Input() widthHeight: WidthHeight = new WidthHeight('100px', '100px');
  @Input() selected: boolean = false;

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

  public getClassForSelected(): string {
    return this.selected ? 'selected' : '';
  }

  public getAllClasses() {
    let classes: string[] = [];
    let pieceClass: string = this.getClassForPiece(this.piece);
    if (pieceClass) {
      classes.push(pieceClass);
    }
    let selectedClass: string = this.getClassForSelected();
    if (selectedClass)
    {
      classes.push(selectedClass);
    }
    return classes.join(' ');

  }
}
