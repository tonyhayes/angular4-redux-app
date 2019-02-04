import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatCardModule } from '@angular/material';

import { ViewReportPageComponent } from './view-report-page';
import * as report from '../actions/report';
import * as fromReports from '../reducers';
import { SelectedReportPageComponent } from './selected-report-page';
import { ReportDetailComponent } from '../components/report-detail';
import { ReportInfoComponent } from '../components/report-info';
import { AddCommasPipe } from '../../shared/pipes/add-commas';
import { EllipsisPipe } from '../../shared/pipes/ellipsis';

describe('View Report Page', () => {
  let params = new BehaviorSubject({});
  let fixture: ComponentFixture<ViewReportPageComponent>;
  let store: Store<fromReports.State>;
  let instance: ViewReportPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params },
        },
        {
          provide: Store,
          useValue: {
            select: jest.fn(),
            next: jest.fn(),
          },
        },
      ],
      declarations: [
        ViewReportPageComponent,
        SelectedReportPageComponent,
        ReportDetailComponent,
        ReportInfoComponent,
        AddCommasPipe,
        EllipsisPipe
      ],
    });

    fixture = TestBed.createComponent(ViewReportPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a report.Select action on init', () => {
    const action = new report.Select('2');
    params.next({ id: '2' });

    fixture.detectChanges();

    expect(store.next).toHaveBeenLastCalledWith(action);
  });
});
