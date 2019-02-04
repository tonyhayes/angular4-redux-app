import { Action } from '@ngrx/store';
import { Report } from '../models/report';

export const ADD_REPORT = '[Collection] Add Report';
export const ADD_REPORT_SUCCESS = '[Collection] Add Report Success';
export const ADD_REPORT_FAIL = '[Collection] Add Report Fail';
export const REMOVE_REPORT = '[Collection] Remove Report';
export const REMOVE_REPORT_SUCCESS = '[Collection] Remove Report Success';
export const REMOVE_REPORT_FAIL = '[Collection] Remove Report Fail';
export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';

/**
 * Add Report to Collection Actions
 */
export class AddReport implements Action {
  readonly type = ADD_REPORT;

  constructor(public payload: Report) {}
}

export class AddReportSuccess implements Action {
  readonly type = ADD_REPORT_SUCCESS;

  constructor(public payload: Report) {}
}

export class AddReportFail implements Action {
  readonly type = ADD_REPORT_FAIL;

  constructor(public payload: Report) {}
}

/**
 * Remove Report from Collection Actions
 */
export class RemoveReport implements Action {
  readonly type = REMOVE_REPORT;

  constructor(public payload: Report) {}
}

export class RemoveReportSuccess implements Action {
  readonly type = REMOVE_REPORT_SUCCESS;

  constructor(public payload: Report) {}
}

export class RemoveReportFail implements Action {
  readonly type = REMOVE_REPORT_FAIL;

  constructor(public payload: Report) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Report[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddReport
  | AddReportSuccess
  | AddReportFail
  | RemoveReport
  | RemoveReportSuccess
  | RemoveReportFail
  | Load
  | LoadSuccess
  | LoadFail;
