import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectFourRoutingModule } from './connect-four-routing.module';
import {ConnectFourComponent} from "./connect-four.component";
import {NavBarService} from "../nav-bar/nav-bar.service";
import {ReversePipe} from "../reverse.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ConnectFourBoardComponent} from "./connect-four-board/connect-four-board.component";
import {ConnectFourPieceComponent} from "./connect-four-piece/connect-four-piece.component";
import {ConnectFourService} from "./connect-four.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {provideHttpClient} from "@angular/common/http";
import {MatDialogRef} from '@angular/material/dialog';
import {SharedModule} from '../shared/shared.module';
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
    declarations: [ConnectFourComponent,
        ConnectFourBoardComponent,
        ConnectFourPieceComponent
    ],
    imports: [
        CommonModule,
        ConnectFourRoutingModule,
        ReversePipe,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        SharedModule,
        MatChipsModule
    ],
    providers: [
        NavBarService,
        ConnectFourService,
        provideHttpClient(),
        {
          provide: MatDialogRef,
          useValue: {}
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConnectFourModule { }
