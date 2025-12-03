import { Component } from '@angular/core';

import { RouteInfo } from '../model/route-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // TODO: Change the onitama icon to a more relevant one
  routes: RouteInfo[] = [
    {
      path: '/connect-four',
      label: 'Connect Four',
      icon: 'grid_on',
      description: 'Play Connect Four against an AI opponent'
    },
    {
      path: '/onitama',
      label: 'Onitama',
      icon: 'sports_esports',
      description: 'Play Onitama against an AI opponent'
    },
    {
      path: '/quarto',
      label: 'Quarto',
      icon: 'extension',
      description: 'Play Quarto against an AI opponent'
    }
  ];
}
