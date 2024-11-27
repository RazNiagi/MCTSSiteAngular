import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConnectionErrorSnackbarComponent} from './connection-error-snackbar/connection-error-snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LevelErrorSnackbarComponent} from './level-error-snackbar/level-error-snackbar.component';



@NgModule({
  declarations: [ConnectionErrorSnackbarComponent,
    LevelErrorSnackbarComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
