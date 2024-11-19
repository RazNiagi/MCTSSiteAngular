import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectFourComponent} from './connect-four.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectFourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectFourRoutingModule { }
