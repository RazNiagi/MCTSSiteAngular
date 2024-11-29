import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConnectionErrorSnackbarComponent} from './connection-error-snackbar/connection-error-snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LevelErrorSnackbarComponent} from './level-error-snackbar/level-error-snackbar.component';
import {NewGameDialogComponent} from './new-game-dialog/new-game-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [ConnectionErrorSnackbarComponent,
    LevelErrorSnackbarComponent,
    NewGameDialogComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule
  ]
})
export class SharedModule { }
