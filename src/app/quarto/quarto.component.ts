import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {QuartoService} from './quarto.service';
import {QuartoSettingsDialogComponent} from './quarto-settings-dialog/quarto-settings-dialog.component';

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrl: './quarto.component.scss'
})
export class QuartoComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private _quartoService: QuartoService) {}

  public ngOnInit(): void {
    this.resetBoard();
  }

  public isLoading(): boolean {
    return this._quartoService.isLoading();
  }

  public getBotLevel(): number {
    return this._quartoService.getBotLevel();
  }

  public getPlayFirst(): boolean {
    return this._quartoService.getPlayFirst();
  }

  public resetBoard(): void {
    this._quartoService.resetBoard();
  }

  public openSettingsDialog(): void {
    const dialogRef = this.dialog.open(QuartoSettingsDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._quartoService.setOptions(result);
        this.resetBoard();
      }
    });
  }
}
