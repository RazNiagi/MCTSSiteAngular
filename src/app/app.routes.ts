import { Routes } from '@angular/router';
import {HomeModule} from './home/home.module';
import {ConnectFourModule} from './connect-four/connect-four.module';
import {OnitamaModule} from './onitama/onitama.module';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => HomeModule
  },
  {
    path: 'connect-four',
    loadChildren: () => ConnectFourModule
  },
  {
    path: 'onitama',
    loadChildren: () => OnitamaModule
  }
];
