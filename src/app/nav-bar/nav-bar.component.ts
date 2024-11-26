import {
  AfterContentChecked,
  Component,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {NavBarService} from './nav-bar.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {NavBarRoute} from '../model/nav-bar-route';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    MatToolbarModule,
    RouterLinkActive,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements AfterContentChecked {
  public activeId = 0;
  constructor(private _navBarService: NavBarService, private _router: Router) {
  }

  public getRoutes(): NavBarRoute[] {
    return this._navBarService.getRoutes();
  }

  public ngAfterContentChecked() {
    let potentialActiveId = this.getRoutes().findIndex(nbr => "/" + nbr.path === this._router.url);
    this.activeId = potentialActiveId === -1 ? 0 : potentialActiveId;
  }
}
