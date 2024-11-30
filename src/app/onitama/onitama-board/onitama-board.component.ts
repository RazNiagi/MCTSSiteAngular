import { Component } from '@angular/core';
import {OnitamaService} from '../onitama.service';

@Component({
  selector: 'app-onitama-board',
  templateUrl: './onitama-board.component.html',
  styleUrl: './onitama-board.component.scss'
})
export class OnitamaBoardComponent {
  public range5: number[] = [0, 1, 2, 3, 4];
  public reverseRange5: number[] = [4, 3, 2, 1, 0];

  constructor(private _onitamaService: OnitamaService) {
  }

  public getCurrentBoard(): string[][] {
    return this._onitamaService.getCurrentBoard();
  }
}
