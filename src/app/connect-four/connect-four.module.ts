import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectFourRoutingModule } from './connect-four-routing.module';
import {ConnectFourComponent} from "./connect-four.component";
import {NavBarService} from "../nav-bar/nav-bar.service";


@NgModule({
  declarations: [ConnectFourComponent],
  imports: [
    CommonModule,
    ConnectFourRoutingModule
  ],
  providers: [
    NavBarService
  ]
})
export class ConnectFourModule { }
