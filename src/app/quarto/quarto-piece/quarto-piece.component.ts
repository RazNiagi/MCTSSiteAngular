import {Component, Input} from '@angular/core';
import {QuartoService} from '../quarto.service';

@Component({
  selector: 'app-quarto-piece',
  templateUrl: './quarto-piece.component.html',
  styleUrl: './quarto-piece.component.scss'
})
export class QuartoPieceComponent {
  @Input() piece: string = '-';
  @Input() clickable: boolean = false;

  constructor(private _quartoService: QuartoService) {}

  public getPieceAttributes() {
    return this._quartoService.getPieceAttributes(this.piece);
  }

  public isEmpty(): boolean {
    return this.piece === '-';
  }
}
