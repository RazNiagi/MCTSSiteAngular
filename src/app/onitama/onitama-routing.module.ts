import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnitamaComponent} from './onitama.component';

const routes: Routes = [
  {
    path: '',
    component: OnitamaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnitamaRoutingModule { }
