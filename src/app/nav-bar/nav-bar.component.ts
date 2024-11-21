import {
  AfterContentChecked,
  Component,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {NavBarService} from './nav-bar.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {
  NgbNavModule
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgbNavModule,
    NgOptimizedImage,
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

  public getRoutes(): string[] {
    return this._navBarService.getRoutes();
  }

  public ngAfterContentChecked() {
    let potentialActiveId = this.getRoutes().findIndex(str => "/" + str.toLowerCase().split(' ').join("-") === this._router.url);
    this.activeId = potentialActiveId === -1 ? 0 : potentialActiveId;
  }
}
