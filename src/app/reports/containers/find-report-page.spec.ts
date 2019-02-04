import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ReportSearchComponent } from '../components/report-search';
import { ReportPreviewComponent } from '../components/report-preview';
import { ReportPreviewListComponent } from '../components/report-preview-list';
import { RouterTestingModule } from '@angular/router/testing';
import { EllipsisPipe } from '../../shared/pipes/ellipsis';
import { ReportInfoComponent } from '../components/report-info';
import { AddCommasPipe } from '../../shared/pipes/add-commas';
import { FindReportPageComponent } from './find-report-page';
import * as report from '../actions/report';
import * as fromReports from '../reducers';

describe('Find Report Page', () => {
  let fixture: ComponentFixture<FindReportPageComponent>;
  let store: Store<fromReports.State>;
  let instance: FindReportPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          reports: combineReducers(fromReports.reducers),
        }),
        RouterTestingModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FindReportPageComponent,
        ReportSearchComponent,
        ReportPreviewComponent,
        ReportPreviewListComponent,
        ReportInfoComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
    });

    fixture = TestBed.createComponent(FindReportPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a report.Search action on search', () => {
    const $event: string = 'report name';
    const action = new report.Search($event);

    instance.search($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
