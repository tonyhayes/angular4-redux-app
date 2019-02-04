import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromReports from '../reducers';
import * as report from '../actions/report';
import { Report } from '../models/report';

@Component({
  selector: 'analytics-find-report-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // template: `
  //   <analytics-report-search [query]="searchQuery$ | async" [searching]="loading$ | async" [error]="error$ | async" (search)="search($event)"></analytics-report-search>
  //   <analytics-report-preview-list [reports]="reports$ | async"></analytics-report-preview-list>
  // `,
  template: `
    <mat-card>
      <mat-card-title>My Available Reports</mat-card-title>
    </mat-card>
    <analytics-report-preview-list [reports]="reports$ | async"></analytics-report-preview-list>
  `,
  styles: [
    `
    mat-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class FindReportPageComponent {
  searchQuery$: Observable<string>;
  reports$: Observable<Report[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromReports.State>) {
    this.searchQuery$ = store.select(fromReports.getSearchQuery).take(1);
    this.reports$ = store.select(fromReports.getSearchResults);
    this.loading$ = store.select(fromReports.getSearchLoading);
    this.error$ = store.select(fromReports.getSearchError);
  }

  ngOnInit() {
    this.search('Pentaho Reports');
  }

  search(query: string) {
    this.store.dispatch(new report.Search(query));
  }
}
