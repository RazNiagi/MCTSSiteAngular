import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuartoRoutingModule} from './quarto-routing.module';
import {QuartoComponent} from './quarto.component';
import {QuartoBoardComponent} from './quarto-board/quarto-board.component';
import {QuartoPieceComponent} from './quarto-piece/quarto-piece.component';
import {QuartoSettingsDialogComponent} from './quarto-settings-dialog/quarto-settings-dialog.component';
import {QuartoService} from './quarto.service';
import {NavBarService} from '../nav-bar/nav-bar.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    QuartoComponent,
    QuartoBoardComponent,
    QuartoPieceComponent,
    QuartoSettingsDialogComponent
  ],
  imports: [
    CommonModule,
    QuartoRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatChipsModule
  ],
  providers: [
    NavBarService,
    QuartoService,
    provideHttpClient(),
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuartoModule { }
