import {Component, inject} from '@angular/core';
import {MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-connection-error-snackbar',
  templateUrl: './connection-error-snackbar.component.html',
  styleUrl: './connection-error-snackbar.component.scss'
})
export class ConnectionErrorSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
