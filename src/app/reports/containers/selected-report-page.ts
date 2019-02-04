import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromReports from '../reducers';
import * as collection from '../actions/collection';
import { Report } from '../models/report';

@Component({
  selector: 'analytics-selected-report-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <analytics-report-detail
      [report]="report$ | async"
      [inCollection]="isSelectedReportInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </analytics-report-detail>
  `,
})
export class SelectedReportPageComponent {
  report$: Observable<Report>;
  isSelectedReportInCollection$: Observable<boolean>;

  constructor(private store: Store<fromReports.State>) {
    this.report$ = store.select(fromReports.getSelectedReport);
    this.isSelectedReportInCollection$ = store.select(
      fromReports.isSelectedReportInCollection
    );
  }

  addToCollection(report: Report) {
    this.store.dispatch(new collection.AddReport(report));
  }

  removeFromCollection(report: Report) {
    this.store.dispatch(new collection.RemoveReport(report));
  }
}
