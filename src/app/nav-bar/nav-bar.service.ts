import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  public selectedRoute: string = 'Home';
  private _routes: string[] = [];
  constructor() { }

  public init(): void {
    this._routes = [
      'Home',
      'Connect Four',
      'Onitama'
    ];
  }

  public setSelectedRoute(route: string) {
    this.selectedRoute = route;
  }

  public getSelectedRoute() {
    return this.selectedRoute;
  }

  public addRoute(route: string) {
    this._routes.push(route);
  }

  public removeRoute(route: string) {
    this._routes.splice(this._routes.indexOf(route), 1);
  }

  public getRoutes() {
    return this._routes;
  }
}
