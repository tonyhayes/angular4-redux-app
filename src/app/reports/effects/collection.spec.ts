import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { empty } from 'rxjs/observable/empty';
import { cold, hot } from 'jasmine-marbles';
import { CollectionEffects } from './collection';
import { Database } from '@ngrx/db';
import { Report } from '../models/report';
import * as collection from '../actions/collection';
import { Observable } from 'rxjs/Observable';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('CollectionEffects', () => {
  let db: any;
  let effects: CollectionEffects;
  let actions$: TestActions;

  const report1 = { id: '111', scheduleInfo: {} } as Report;
  const report2 = { id: '222', scheduleInfo: {} } as Report;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: Database,
          useValue: {
            open: jest.fn(),
            query: jest.fn(),
            insert: jest.fn(),
            executeWrite: jest.fn(),
          },
        },
        { provide: Actions, useFactory: getActions },
      ],
    });

    db = TestBed.get(Database);
    effects = TestBed.get(CollectionEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('openDB$', () => {
    it('should call db.open when initially subscribed to', () => {
      effects.openDB$.subscribe();
      expect(db.open).toHaveBeenCalledWith('reports_app');
    });
  });

  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccess, with the reports, on success', () => {
      const action = new collection.Load();
      const completion = new collection.LoadSuccess([report1, report2]);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a-b|', { a: report1, b: report2 });
      const expected = cold('-----c', { c: completion });
      db.query = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });

    it('should return a collection.LoadFail, if the query throws', () => {
      const action = new collection.Load();
      const error = 'Error!';
      const completion = new collection.LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.query = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });
  });

  describe('addReportToCollection$', () => {
    it('should return a collection.AddReportSuccess, with the report, on success', () => {
      const action = new collection.AddReport(report1);
      const completion = new collection.AddReportSuccess(report1);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b', { b: true });
      const expected = cold('--c', { c: completion });
      db.insert = jest.fn(() => response);

      expect(effects.addReportToCollection$).toBeObservable(expected);
      expect(db.insert).toHaveBeenCalledWith('reports', [report1]);
    });

    it('should return a collection.AddReportFail, with the report, when the db insert throws', () => {
      const action = new collection.AddReport(report1);
      const completion = new collection.AddReportFail(report1);
      const error = 'Error!';

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.insert = jest.fn(() => response);

      expect(effects.addReportToCollection$).toBeObservable(expected);
    });

    describe('removeReportFromCollection$', () => {
      it('should return a collection.RemoveReportSuccess, with the report, on success', () => {
        const action = new collection.RemoveReport(report1);
        const completion = new collection.RemoveReportSuccess(report1);

        actions$.stream = hot('-a', { a: action });
        const response = cold('-b', { b: true });
        const expected = cold('--c', { c: completion });
        db.executeWrite = jest.fn(() => response);

        expect(effects.removeReportFromCollection$).toBeObservable(expected);
        expect(db.executeWrite).toHaveBeenCalledWith('reports', 'delete', [
          report1.id,
        ]);
      });

      it('should return a collection.RemoveReportFail, with the report, when the db insert throws', () => {
        const action = new collection.RemoveReport(report1);
        const completion = new collection.RemoveReportFail(report1);
        const error = 'Error!';

        actions$.stream = hot('-a', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--c', { c: completion });
        db.executeWrite = jest.fn(() => response);

        expect(effects.removeReportFromCollection$).toBeObservable(expected);
        expect(db.executeWrite).toHaveBeenCalledWith('reports', 'delete', [
          report1.id,
        ]);
      });
    });
  });
});
