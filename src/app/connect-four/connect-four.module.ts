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
import {ConnectFourNewGameDialogComponent} from './connect-four-new-game-dialog/connect-four-new-game-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [ConnectFourComponent,
        ConnectFourBoardComponent,
        ConnectFourPieceComponent,
        ConnectFourNewGameDialogComponent
    ],
    imports: [
        CommonModule,
        ConnectFourRoutingModule,
        ReversePipe,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
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
