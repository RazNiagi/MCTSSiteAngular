import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuartoComponent} from './quarto.component';

const routes: Routes = [
  {
    path: '',
    component: QuartoComponent,
    title: 'JV Dev Quarto'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartoRoutingModule { }
