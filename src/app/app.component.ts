import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {NavBarService} from './nav-bar/nav-bar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'MCTSSiteAngular';
  constructor(private _navBarService: NavBarService,) {
  }

  ngOnInit() {
    this._navBarService.init();
  }
}
