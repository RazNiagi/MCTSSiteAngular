import { Component } from '@angular/core';

interface RouteInfo {
  path: string;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
    }
  ];
}
