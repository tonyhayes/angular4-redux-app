import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { Report } from '../models/report';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('reports_app');
  });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .switchMap(() =>
      this.db
        .query('reports')
        .toArray()
        .map((reports: Report[]) => new collection.LoadSuccess(reports))
        .catch(error => of(new collection.LoadFail(error)))
    );

  @Effect()
  addReportToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_REPORT)
    .map((action: collection.AddReport) => action.payload)
    .mergeMap(report =>
      this.db
        .insert('reports', [report])
        .map(() => new collection.AddReportSuccess(report))
        .catch(() => of(new collection.AddReportFail(report)))
    );

  @Effect()
  removeReportFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_REPORT)
    .map((action: collection.RemoveReport) => action.payload)
    .mergeMap(report =>
      this.db
        .executeWrite('reports', 'delete', [report.id])
        .map(() => new collection.RemoveReportSuccess(report))
        .catch(() => of(new collection.RemoveReportFail(report)))
    );

  constructor(private actions$: Actions, private db: Database) {}
}
