import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { ReportEffects } from './effects/report';
import { CollectionEffects } from './effects/collection';
import { ReportExistsGuard } from './guards/report-exists';

import { FindReportPageComponent } from './containers/find-report-page';
import { ViewReportPageComponent } from './containers/view-report-page';
import { SelectedReportPageComponent } from './containers/selected-report-page';
import { CollectionPageComponent } from './containers/collection-page';
import { MaterialModule } from '../material';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: 'find', component: FindReportPageComponent },
      {
        path: ':id',
        component: ViewReportPageComponent,
        canActivate: [ReportExistsGuard],
      },
      { path: '', component: CollectionPageComponent },
    ]),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('reports', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ReportEffects, CollectionEffects]),
  ],
  declarations: [
    FindReportPageComponent,
    ViewReportPageComponent,
    SelectedReportPageComponent,
    CollectionPageComponent,
  ],
  providers: [ReportExistsGuard],
})
export class ReportsModule {}
