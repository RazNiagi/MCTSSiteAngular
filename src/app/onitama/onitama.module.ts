import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnitamaRoutingModule } from './onitama-routing.module';
import {OnitamaComponent} from './onitama.component';


@NgModule({
  declarations: [OnitamaComponent],
  imports: [
    CommonModule,
    OnitamaRoutingModule
  ]
})
export class OnitamaModule { }
