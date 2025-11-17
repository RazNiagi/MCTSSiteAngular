import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { OnitamaRoutingModule } from './onitama-routing.module';
import {OnitamaComponent} from './onitama.component';
import {NavBarService} from "../nav-bar/nav-bar.service";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {provideHttpClient} from "@angular/common/http";
import {OnitamaService} from "./onitama.service";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {OnitamaMovementCardGridComponent} from "./onitama-movement-card-grid/onitama-movement-card-grid.component";
import {ReversePipe} from "../reverse.pipe";
import {OnitamaBoardComponent} from './onitama-board/onitama-board.component';
import {OnitamaMovementCardComponent} from './onitama-movement-card/onitama-movement-card.component';
import {OnitamaPieceComponent} from './onitama-piece/onitama-piece.component';
import {OnitamaSettingsDialogComponent} from './onitama-settings-dialog/onitama-settings-dialog.component';
import {
  OnitamaMovementCardMiniGridComponent
} from './onitama-movement-card-mini-grid/onitama-movement-card-mini-grid.component';
import {OnitamaNewGameDialogComponent} from './onitama-new-game-dialog/onitama-new-game-dialog.component';
import {OnitamaEditorBoardComponent} from './onitama-editor-board/onitama-editor-board.component';
import {OnitamaCardBoardService} from './onitama-card-board.service';


@NgModule({
  declarations: [OnitamaComponent,
    OnitamaSettingsDialogComponent,
    OnitamaMovementCardGridComponent,
    OnitamaBoardComponent,
    OnitamaMovementCardComponent,
    OnitamaPieceComponent,
    OnitamaMovementCardMiniGridComponent,
    OnitamaNewGameDialogComponent,
    OnitamaEditorBoardComponent],
  imports: [
    CommonModule,
    OnitamaRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    ReversePipe,
    NgOptimizedImage
  ],
  providers: [
    NavBarService,
    OnitamaService,
    OnitamaCardBoardService,
    provideHttpClient(),
  ]
})
export class OnitamaModule { }
