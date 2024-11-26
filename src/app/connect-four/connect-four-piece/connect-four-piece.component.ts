import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-connect-four-piece',
  templateUrl: './connect-four-piece.component.html',
  styleUrl: './connect-four-piece.component.scss'
})
export class ConnectFourPieceComponent {
  @Input() row = 0;
  @Input() col = 0;
  @Input() color = "-";
  @Input() ghost = false;

  getClasses() {
    let stringToReturn = 'piece';
    if (this.color === 'y') {
      stringToReturn += ' yellow';
    }
    if (this.color === 'r') {
      stringToReturn += ' red';
    }
    if (stringToReturn === '-') {
      return stringToReturn;
    }
    if (this.ghost) {
      stringToReturn += ' ghost';
    }
    return stringToReturn;
  }
}
