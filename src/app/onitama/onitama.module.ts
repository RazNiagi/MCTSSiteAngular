import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnitamaRoutingModule } from './onitama-routing.module';
import {OnitamaComponent} from './onitama.component';
import {NavBarService} from "../nav-bar/nav-bar.service";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {provideHttpClient} from "@angular/common/http";
import {OnitamaService} from "./onitama.service";
import {OnitamaSettingsComponent} from "./onitama-settings/onitama-settings.component";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {OnitamaMovementCardGridComponent} from "./onitama-movement-card-grid/onitama-movement-card-grid.component";
import {ReversePipe} from "../reverse.pipe";
import {OnitamaBoardComponent} from './onitama-board/onitama-board.component';
import {OnitamaMovementCardComponent} from './onitama-movement-card/onitama-movement-card.component';


@NgModule({
  declarations: [OnitamaComponent,
      OnitamaSettingsComponent,
      OnitamaMovementCardGridComponent,
    OnitamaBoardComponent,
    OnitamaMovementCardComponent],
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
        ReversePipe
    ],
  providers: [
    NavBarService,
      OnitamaService,
      provideHttpClient(),
  ]
})
export class OnitamaModule { }
