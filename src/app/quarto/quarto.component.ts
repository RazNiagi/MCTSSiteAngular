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
    // Start game automatically with default settings on first load
    this._quartoService.resetBoard();
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

  public getAdvancedMode(): boolean {
    return this._quartoService.getAdvancedMode();
  }

  public resetBoard(): void {
    this.openNewGameDialog();
  }

  public openNewGameDialog(): void {
    const dialogRef = this.dialog.open(QuartoSettingsDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._quartoService.setOptions(result);
        this._quartoService.resetBoard();
      }
    });
  }
}
