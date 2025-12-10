import { Routes } from '@angular/router';
import {HomeModule} from './home/home.module';
import {ConnectFourModule} from './connect-four/connect-four.module';
import {OnitamaModule} from './onitama/onitama.module';
import {QuartoModule} from './quarto/quarto.module';

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
  },
  {
    path: 'quarto',
    loadChildren: () => QuartoModule
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
