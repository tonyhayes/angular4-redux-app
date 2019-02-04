import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedReportPageComponent } from './selected-report-page';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';

import * as collection from '../actions/collection';
import * as fromReports from '../reducers';
import { ReportDetailComponent } from '../components/report-detail';
import { Report, generateMockReport } from '../models/report';
import { ReportInfoComponent } from '../components/report-info';
import { AddCommasPipe } from '../../shared/pipes/add-commas';
import { EllipsisPipe } from '../../shared/pipes/ellipsis';

describe('Selected Report Page', () => {
  let fixture: ComponentFixture<SelectedReportPageComponent>;
  let store: Store<fromReports.State>;
  let instance: SelectedReportPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          reports: combineReducers(fromReports.reducers),
        }),
        MatCardModule,
      ],
      declarations: [
        SelectedReportPageComponent,
        ReportDetailComponent,
        ReportInfoComponent,
        AddCommasPipe,
        EllipsisPipe
      ],
    });

    fixture = TestBed.createComponent(SelectedReportPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a collection.AddReport action when addToCollection is called', () => {
    const $event: Report = generateMockReport();
    const action = new collection.AddReport($event);

    instance.addToCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a collection.RemoveReport action on removeFromCollection', () => {
    const $event: Report = generateMockReport();
    const action = new collection.RemoveReport($event);

    instance.removeFromCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
