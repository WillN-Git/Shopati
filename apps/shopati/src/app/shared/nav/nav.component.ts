import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'shopati-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  activeRoute = '/';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navTo(route: string) {
    this.router.navigateByUrl(route);
    this.activeRoute = route;
  }
}
