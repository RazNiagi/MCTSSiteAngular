import {Component, inject} from '@angular/core';
import {MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-level-error-snackbar',
  templateUrl: './level-error-snackbar.component.html',
  styleUrl: './level-error-snackbar.component.scss'
})
export class LevelErrorSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
