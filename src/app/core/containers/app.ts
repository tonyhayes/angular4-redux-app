import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as layout from '../actions/layout';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <analytics-layout>
      <analytics-sidenav [open]="showSidenav$ | async">
        <analytics-nav-item
          (navigate)="closeSidenav()"
          routerLink="/"
          icon="report"
          hint="View your scheduled reports"
        >
          My Scheduled Reports
        </analytics-nav-item>
        <analytics-nav-item
          (navigate)="closeSidenav()"
          routerLink="/reports/find"
          icon="search"
          hint="Find your next scheduled report!"
        >
          Browse Reports
        </analytics-nav-item>
      </analytics-sidenav>
      <analytics-toolbar (openMenu)="openSidenav()">
        Scheduled Reports
      </analytics-toolbar>

      <router-outlet></router-outlet>
    </analytics-layout>
  `,
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }

}
