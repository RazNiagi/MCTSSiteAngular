import { Injectable } from '@angular/core';
import {NavBarRoute} from '../model/nav-bar-route';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  public selectedRoute: string = 'Home';
  private _routes: NavBarRoute[] = [];
  constructor() { }

  public init(): void {
    this._routes = [
      {
        path: 'home',
        label: 'Home',
      },
      {
        path: 'connect-four',
        label: 'Connect Four',
      },
      {
        path: 'onitama',
        label: 'Onitama',
      }
    ];
  }

  public setSelectedRoute(route: string) {
    this.selectedRoute = route;
  }

  public getSelectedRoute() {
    return this.selectedRoute;
  }

  public addRoute(route: string, label: string) {
    this._routes.push(new NavBarRoute(route, label));
  }

  public removeRoute(route: string) {
    this._routes.splice(this._routes.findIndex(navBarRoute => navBarRoute.path === route), 1);
  }

  public getRoutes(): NavBarRoute[] {
    return this._routes;
  }
}
