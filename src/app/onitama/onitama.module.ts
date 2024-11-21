import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnitamaRoutingModule } from './onitama-routing.module';
import {OnitamaComponent} from './onitama.component';
import {NavBarService} from "../nav-bar/nav-bar.service";


@NgModule({
  declarations: [OnitamaComponent],
  imports: [
    CommonModule,
    OnitamaRoutingModule
  ],
  providers: [
    NavBarService
  ]
})
export class OnitamaModule { }
