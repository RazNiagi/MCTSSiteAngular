import {Component, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-connect-four-new-game-dialog',
  templateUrl: './connect-four-new-game-dialog.component.html',
  styleUrl: './connect-four-new-game-dialog.component.scss',
})
export class ConnectFourNewGameDialogComponent {
  public botLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public botLevel: number = 1;
  readonly dialogRef = inject(MatDialogRef<ConnectFourNewGameDialogComponent>);

  public onCancelClick(): void {
    this.dialogRef.close()
  }

  public onPlayClick(): void {
    this.dialogRef.close(this.botLevel);
  }
}
