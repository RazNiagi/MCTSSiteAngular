import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {QuartoOptions} from '../../model/quarto-options';
import {QuartoService} from '../quarto.service';

@Component({
  selector: 'app-quarto-settings-dialog',
  templateUrl: './quarto-settings-dialog.component.html',
  styleUrl: './quarto-settings-dialog.component.scss',
})
export class QuartoSettingsDialogComponent implements OnInit {
  public options: QuartoOptions = new QuartoOptions();
  public botLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  readonly dialogRef = inject(MatDialogRef<QuartoSettingsDialogComponent>);

  constructor(private _quartoService: QuartoService) {}

  public ngOnInit(): void {
    this.options = Object.assign(new QuartoOptions(), this._quartoService.getOptions());
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onPlayClick(): void {
    this.dialogRef.close(this.options);
  }
}
