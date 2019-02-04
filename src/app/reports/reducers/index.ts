import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search';
import * as fromReports from './reports';
import * as fromCollection from './collection';
import * as fromRoot from '../../reducers';

export interface ReportsState {
  search: fromSearch.State;
  reports: fromReports.State;
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  'reports': ReportsState;
}

export const reducers = {
  search: fromSearch.reducer,
  reports: fromReports.reducer,
  collection: fromCollection.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `reports` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.reportsState$ = state$.select(getReportsState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getReportsState = createFeatureSelector<ReportsState>('reports');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getReportEntitiesState = createSelector(
  getReportsState,
  state => state.reports
);

export const getSelectedReportId = createSelector(
  getReportEntitiesState,
  fromReports.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getReportIds,
  selectEntities: getReportEntities,
  selectAll: getAllReports,
  selectTotal: getTotalReports,
} = fromReports.adapter.getSelectors(getReportEntitiesState);

export const getSelectedReport = createSelector(
  getReportEntities,
  getSelectedReportId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the reports selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getReportsState,
  (state: ReportsState) => state.search
);

export const getSearchReportIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of reports in the store.
 */
export const getSearchResults = createSelector(
  getReportEntities,
  getSearchReportIds,
  (reports, searchIds) => {
    return searchIds.map(id => reports[id]);
  }
);

export const getCollectionState = createSelector(
  getReportsState,
  (state: ReportsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionReportIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getReportCollection = createSelector(
  getReportEntities,
  getCollectionReportIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedReportInCollection = createSelector(
  getCollectionReportIds,
  getSelectedReportId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
