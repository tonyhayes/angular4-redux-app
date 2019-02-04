import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromReports from '../reducers';
import * as collection from '../actions/collection';
import { Report } from '../models/report';

@Component({
  selector: 'analytics-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Scheduled Reports</mat-card-title>
    </mat-card>

    <analytics-report-preview-list [reports]="reports$ | async" [scheduled]=true></analytics-report-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
    mat-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent implements OnInit {
  reports$: Observable<Report[]>;

  constructor(private store: Store<fromReports.State>) {
    this.reports$ = store.select(fromReports.getReportCollection);
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }
}
