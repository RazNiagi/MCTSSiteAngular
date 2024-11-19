import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectFourRoutingModule } from './connect-four-routing.module';
import {ConnectFourComponent} from "./connect-four.component";


@NgModule({
  declarations: [ConnectFourComponent],
  imports: [
    CommonModule,
    ConnectFourRoutingModule
  ]
})
export class ConnectFourModule { }
