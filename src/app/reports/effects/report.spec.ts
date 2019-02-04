import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { ReportEffects, SEARCH_SCHEDULER, SEARCH_DEBOUNCE } from './report';
import { PentahoReportsService } from '../../core/services/pentaho-reports';
import { Observable } from 'rxjs/Observable';
import { Search, SearchComplete, SearchError } from '../actions/report';
import { Report } from '../models/report';

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

describe('ReportEffects', () => {
  let effects: ReportEffects;
  let pentahoReportsService: any;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReportEffects,
        {
          provide: PentahoReportsService,
          useValue: { searchReports: jest.fn() },
        },
        { provide: Actions, useFactory: getActions },
        { provide: SEARCH_SCHEDULER, useFactory: getTestScheduler },
        { provide: SEARCH_DEBOUNCE, useValue: 30 },
      ],
    });

    effects = TestBed.get(ReportEffects);
    pentahoReportsService = TestBed.get(PentahoReportsService);
    actions$ = TestBed.get(Actions);
  });

  describe('search$', () => {
    it('should return a new report.SearchComplete, with the reports, on success, after the de-bounce', () => {
      const report1 = { id: '111', scheduleInfo: {} } as Report;
      const report2 = { id: '222', scheduleInfo: {} } as Report;
      const reports = [report1, report2];
      const action = new Search('query');
      const completion = new SearchComplete(reports);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: reports });
      const expected = cold('-----b', { b: completion });
      pentahoReportsService.searchReports = jest.fn(() => response);

      expect(effects.search$).toBeObservable(expected);
    });

    it('should return a new report.SearchError if the reports service throws', () => {
      const action = new Search('query');
      const completion = new SearchError('Unexpected Error. Try again later.');
      const error = 'Unexpected Error. Try again later.';

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-----b', { b: completion });
      pentahoReportsService.searchReports = jest.fn(() => response);

      expect(effects.search$).toBeObservable(expected);
    });

    it(`should not do anything if the query is an empty string`, () => {
      const action = new Search('');

      actions$.stream = hot('-a---', { a: action });
      const expected = cold('---');

      expect(effects.search$).toBeObservable(expected);
    });
  });
});
