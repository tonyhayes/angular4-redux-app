import { reducer } from './reports';
import * as fromReports from './reports';
import { SearchComplete, Load, Select } from '../actions/report';
import { Report, generateMockReport } from '../models/report';
import { LoadSuccess } from '../actions/collection';

describe('ReportsReducer', () => {
  const report1 = generateMockReport();
  const report2 = { ...report1, id: '222' };
  const report3 = { ...report1, id: '333' };
  const initialState: fromReports.State = {
    ids: [report1.id, report2.id],
    entities: {
      [report1.id]: report1,
      [report2.id]: report2,
    },
    selectedReportId: null,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    function noExistingReports(
      action: any,
      reportsInitialState: any,
      initialState: any,
      reports: Report[]
    ) {
      const createAction = new action(reports);

      const result = reducer(reportsInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    function existingReports(action: any, initialState: any, reports: Report[]) {
      // should not replace existing reports
      const differentReport2 = { ...reports[0], foo: 'bar' };
      const createAction = new action([reports[1], differentReport2]);

      const expectedResult = {
        ids: [...initialState.ids, reports[1].id],
        entities: {
          ...initialState.entities,
          [reports[1].id]: reports[1],
        },
        selectedReportId: null,
      };

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    }

    it('should add all reports in the payload when none exist', () => {
      noExistingReports(SearchComplete, fromReports.initialState, initialState, [
        report1,
        report2,
      ]);

      noExistingReports(LoadSuccess, fromReports.initialState, initialState, [
        report1,
        report2,
      ]);
    });

    it('should add only new reports when reports already exist', () => {
      existingReports(SearchComplete, initialState, [report2, report3]);

      existingReports(LoadSuccess, initialState, [report2, report3]);
    });
  });

  describe('LOAD', () => {
    const expectedResult = {
      ids: [report1.id],
      entities: {
        [report1.id]: report1,
      },
      selectedReportId: null,
    };

    it('should add a single report, if the report does not exist', () => {
      const action = new Load(report1);

      const result = reducer(fromReports.initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should return the existing state if the report exists', () => {
      const action = new Load(report1);

      const result = reducer(expectedResult, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    it('should set the selected report id on the state', () => {
      const action = new Select(report1.id);

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getSelectedId', () => {
      it('should return the selected id', () => {
        const result = fromReports.getSelectedId({
          ...initialState,
          selectedReportId: report1.id,
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
