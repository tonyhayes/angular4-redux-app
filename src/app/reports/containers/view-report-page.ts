import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromReports from '../reducers';
import * as report from '../actions/report';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Report Page's responsibility is to map router params
 * to a 'Select' report action. Actually showing the selected
 * report remains a responsibility of the
 * SelectedReportPageComponent
 */
@Component({
  selector: 'analytics-view-report-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <analytics-selected-report-page></analytics-selected-report-page>
  `,
})
export class ViewReportPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromReports.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .map(params => new report.Select(params.id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
